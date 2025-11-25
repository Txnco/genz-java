'use client'

import { getXpProgress } from '@/lib/gamification'

interface XpBadgeProps {
  xp: number
  level: number
  streak: number
  compact?: boolean
}

export function XpBadge({ xp, level, streak, compact = false }: XpBadgeProps) {
  const progress = getXpProgress(xp, level)

  if (compact) {
    return (
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">XP:</span>
          <span className="font-medium">{xp}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-indigo-500">Lvl:</span>
          <span className="font-medium">{level}</span>
        </div>
        {streak > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-orange-500">Streak:</span>
            <span className="font-medium">{streak}d</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            {level}
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
            <div className="font-semibold">{xp} XP</div>
          </div>
        </div>

        {streak > 0 && (
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-500">{streak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">day streak</div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Progress to Level {level + 1}</span>
          <span>{progress.current} / {progress.required} XP</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
