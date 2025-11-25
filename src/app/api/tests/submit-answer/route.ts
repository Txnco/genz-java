import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { evaluateAnswer } from '@/lib/question-evaluator'

const submitAnswerSchema = z.object({
  attemptId: z.string(),
  questionId: z.string(),
  selectedOptionIds: z.array(z.string()).default([]),
  textAnswer: z.string().optional(),
  isSkipped: z.boolean().default(false),
})

// Submit answer for a test question
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const data = submitAnswerSchema.parse(body)

    // Verify attempt belongs to user
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: data.attemptId },
    })

    if (!attempt || attempt.userId !== session.user.id) {
      return NextResponse.json({ error: 'Pokušaj nije pronađen' }, { status: 404 })
    }

    if (attempt.completed) {
      return NextResponse.json({ error: 'Test je već završen' }, { status: 400 })
    }

    // If skipped, save as skipped without evaluation
    if (data.isSkipped) {
      const answer = await prisma.testAnswer.create({
        data: {
          attemptId: data.attemptId,
          questionId: data.questionId,
          selectedOptionIds: [],
          isCorrect: false,
          isSkipped: true,
        },
      })

      return NextResponse.json({
        ...answer,
        evaluation: { isCorrect: false, feedback: 'Pitanje preskočeno' },
      })
    }

    // Get question with options
    const question = await prisma.question.findUnique({
      where: { id: data.questionId },
      include: {
        options: true,
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Pitanje nije pronađeno' }, { status: 404 })
    }

    // Evaluate answer
    const evaluation = evaluateAnswer(
      question.type,
      question.options,
      data.selectedOptionIds,
      data.textAnswer
    )

    // Save answer
    const answer = await prisma.testAnswer.create({
      data: {
        attemptId: data.attemptId,
        questionId: data.questionId,
        selectedOptionIds: data.selectedOptionIds,
        textAnswer: data.textAnswer,
        isCorrect: evaluation.isCorrect,
        isSkipped: false,
      },
    })

    return NextResponse.json({
      ...answer,
      evaluation,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri spremanju odgovora:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
