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
    id: z.string().optional(),
    text: z.string().min(1),
    isCorrect: z.boolean(),
    order: z.number().default(0),
  })).default([]),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        options: { orderBy: { order: 'asc' } },
        lecture: { select: { title: true } },
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Pitanje nije pronađeno' }, { status: 404 })
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error('Greška pri dohvaćanju pitanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const data = questionSchema.parse(body)

    // Delete existing options and recreate
    await prisma.questionOption.deleteMany({
      where: { questionId: id },
    })

    const question = await prisma.question.update({
      where: { id },
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
    console.error('Greška pri ažuriranju pitanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    await prisma.question.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Greška pri brisanju pitanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
