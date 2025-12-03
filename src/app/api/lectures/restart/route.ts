import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const restartSchema = z.object({
  lectureId: z.string().min(1, 'Lecture ID is required'),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const { lectureId } = restartSchema.parse(body)

    // Get current progress
    const currentProgress = await prisma.userProgress.findUnique({
      where: {
        userId_lectureId: {
          userId: session.user.id,
          lectureId,
        },
      },
    })

    // Get current answers count
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId },
      include: {
        questions: { select: { id: true } },
      },
    })

    if (!lecture) {
      return NextResponse.json({ error: 'Lekcija nije pronađena' }, { status: 404 })
    }

    const questionIds = lecture.questions.map(q => q.id)

    // Count answers for this lecture
    const answersData = await prisma.userQuestionAnswer.findMany({
      where: {
        userId: session.user.id,
        questionId: { in: questionIds },
      },
      select: {
        isCorrect: true,
      },
    })

    const questionsAnswered = answersData.length
    const questionsCorrect = answersData.filter(a => a.isCorrect).length
    const accuracy = questionsAnswered > 0 
      ? Math.round((questionsCorrect / questionsAnswered) * 100) 
      : 0

    // Only create restart log if there was progress
    if (questionsAnswered > 0) {
      // Log the restart
      await prisma.lectureProgressRestart.create({
        data: {
          userId: session.user.id,
          lectureId,
          questionsAnswered,
          questionsCorrect,
          accuracy,
        },
      })

      // Delete all answers for this lecture's questions
      await prisma.userQuestionAnswer.deleteMany({
        where: {
          userId: session.user.id,
          questionId: { in: questionIds },
        },
      })

      // Reset or delete progress
      if (currentProgress) {
        await prisma.userProgress.update({
          where: {
            userId_lectureId: {
              userId: session.user.id,
              lectureId,
            },
          },
          data: {
            questionsAnswered: 0,
            questionsCorrect: 0,
            lastActivityAt: new Date(),
          },
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      previousProgress: {
        questionsAnswered,
        questionsCorrect,
        accuracy,
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Error restarting lecture:', error)
    return NextResponse.json({ error: 'Greška poslužitelja' }, { status: 500 })
  }
}

// Get restart history for a lecture
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const lectureId = searchParams.get('lectureId')

    if (!lectureId) {
      return NextResponse.json({ error: 'Lecture ID is required' }, { status: 400 })
    }

    const restarts = await prisma.lectureProgressRestart.findMany({
      where: {
        userId: session.user.id,
        lectureId,
      },
      orderBy: {
        restartedAt: 'desc',
      },
    })

    return NextResponse.json(restarts)
  } catch (error) {
    console.error('Error fetching restart history:', error)
    return NextResponse.json({ error: 'Greška poslužitelja' }, { status: 500 })
  }
}

