/**
 * Pomoćne funkcije za seeding pitanja
 * Shuffling se više ne radi ovdje - to se obavlja na frontendu pri prikazu
 */

// Standardne opcije za CODE_WILL_COMPILE pitanja (na hrvatskom)
export const CODE_COMPILE_OPTIONS = {
  COMPILES_AND_RUNS: { text: 'Kompilira se i izvršava uspješno', isCorrect: false },
  COMPILE_ERROR: { text: 'Neće se kompilirati (greška pri kompilaciji)', isCorrect: false },
  RUNTIME_EXCEPTION: { text: 'Kompilira se ali baca iznimku pri izvođenju', isCorrect: false },
}

/**
 * Kreira opcije za CODE_WILL_COMPILE pitanje s pravilnim odgovorom
 * Opcije su vraćene u fiksnom redoslijedu - shuffling se obavlja na frontendu
 * @param correctAnswer Koji je pravilan odgovor
 * @returns Array opcija u fiksnom redoslijedu
 */
export function createCompileOptions(
  correctAnswer: 'COMPILES_AND_RUNS' | 'COMPILE_ERROR' | 'RUNTIME_EXCEPTION'
): Array<{ text: string; isCorrect: boolean }> {
  return [
    {
      ...CODE_COMPILE_OPTIONS.COMPILES_AND_RUNS,
      isCorrect: correctAnswer === 'COMPILES_AND_RUNS',
    },
    {
      ...CODE_COMPILE_OPTIONS.COMPILE_ERROR,
      isCorrect: correctAnswer === 'COMPILE_ERROR',
    },
    {
      ...CODE_COMPILE_OPTIONS.RUNTIME_EXCEPTION,
      isCorrect: correctAnswer === 'RUNTIME_EXCEPTION',
    },
  ]
}
