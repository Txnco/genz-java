/**
 * Utility functions for shuffling question options
 * Uses seeded randomization to ensure consistent shuffle order per question
 */

// Simple seeded random number generator
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash = hash & hash // Convert to 32-bit integer
  }

  return function() {
    hash = (hash * 9301 + 49297) % 233280
    return hash / 233280
  }
}

/**
 * Fisher-Yates shuffle algorithm with seeded randomization
 * This ensures the same question ID always produces the same shuffle order
 *
 * @param array The array to shuffle
 * @param seed The seed string (typically question ID)
 * @returns A new shuffled array
 */
export function shuffleArrayWithSeed<T>(array: T[], seed: string): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
