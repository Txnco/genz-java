import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ attemptId: string }>
}

// Get test attempt results
export async function GET(request: Request, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const { attemptId } = await context.params

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          select: {
            title: true,
            description: true,
          },
        },
        answers: {
          include: {
            question: {
              include: {
                options: true,
                lecture: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!attempt) {
      return NextResponse.json({ error: 'Pokušaj nije pronađen' }, { status: 404 })
    }

    // Only allow user to see their own results (admins can see all)
    if (attempt.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('Greška pri dohvaćanju rezultata:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
