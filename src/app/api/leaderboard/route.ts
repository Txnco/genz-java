import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch all users with their answer counts, sorted by level (desc), then XP (desc)
    const users = await prisma.user.findMany({
      where: {
        role: 'STUDENT', // Only show students on leaderboard
      },
      select: {
        id: true,
        name: true,
        level: true,
        xp: true,
        currentStreak: true,
        _count: {
          select: {
            answers: true,
          },
        },
        badges: {
          select: {
            badgeType: true,
          },
        },
      },
      orderBy: [
        { level: 'desc' },
        { xp: 'desc' },
      ],
      take: 100, // Top 100 users
    })

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name || 'Anonymous',
      level: user.level,
      xp: user.xp,
      questionsAnswered: user._count.answers,
      currentStreak: user.currentStreak,
      badgeCount: user.badges.length,
    }))

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

