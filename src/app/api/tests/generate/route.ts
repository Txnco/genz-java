import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Fisher-Yates shuffle algorithm for proper randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Quick generate test with default settings
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      console.error('User not found in database:', session.user.id)
      return NextResponse.json({ 
        error: `Korisnik nije pronađen u bazi podataka. ID: ${session.user.id}` 
      }, { status: 404 })
    }

    const { lectureIds } = await request.json()

    // Get all questions from selected lectures or all lectures
    const whereClause = lectureIds && lectureIds.length > 0
      ? { lectureId: { in: lectureIds } }
      : {}

    const allQuestions = await prisma.question.findMany({
      where: whereClause,
    })

    console.log('User found:', user.email, 'Generating test with', allQuestions.length, 'total questions')

    if (allQuestions.length === 0) {
      return NextResponse.json(
        { error: 'Nema dostupnih pitanja' },
        { status: 400 }
      )
    }

    // Separate questions by difficulty
    // MEDIUM = +2 points each
    // HARD = +3 points each
    const mediumQuestions = allQuestions.filter(q => q.difficulty === 'MEDIUM')
    const hardQuestions = allQuestions.filter(q => q.difficulty === 'HARD')

    // Select 6 medium questions and 6 hard questions
    const selectedMediumCount = Math.min(6, mediumQuestions.length)
    const selectedHardCount = Math.min(6, hardQuestions.length)

    if (selectedMediumCount < 6 || selectedHardCount < 6) {
      return NextResponse.json(
        { error: `Nedovoljno pitanja. Potrebno: 6 medium i 6 hard pitanja. Dostupno: ${selectedMediumCount} medium, ${selectedHardCount} hard.` },
        { status: 400 }
      )
    }

    // Randomly select questions using proper Fisher-Yates shuffle
    const shuffledMedium = shuffleArray(mediumQuestions)
    const shuffledHard = shuffleArray(hardQuestions)
    const selectedQuestions = [
      ...shuffledMedium.slice(0, 6),
      ...shuffledHard.slice(0, 6)
    ]
    const questionCount = 12

    // Generate test title based on lectures
    const lectureNames = lectureIds && lectureIds.length > 0
      ? await prisma.lecture.findMany({
          where: { id: { in: lectureIds } },
          select: { title: true },
        })
      : []

    let title: string
    if (lectureIds && lectureIds.length > 0) {
      if (lectureNames.length === 1) {
        title = `Test: ${lectureNames[0].title}`
      } else if (lectureNames.length <= 3) {
        title = `Test: ${lectureNames.map(l => l.title).join(', ')}`
      } else {
        title = `Test: ${lectureNames.length} lekcija`
      }
    } else {
      title = `Opći test - ${new Date().toLocaleDateString('hr-HR')}`
    }
    
    // Ensure title doesn't exceed database limit (255 chars)
    if (title.length > 255) {
      title = title.substring(0, 252) + '...'
    }

    // Create test and attempt in one transaction
    const result = await prisma.$transaction(async (tx) => {
      const test = await tx.test.create({
        data: {
          title,
          description: 'Automatski generirani test (6 medium + 6 hard pitanja)',
          questionCount,
          timeLimit: 45, // Default 45 minutes for 12 questions
          createdById: session.user.role === 'ADMIN' ? null : session.user.id,
          questions: {
            create: selectedQuestions.map((q, index) => ({
              questionId: q.id,
              order: index,
            })),
          },
        },
        include: {
          questions: {
            include: {
              question: {
                include: {
                  options: true,
                  lecture: {
                    select: { title: true },
                  },
                },
              },
            },
            orderBy: { order: 'asc' },
          },
        },
      })

      // Create attempt immediately
      const attempt = await tx.testAttempt.create({
        data: {
          testId: test.id,
          userId: session.user.id,
          totalQuestions: questionCount,
        },
      })

      return { test, attempt }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Greška pri generiranju testa:', error)
    return NextResponse.json(
      { error: 'Greška pri generiranju testa. Molimo pokušajte ponovno.' },
      { status: 500 }
    )
  }
}
