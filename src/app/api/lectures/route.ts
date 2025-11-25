import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get all lectures (for all authenticated users)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const lectures = await prisma.lecture.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        order: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(lectures)
  } catch (error) {
    console.error('Greška pri dohvaćanju predavanja:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
