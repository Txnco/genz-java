'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface LeaderboardUser {
  rank: number
  id: string
  name: string
  level: number
  xp: number
  questionsAnswered: number
  currentStreak: number
  badgeCount: number
}

export default function LeaderboardPage() {
  const { data: session } = useSession()
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  async function fetchLeaderboard() {
    try {
      const res = await fetch('/api/leaderboard')
      if (res.ok) {
        const data = await res.json()
        setLeaderboard(data)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: 'text-yellow-900' }
    if (rank === 2) return { emoji: '🥈', bg: 'bg-gradient-to-r from-gray-300 to-slate-400', text: 'text-gray-800' }
    if (rank === 3) return { emoji: '🥉', bg: 'bg-gradient-to-r from-orange-400 to-amber-600', text: 'text-orange-900' }
    return { emoji: `#${rank}`, bg: 'bg-base-200', text: 'text-base-content' }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/60">Učitavanje ljestvice...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <span className="text-2xl">🏆</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">Globalna ljestvica</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Top <span className="text-gradient">Java učenici</span>
        </h1>
        <p className="text-base-content/60 max-w-lg mx-auto">
          Pogledaj gdje se nalazite na ljestvici i natječite se s drugim učenicima!
        </p>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="flex items-end justify-center gap-4 py-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center animate-fade-up stagger-1">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-slate-400 flex items-center justify-center text-3xl shadow-lg mb-3">
              🥈
            </div>
            <div className="text-center mb-2">
              <p className="font-semibold text-lg truncate max-w-[120px]">{leaderboard[1].name}</p>
              <p className="text-sm text-base-content/60">Lvl {leaderboard[1].level}</p>
            </div>
            <div className="w-24 h-28 bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-t-lg flex items-end justify-center pb-3">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center animate-fade-up">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-4xl shadow-xl mb-3 ring-4 ring-yellow-300/50">
              🥇
            </div>
            <div className="text-center mb-2">
              <p className="font-bold text-xl truncate max-w-[140px]">{leaderboard[0].name}</p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Lvl {leaderboard[0].level}</p>
            </div>
            <div className="w-28 h-40 bg-gradient-to-t from-yellow-400 to-amber-300 dark:from-yellow-600 dark:to-amber-500 rounded-t-lg flex items-end justify-center pb-3 shadow-lg">
              <span className="text-3xl font-bold text-yellow-900">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center animate-fade-up stagger-2">
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg mb-3">
              🥉
            </div>
            <div className="text-center mb-2">
              <p className="font-semibold truncate max-w-[110px]">{leaderboard[2].name}</p>
              <p className="text-sm text-base-content/60">Lvl {leaderboard[2].level}</p>
            </div>
            <div className="w-22 h-20 bg-gradient-to-t from-orange-300 to-orange-200 dark:from-orange-700 dark:to-orange-600 rounded-t-lg flex items-end justify-center pb-3">
              <span className="text-xl font-bold text-orange-800 dark:text-orange-200">3</span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-base-200 bg-base-200/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-base-content/60">Rang</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-base-content/60">Korisnik</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-base-content/60">Razina</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-base-content/60">XP</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-base-content/60">Pitanja</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-base-content/60">Streak</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-base-content/60">Značke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {leaderboard.map((user, index) => {
                const isCurrentUser = session?.user?.id === user.id
                const rankStyle = getRankDisplay(user.rank)
                
                return (
                  <tr 
                    key={user.id}
                    className={`transition-colors ${
                      isCurrentUser 
                        ? 'bg-primary/5 hover:bg-primary/10' 
                        : 'hover:bg-base-200/50'
                    } ${index < 3 ? 'font-medium' : ''}`}
                    style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm ${
                        user.rank <= 3 ? rankStyle.bg + ' ' + rankStyle.text : 'bg-base-200 text-base-content/70'
                      }`}>
                        {user.rank <= 3 ? rankStyle.emoji : user.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-semibold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className={`font-medium ${isCurrentUser ? 'text-primary' : ''}`}>
                            {user.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Ti</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                        {user.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-amber-600 dark:text-amber-400 font-medium">{user.xp.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-base-content/80">{user.questionsAnswered}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.currentStreak > 0 ? (
                        <span className="inline-flex items-center gap-1 text-orange-500">
                          <span>🔥</span>
                          <span className="font-medium">{user.currentStreak}</span>
                        </span>
                      ) : (
                        <span className="text-base-content/40">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.badgeCount > 0 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                          {user.badgeCount}
                        </span>
                      ) : (
                        <span className="text-base-content/40">0</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {leaderboard.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-base-content/60">Još nema korisnika na ljestvici</p>
            <p className="text-sm text-base-content/40 mt-1">Budi prvi koji će odgovoriti na pitanja!</p>
          </div>
        )}
      </div>
    </div>
  )
}

