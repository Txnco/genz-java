// XP Configuration
export const XP_CORRECT_ANSWER = 10
export const XP_INCORRECT_ANSWER = 2

// Level thresholds - level N requires levelThresholds[N-1] XP
export const levelThresholds = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1850,   // Level 7
  2500,   // Level 8
  3250,   // Level 9
  4100,   // Level 10
  5050,   // Level 11
  6100,   // Level 12
  7250,   // Level 13
  8500,   // Level 14
  9850,   // Level 15
  11300,  // Level 16
  12850,  // Level 17
  14500,  // Level 18
  16250,  // Level 19
  18100,  // Level 20
]

export function calculateLevel(xp: number): number {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i]) {
      return i + 1
    }
  }
  return 1
}

export function getXpForNextLevel(currentLevel: number): number {
  if (currentLevel >= levelThresholds.length) {
    return levelThresholds[levelThresholds.length - 1] + (currentLevel - levelThresholds.length + 1) * 2000
  }
  return levelThresholds[currentLevel]
}

export function getXpProgress(xp: number, level: number): { current: number; required: number; percentage: number } {
  const currentLevelXp = levelThresholds[level - 1] || 0
  const nextLevelXp = getXpForNextLevel(level)
  const current = xp - currentLevelXp
  const required = nextLevelXp - currentLevelXp
  const percentage = Math.min(100, Math.round((current / required) * 100))

  return { current, required, percentage }
}

export function getLevelProgress(xp: number) {
  const level = calculateLevel(xp)
  const currentLevelXp = levelThresholds[level - 1] || 0
  const nextLevelXp = getXpForNextLevel(level)
  const xpInCurrentLevel = xp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp
  const percentage = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100))

  return {
    level,
    currentLevelXp: xpInCurrentLevel,
    xpNeeded,
    xpForNext: nextLevelXp,
    percentage,
  }
}

/**
 * Provjerava je li korisnik već odgovorio danas
 * @param lastActivityDate Datum zadnje aktivnosti
 * @returns true ako je korisnik već odgovorio danas, false inače
 */
export function hasAnsweredToday(lastActivityDate: Date | null): boolean {
  if (!lastActivityDate) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = new Date(lastActivityDate)
  lastActivity.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - lastActivity.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays === 0 // Already answered today
}

// Backwards compatibility alias - deprecated
export const isStreakDay = hasAnsweredToday

export function shouldIncrementStreak(lastActivityDate: Date | null): boolean {
  if (!lastActivityDate) return true // First activity

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = new Date(lastActivityDate)
  lastActivity.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - lastActivity.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays === 1 // Yesterday
}

export function shouldResetStreak(lastActivityDate: Date | null): boolean {
  if (!lastActivityDate) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = new Date(lastActivityDate)
  lastActivity.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - lastActivity.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 1 // More than one day gap
}
