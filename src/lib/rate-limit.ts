/**
 * Jednostavna in-memory rate limiting implementacija
 * Za produkciju, koristiti Redis ili sličnu distributed cache bazu
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Cleanup stare unose svakih 5 minuta
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  /**
   * Maksimalni broj zahtjeva u vremenskom prozoru
   */
  maxRequests: number
  /**
   * Vremenski prozor u sekundama
   */
  windowSeconds: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Provjerava rate limit za dani identifikator
 * @param identifier Jedinstveni identifikator (npr. userId, IP adresa)
 * @param config Rate limit konfiguracija
 * @returns Rezultat rate limit provjere
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = `${identifier}`

  let entry = rateLimitMap.get(key)

  if (!entry || entry.resetAt < now) {
    // Novi prozor ili istekao stari
    entry = {
      count: 0,
      resetAt: now + config.windowSeconds * 1000,
    }
    rateLimitMap.set(key, entry)
  }

  // Inkrementiraj brojač
  entry.count++

  const success = entry.count <= config.maxRequests
  const remaining = Math.max(0, config.maxRequests - entry.count)

  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: entry.resetAt,
  }
}

/**
 * Rate limit za login pokušaje - 5 pokušaja u 15 minuta
 */
export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 5,
  windowSeconds: 15 * 60, // 15 minutes
}

/**
 * Rate limit za registraciju - 3 registracije po IP u 1 sat
 */
export const REGISTER_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 3,
  windowSeconds: 60 * 60, // 1 hour
}

/**
 * Rate limit za slanje odgovora na pitanja - 100 u 1 minuti
 */
export const QUIZ_SUBMIT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 100,
  windowSeconds: 60, // 1 minute
}

/**
 * Rate limit za AI generiranje pitanja - 10 u 1 satu
 */
export const AI_GENERATE_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10,
  windowSeconds: 60 * 60, // 1 hour
}
