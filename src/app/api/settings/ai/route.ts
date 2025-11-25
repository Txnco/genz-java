import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { encrypt, decrypt } from '@/lib/encryption'
import { z } from 'zod'

const settingsSchema = z.object({
  apiKey: z.string().optional(),
  preferredModel: z.string().default('gpt-4o-mini'),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const settings = await prisma.openAISettings.findUnique({
      where: { userId: session.user.id },
      select: {
        preferredModel: true,
        apiKey: true,
      },
    })

    return NextResponse.json({
      hasKey: !!settings?.apiKey,
      preferredModel: settings?.preferredModel || 'gpt-4o-mini',
    })
  } catch (error) {
    console.error('Greška pri dohvaćanju AI postavki:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    const body = await request.json()
    const { apiKey, preferredModel } = settingsSchema.parse(body)

    const existingSettings = await prisma.openAISettings.findUnique({
      where: { userId: session.user.id },
    })

    if (existingSettings) {
      await prisma.openAISettings.update({
        where: { userId: session.user.id },
        data: {
          ...(apiKey && { apiKey: encrypt(apiKey) }),
          preferredModel,
        },
      })
    } else {
      if (!apiKey) {
        return NextResponse.json(
          { error: 'API ključ je obavezan za nove postavke' },
          { status: 400 }
        )
      }
      await prisma.openAISettings.create({
        data: {
          userId: session.user.id,
          apiKey: encrypt(apiKey),
          preferredModel,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Greška pri spremanju AI postavki:', error)
    return NextResponse.json(
      { error: 'Greška pri spremanju postavki. Molimo pokušajte ponovno.' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Neautorizirano' }, { status: 401 })
    }

    await prisma.openAISettings.delete({
      where: { userId: session.user.id },
    }).catch(() => {
      // Ignore if settings don't exist
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Greška pri brisanju AI postavki:', error)
    return NextResponse.json({ error: 'Greška poslužitelja. Molimo pokušajte ponovno.' }, { status: 500 })
  }
}
