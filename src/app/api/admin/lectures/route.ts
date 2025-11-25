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

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const lectures = await prisma.lecture.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { questions: true } },
      },
    })

    return NextResponse.json(lectures)
  } catch (error) {
    console.error('Greška pri dohvaćanju predavanja:', error)
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
    const data = lectureSchema.parse(body)

    // Check if slug already exists
    const existing = await prisma.lecture.findUnique({
      where: { slug: data.slug },
    })

    if (existing) {
      return NextResponse.json({ error: 'Slug već postoji' }, { status: 400 })
    }

    const lecture = await prisma.lecture.create({
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
    console.error('Greška pri stvaranju predavanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
