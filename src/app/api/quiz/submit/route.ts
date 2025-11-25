import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { evaluateAnswer } from '@/lib/question-evaluator'
import {
  XP_CORRECT_ANSWER,
  XP_INCORRECT_ANSWER,
  calculateLevel,
  hasAnsweredToday,
  shouldIncrementStreak,
  shouldResetStreak,
} from '@/lib/gamification'
import { checkRateLimit, QUIZ_SUBMIT_RATE_LIMIT } from '@/lib/rate-limit'
import { z } from 'zod'

const submitSchema = z.object({
  questionId: z.string(),
  selectedOptionIds: z.array(z.string()),
  textAnswer: z.string().optional(),
  halfPoints: z.boolean().optional(), // For repeat mode
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = checkRateLimit(session.user.id, QUIZ_SUBMIT_RATE_LIMIT)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Previše zahtjeva. Molimo pričekajte prije sljedećeg pokušaja.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    }

    const body = await request.json()
    const { questionId, selectedOptionIds, textAnswer, halfPoints } = submitSchema.parse(body)

    // Get the question with options
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        options: true,
        lecture: true,
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Pitanje nije pronađeno' }, { status: 404 })
    }

    // Evaluate the answer
    const result = evaluateAnswer(
      question.type,
      question.options,
      selectedOptionIds,
      textAnswer
    )

    // Calculate XP - half points in repeat mode
    const baseXp = result.isCorrect ? XP_CORRECT_ANSWER : XP_INCORRECT_ANSWER
    const xpAwarded = halfPoints ? Math.floor(baseXp / 2) : baseXp

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Korisnik nije pronađen' }, { status: 404 })
    }

    // Calculate streak updates
    let newStreak = user.currentStreak
    let newLongestStreak = user.longestStreak

    if (!hasAnsweredToday(user.lastActivityDate)) {
      if (shouldIncrementStreak(user.lastActivityDate)) {
        newStreak = user.currentStreak + 1
      } else if (shouldResetStreak(user.lastActivityDate)) {
        newStreak = 1
      } else {
        newStreak = 1 // First activity
      }
      newLongestStreak = Math.max(newLongestStreak, newStreak)
    }

    const newXp = user.xp + xpAwarded
    const newLevel = calculateLevel(newXp)

    // Use transaction to update all records
    await prisma.$transaction([
      // Record the answer
      prisma.userQuestionAnswer.create({
        data: {
          userId: session.user.id,
          questionId,
          selectedOptionIds,
          textAnswer,
          isCorrect: result.isCorrect,
          xpAwarded,
        },
      }),

      // Update user progress for lecture
      prisma.userProgress.upsert({
        where: {
          userId_lectureId: {
            userId: session.user.id,
            lectureId: question.lectureId,
          },
        },
        create: {
          userId: session.user.id,
          lectureId: question.lectureId,
          questionsAnswered: 1,
          questionsCorrect: result.isCorrect ? 1 : 0,
        },
        update: {
          questionsAnswered: { increment: 1 },
          questionsCorrect: result.isCorrect ? { increment: 1 } : undefined,
          lastActivityAt: new Date(),
        },
      }),

      // Update user XP, level, and streak
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          xp: newXp,
          level: newLevel,
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastActivityDate: new Date(),
        },
      }),
    ])

    return NextResponse.json({
      isCorrect: result.isCorrect,
      correctAnswers: result.correctAnswers,
      explanation: question.explanation,
      xpAwarded,
      newXp,
      newLevel,
      streak: newStreak,
      wasHalfPoints: halfPoints || false,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Greška pri slanju odgovora:', error)
    return NextResponse.json(
      { error: 'Greška pri slanju odgovora. Molimo pokušajte ponovno.' },
      { status: 500 }
    )
  }
}
