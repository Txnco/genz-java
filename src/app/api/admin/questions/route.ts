import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const questionSchema = z.object({
  lectureId: z.string().min(1, 'Lecture is required'),
  type: z.enum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_BLANK', 'CODE_WILL_COMPILE', 'CODE_WILL_CRASH', 'SHORT_TEXT']),
  prompt: z.string().min(1, 'Prompt is required'),
  codeSnippet: z.string().optional(),
  explanation: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  tags: z.array(z.string()).default([]),
  options: z.array(z.object({
    text: z.string().min(1),
    isCorrect: z.boolean(),
    order: z.number().default(0),
  })).default([]),
})

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const lectureId = searchParams.get('lecture')

    const where = lectureId ? { lectureId } : {}

    const questions = await prisma.question.findMany({
      where,
      include: {
        lecture: { select: { title: true } },
        options: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Greška pri dohvaćanju pitanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const data = questionSchema.parse(body)

    // Verify lecture exists
    const lecture = await prisma.lecture.findUnique({
      where: { id: data.lectureId },
    })

    if (!lecture) {
      return NextResponse.json({ error: 'Predavanje nije pronađeno' }, { status: 404 })
    }

    const question = await prisma.question.create({
      data: {
        lectureId: data.lectureId,
        type: data.type,
        prompt: data.prompt,
        codeSnippet: data.codeSnippet || null,
        explanation: data.explanation || null,
        difficulty: data.difficulty,
        tags: data.tags,
        options: {
          create: data.options.map((opt, index) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
            order: opt.order || index,
          })),
        },
      },
      include: {
        options: true,
      },
    })

    return NextResponse.json(question)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri stvaranju pitanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
