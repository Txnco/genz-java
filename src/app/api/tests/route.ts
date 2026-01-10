import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Get all tests with statistics
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const tests = await prisma.test.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
        attempts: {
          where: { completed: true },
          select: {
            correctAnswers: true,
            totalQuestions: true,
          },
        },
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calculate statistics for each test
    const testsWithStats = tests.map(test => {
      const completedAttempts = test.attempts.length
      const totalAnswers = test.attempts.reduce((sum, a) => sum + a.totalQuestions, 0)
      const correctAnswers = test.attempts.reduce((sum, a) => sum + a.correctAnswers, 0)
      const successRate = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

      return {
        id: test.id,
        title: test.title,
        description: test.description,
        questionCount: test._count.questions,
        timeLimit: test.timeLimit,
        createdAt: test.createdAt,
        createdBy: test.createdBy,
        tags: test.tags,
        statistics: {
          attemptCount: completedAttempts,
          successRate,
        },
      }
    })

    return NextResponse.json(testsWithStats)
  } catch (error) {
    console.error('Greška pri dohvaćanju testova:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}

const createTestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  questionCount: z.number().min(1).max(50).default(10),
  timeLimit: z.number().min(1).max(180).optional(),
  lectureIds: z.array(z.string()).optional(), // If provided, only select from these lectures
})

// Create a new test (All authenticated users)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const data = createTestSchema.parse(body)

    // Get all questions or from specific lectures
    const whereClause = data.lectureIds && data.lectureIds.length > 0
      ? { lectureId: { in: data.lectureIds } }
      : {}

    const allQuestions = await prisma.question.findMany({
      where: whereClause,
    })

    if (allQuestions.length < data.questionCount) {
      return NextResponse.json(
        { error: `Nema dovoljno dostupnih pitanja. Pronađeno ${allQuestions.length}, potrebno ${data.questionCount}` },
        { status: 400 }
      )
    }

    // Get tags from selected lectures if any
    let tags: string[] = []
    if (data.lectureIds && data.lectureIds.length > 0) {
      const lectures = await prisma.lecture.findMany({
        where: { id: { in: data.lectureIds } },
        select: { tags: true }
      })

      // Merge all tags and deduplicate
      const allTags = lectures.flatMap(l => {
        // Handle both string[] and likely parsed JSON (though prisma types it as Json)
        const t = l.tags as unknown
        return Array.isArray(t) ? t as string[] : []
      })
      tags = [...new Set(allTags)]
    }

    // Randomly select questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffled.slice(0, data.questionCount)

    // Create test with questions (link creator only if not admin)
    const test = await prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
        questionCount: data.questionCount,
        timeLimit: data.timeLimit,
        createdById: session.user.role === 'ADMIN' ? null : session.user.id,
        tags: tags,
        questions: {
          create: selectedQuestions.map((q, index) => ({
            questionId: q.id,
            order: index,
          })),
        },
      },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    return NextResponse.json(test)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri stvaranju testa:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
