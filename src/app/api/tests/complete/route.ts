import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const completeSchema = z.object({
  attemptId: z.string(),
  timeSpent: z.number().optional(),
})

// Complete a test attempt
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const data = completeSchema.parse(body)

    // Verify attempt belongs to user
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: data.attemptId },
      include: {
        answers: true,
      },
    })

    if (!attempt || attempt.userId !== session.user.id) {
      return NextResponse.json({ error: 'Pokušaj nije pronađen' }, { status: 404 })
    }

    if (attempt.completed) {
      return NextResponse.json({ error: 'Test je već završen' }, { status: 400 })
    }

    // Calculate score: MEDIUM = +2, HARD = +3, incorrect = -1, skipped = 0
    // Get all questions with difficulty
    const answersWithQuestions = await prisma.testAnswer.findMany({
      where: { attemptId: data.attemptId },
      include: {
        question: {
          select: {
            difficulty: true,
          },
        },
      },
    })

    let score = 0
    let correctAnswers = 0
    let incorrectAnswers = 0
    let skippedCount = 0

    answersWithQuestions.forEach(answer => {
      if (answer.isSkipped) {
        skippedCount++
        // Skipped = 0 points (no penalty)
      } else if (answer.isCorrect) {
        correctAnswers++
        // MEDIUM questions = +2 points
        // HARD questions = +3 points
        score += answer.question.difficulty === 'MEDIUM' ? 2 : 3
      } else {
        incorrectAnswers++
        score -= 1 // -1 for incorrect (only if answered, not skipped)
      }
    })

    // Max score is always 30 (6 medium * 2 + 6 hard * 3)
    const maxScore = 30

    // Update attempt
    const updatedAttempt = await prisma.testAttempt.update({
      where: { id: data.attemptId },
      data: {
        completed: true,
        completedAt: new Date(),
        correctAnswers,
        incorrectAnswers,
        skippedCount,
        score,
        timeSpent: data.timeSpent,
      },
      include: {
        test: true,
        answers: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedAttempt)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri završavanju testa:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
