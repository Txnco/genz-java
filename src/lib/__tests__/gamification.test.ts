import { describe, it, expect } from 'vitest'
import {
  calculateLevel,
  getXpForNextLevel,
  getXpProgress,
  isStreakDay,
  shouldIncrementStreak,
  shouldResetStreak,
} from '../gamification'

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1)
  })

  it('should return level 1 for 99 XP', () => {
    expect(calculateLevel(99)).toBe(1)
  })

  it('should return level 2 for 100 XP', () => {
    expect(calculateLevel(100)).toBe(2)
  })

  it('should return level 3 for 250 XP', () => {
    expect(calculateLevel(250)).toBe(3)
  })

  it('should return level 5 for 850 XP', () => {
    expect(calculateLevel(850)).toBe(5)
  })

  it('should handle high XP values', () => {
    expect(calculateLevel(20000)).toBe(20)
  })
})

describe('getXpForNextLevel', () => {
  it('should return 100 for level 1', () => {
    expect(getXpForNextLevel(1)).toBe(100)
  })

  it('should return 250 for level 2', () => {
    expect(getXpForNextLevel(2)).toBe(250)
  })

  it('should return 500 for level 3', () => {
    expect(getXpForNextLevel(3)).toBe(500)
  })
})

describe('getXpProgress', () => {
  it('should return correct progress for level 1', () => {
    const progress = getXpProgress(50, 1)
    expect(progress.current).toBe(50)
    expect(progress.required).toBe(100)
    expect(progress.percentage).toBe(50)
  })

  it('should return 0% at start of level', () => {
    const progress = getXpProgress(100, 2)
    expect(progress.current).toBe(0)
    expect(progress.percentage).toBe(0)
  })

  it('should cap percentage at 100', () => {
    const progress = getXpProgress(300, 2)
    expect(progress.percentage).toBeLessThanOrEqual(100)
  })
})

describe('streak functions', () => {
  describe('isStreakDay', () => {
    it('should return false for null date', () => {
      expect(isStreakDay(null)).toBe(false)
    })

    it('should return true for today', () => {
      const today = new Date()
      expect(isStreakDay(today)).toBe(true)
    })

    it('should return false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isStreakDay(yesterday)).toBe(false)
    })
  })

  describe('shouldIncrementStreak', () => {
    it('should return true for null date (first activity)', () => {
      expect(shouldIncrementStreak(null)).toBe(true)
    })

    it('should return true for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(shouldIncrementStreak(yesterday)).toBe(true)
    })

    it('should return false for today', () => {
      const today = new Date()
      expect(shouldIncrementStreak(today)).toBe(false)
    })

    it('should return false for 2 days ago', () => {
      const twoDaysAgo = new Date()
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      expect(shouldIncrementStreak(twoDaysAgo)).toBe(false)
    })
  })

  describe('shouldResetStreak', () => {
    it('should return false for null date', () => {
      expect(shouldResetStreak(null)).toBe(false)
    })

    it('should return false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(shouldResetStreak(yesterday)).toBe(false)
    })

    it('should return true for 2 days ago', () => {
      const twoDaysAgo = new Date()
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      expect(shouldResetStreak(twoDaysAgo)).toBe(true)
    })

    it('should return true for week ago', () => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      expect(shouldResetStreak(weekAgo)).toBe(true)
    })
  })
})
