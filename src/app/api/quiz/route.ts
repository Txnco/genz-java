import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Difficulty } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const lectureSlug = searchParams.get('lecture')
    const repeatMode = searchParams.get('repeatMode') === 'true'
    const restart = searchParams.get('restart') === 'true'
    const difficultiesParam = searchParams.get('difficulties')

    // Parse difficulties filter (comma-separated: EASY,MEDIUM,HARD)
    const validDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']
    let difficulties: Difficulty[] = validDifficulties
    if (difficultiesParam) {
      const parsed = difficultiesParam.split(',').filter(d =>
        validDifficulties.includes(d as Difficulty)
      ) as Difficulty[]
      if (parsed.length > 0) {
        difficulties = parsed
      }
    }

    if (!lectureSlug) {
      return NextResponse.json({ error: 'Slug predavanja je obavezan' }, { status: 400 })
    }

    const lecture = await prisma.lecture.findUnique({
      where: { slug: lectureSlug },
    })

    if (!lecture) {
      return NextResponse.json({ error: 'Predavanje nije pronađeno' }, { status: 404 })
    }

    // Get user's answered questions for this lecture (skip if restart mode)
    const answeredQuestions = restart ? [] : await prisma.userQuestionAnswer.findMany({
      where: {
        userId: session.user.id,
        question: { lectureId: lecture.id },
      },
      select: {
        questionId: true,
        isCorrect: true,
      },
    })

    // Group answers by questionId, tracking correct answers
    const questionStats = new Map<string, { attempts: number; correct: boolean }>()
    answeredQuestions.forEach(answer => {
      const existing = questionStats.get(answer.questionId)
      if (existing) {
        existing.attempts++
        if (answer.isCorrect) existing.correct = true
      } else {
        questionStats.set(answer.questionId, {
          attempts: 1,
          correct: answer.isCorrect,
        })
      }
    })

    // Helper function to shuffle array
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Get all questions for this lecture filtered by difficulty
    const allQuestions = await prisma.question.findMany({
      where: {
        lectureId: lecture.id,
        difficulty: { in: difficulties },
      },
      include: {
        options: {
          select: {
            id: true,
            text: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    // Shuffle options for each question
    allQuestions.forEach(question => {
      question.options = shuffleArray(question.options)
    })

    // Count incorrect questions (answered but never correct)
    const incorrectQuestionIds = Array.from(questionStats.entries())
      .filter(([, stats]) => !stats.correct)
      .map(([id]) => id)

    // Check if all questions have been answered at least once
    const allAnswered = allQuestions.every(q => questionStats.has(q.id))

    if (repeatMode) {
      // In repeat mode, only show incorrect questions
      const incorrectQuestions = allQuestions.filter(q => incorrectQuestionIds.includes(q.id))

      if (incorrectQuestions.length === 0) {
        return NextResponse.json({
          question: null,
          completed: true,
          allCorrect: true,
          totalQuestions: allQuestions.length,
          incorrectCount: 0
        })
      }

      // Randomize incorrect questions using proper Fisher-Yates shuffle
      const shuffled = shuffleArray(incorrectQuestions)
      const nextQuestion = shuffled[0]

      return NextResponse.json({
        question: {
          id: nextQuestion.id,
          type: nextQuestion.type,
          prompt: nextQuestion.prompt,
          codeSnippet: nextQuestion.codeSnippet,
          difficulty: nextQuestion.difficulty,
          options: nextQuestion.options,
        },
        totalQuestions: incorrectQuestions.length,
        answeredQuestions: 0, // Reset for repeat mode
        repeatMode: true,
        isHalfPoints: true,
      })
    }

    // Normal mode - prioritize unanswered, then incorrect, then by attempts
    // Separate questions into priority groups
    const unansweredQuestions = allQuestions.filter(q => !questionStats.has(q.id))
    const incorrectQuestions = allQuestions.filter(q => {
      const stats = questionStats.get(q.id)
      return stats && !stats.correct
    })
    const correctQuestions = allQuestions.filter(q => {
      const stats = questionStats.get(q.id)
      return stats && stats.correct
    })

    // Sort correct questions by attempts (fewest first) and shuffle within same attempt count
    const sortedCorrectQuestions = correctQuestions
      .map(q => ({ q, attempts: questionStats.get(q.id)!.attempts }))
      .sort((a, b) => a.attempts - b.attempts)
      .map(item => item.q)

    // Combine in priority order: unanswered (shuffled) -> incorrect (shuffled) -> correct (by attempts)
    const prioritizedQuestions = [
      ...shuffleArray(unansweredQuestions),
      ...shuffleArray(incorrectQuestions),
      ...sortedCorrectQuestions
    ]

    // Get next question
    const nextQuestion = prioritizedQuestions[0]

    // If all questions answered, return completion state with incorrect count
    if (allAnswered && !nextQuestion) {
      return NextResponse.json({
        question: null,
        completed: true,
        totalQuestions: allQuestions.length,
        incorrectCount: incorrectQuestionIds.length,
        allCorrect: incorrectQuestionIds.length === 0
      })
    }

    // If all questions have been attempted at least once
    if (allAnswered) {
      return NextResponse.json({
        question: null,
        completed: true,
        totalQuestions: allQuestions.length,
        answeredQuestions: questionStats.size,
        incorrectCount: incorrectQuestionIds.length,
        allCorrect: incorrectQuestionIds.length === 0
      })
    }

    if (!nextQuestion) {
      return NextResponse.json({
        question: null,
        completed: true,
        totalQuestions: allQuestions.length,
        incorrectCount: incorrectQuestionIds.length
      })
    }

    // Don't send correct answers to client
    return NextResponse.json({
      question: {
        id: nextQuestion.id,
        type: nextQuestion.type,
        prompt: nextQuestion.prompt,
        codeSnippet: nextQuestion.codeSnippet,
        difficulty: nextQuestion.difficulty,
        options: nextQuestion.options,
      },
      totalQuestions: allQuestions.length,
      answeredQuestions: questionStats.size,
      incorrectCount: incorrectQuestionIds.length,
    })
  } catch (error) {
    console.error('Greška pri dohvaćanju kviza:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
