import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Start a new test attempt
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const { testId } = await request.json()

    if (!testId) {
      return NextResponse.json({ error: 'ID testa je obavezan' }, { status: 400 })
    }

    // Get test details
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    })

    if (!test || !test.isActive) {
      return NextResponse.json({ error: 'Test nije pronađen ili je neaktivan' }, { status: 404 })
    }

    // Create attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        testId,
        userId: session.user.id,
        totalQuestions: test._count.questions,
      },
    })

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('Greška pri stvaranju pokušaja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
