import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const lectureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  description: z.string().optional(),
  order: z.number().default(0),
  content: z.string().optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const lecture = await prisma.lecture.findUnique({
      where: { id },
    })

    if (!lecture) {
      return NextResponse.json({ error: 'Predavanje nije pronađeno' }, { status: 404 })
    }

    return NextResponse.json(lecture)
  } catch (error) {
    console.error('Greška pri dohvaćanju predavanja:', error)
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
    const data = lectureSchema.parse(body)

    // Check if slug already exists (excluding current lecture)
    const existing = await prisma.lecture.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    })

    if (existing) {
      return NextResponse.json({ error: 'Slug već postoji' }, { status: 400 })
    }

    const lecture = await prisma.lecture.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        order: data.order,
        content: data.content || null,
      },
    })

    return NextResponse.json(lecture)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('Greška pri ažuriranju predavanja:', error)
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

    await prisma.lecture.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Greška pri brisanju predavanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
