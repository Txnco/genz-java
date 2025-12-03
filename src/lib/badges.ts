import { BadgeType } from '@prisma/client'

export interface BadgeDefinition {
  type: BadgeType
  name: string
  description: string
  icon: string
  color: string
  gradient: string
}

export const BADGES: Record<BadgeType, BadgeDefinition> = {
  FIRST_STEPS: {
    type: 'FIRST_STEPS',
    name: 'Prvi koraci',
    description: 'Odgovori na svoje prvo pitanje',
    icon: '🌱',
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-600',
  },
  KNOWLEDGE_SEEKER: {
    type: 'KNOWLEDGE_SEEKER',
    name: 'Tragač za znanjem',
    description: 'Odgovori na 50 pitanja',
    icon: '📚',
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-600',
  },
  JAVA_WARRIOR: {
    type: 'JAVA_WARRIOR',
    name: 'Java ratnik',
    description: 'Odgovori na 200 pitanja',
    icon: '⚔️',
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-600',
  },
  STREAK_MASTER: {
    type: 'STREAK_MASTER',
    name: 'Majstor nizova',
    description: 'Postani aktivni 7 dana zaredom',
    icon: '🔥',
    color: '#ef4444',
    gradient: 'from-red-400 to-rose-600',
  },
  PERFECTIONIST: {
    type: 'PERFECTIONIST',
    name: 'Perfekcionist',
    description: 'Odgovori točno 10 pitanja zaredom',
    icon: '💎',
    color: '#8b5cf6',
    gradient: 'from-violet-400 to-purple-600',
  },
}

export function getBadgeDefinition(type: BadgeType): BadgeDefinition {
  return BADGES[type]
}

export function getAllBadges(): BadgeDefinition[] {
  return Object.values(BADGES)
}

// Badge eligibility checking functions
export interface UserStats {
  totalAnswers: number
  currentStreak: number
  consecutiveCorrect: number
  existingBadges: BadgeType[]
}

export function checkNewBadges(stats: UserStats): BadgeType[] {
  const newBadges: BadgeType[] = []
  
  // First Steps - Answer first question
  if (stats.totalAnswers >= 1 && !stats.existingBadges.includes('FIRST_STEPS')) {
    newBadges.push('FIRST_STEPS')
  }
  
  // Knowledge Seeker - Answer 50 questions
  if (stats.totalAnswers >= 50 && !stats.existingBadges.includes('KNOWLEDGE_SEEKER')) {
    newBadges.push('KNOWLEDGE_SEEKER')
  }
  
  // Java Warrior - Answer 200 questions
  if (stats.totalAnswers >= 200 && !stats.existingBadges.includes('JAVA_WARRIOR')) {
    newBadges.push('JAVA_WARRIOR')
  }
  
  // Streak Master - 7-day streak
  if (stats.currentStreak >= 7 && !stats.existingBadges.includes('STREAK_MASTER')) {
    newBadges.push('STREAK_MASTER')
  }
  
  // Perfectionist - 10 correct in a row
  if (stats.consecutiveCorrect >= 10 && !stats.existingBadges.includes('PERFECTIONIST')) {
    newBadges.push('PERFECTIONIST')
  }
  
  return newBadges
}

