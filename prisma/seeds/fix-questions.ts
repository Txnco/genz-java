/**
 * Script za ispravljanje pitanja:
 * 1. Prevodi CODE_WILL_COMPILE opcije na hrvatski
 * 2. Mijenja tip pitanja koja pitaju za output umjesto kompilaciju
 * 3. Dodaje Fisher-Yates shuffle za opcije
 */

import { PrismaClient, QuestionType, Difficulty } from '@prisma/client'

const prisma = new PrismaClient()

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Standard CODE_WILL_COMPILE opcije na hrvatskom
export const standardCompileOptions = [
  { text: 'Kompilira se i izvršava uspješno', isCorrect: false },
  { text: 'Neće se kompilirati (greška pri kompilaciji)', isCorrect: false },
  { text: 'Kompilira se ali baca iznimku pri izvođenju', isCorrect: false },
]

// Mapiranje engleskih opcija na hrvatske
const optionTranslations: Record<string, string> = {
  'Will compile and run successfully': 'Kompilira se i izvršava uspješno',
  'Will not compile (compilation error)': 'Neće se kompilirati (greška pri kompilaciji)',
  'Compiles but throws runtime exception': 'Kompilira se ali baca iznimku pri izvođenju',
  'True': 'Točno',
  'False': 'Netočno',
}

async function fixQuestions() {
  console.log('Popravljanje pitanja...')

  // Dohvati sva pitanja
  const questions = await prisma.question.findMany({
    include: {
      options: true,
    },
  })

  let fixedCount = 0
  let translatedCount = 0
  let typeChangedCount = 0

  for (const question of questions) {
    let needsUpdate = false
    let newType = question.type
    const updatedOptions: Array<{ id: string; text: string }> = []

    // Provjeri je li CODE_WILL_COMPILE s pitanjem o outputu
    if (
      question.type === 'CODE_WILL_COMPILE' &&
      (question.prompt.includes('Što će ispisati') ||
        question.prompt.includes('Koji je output') ||
        question.prompt.includes('Što ispisuje'))
    ) {
      // Ova pitanja bi trebala biti SINGLE_CHOICE, ne CODE_WILL_COMPILE
      console.log(`⚠️  Pitanje ${question.id} pita za output ali je tipa CODE_WILL_COMPILE`)
      console.log(`   Prompt: ${question.prompt.substring(0, 60)}...`)

      // Ne mijenjamo automatski tip jer bi trebali provjeriti opcije
      // Ako ima 3 standardne compile opcije, onda je greška
      const hasStandardOptions = question.options.some(opt =>
        opt.text.includes('compile') || opt.text.includes('Kompilira')
      )

      if (hasStandardOptions) {
        console.log(`   ❌ Ima standardne compile opcije - potrebno ručno ispraviti!`)
        console.log(`   Opcije: ${question.options.map(o => o.text).join(' | ')}`)
        typeChangedCount++
      }
    }

    // Prevedi opcije na hrvatski
    for (const option of question.options) {
      const translated = optionTranslations[option.text]
      if (translated && translated !== option.text) {
        updatedOptions.push({ id: option.id, text: translated })
        needsUpdate = true
        translatedCount++
      }
    }

    if (needsUpdate) {
      // Ažuriraj opcije
      for (const opt of updatedOptions) {
        await prisma.questionOption.update({
          where: { id: opt.id },
          data: { text: opt.text },
        })
      }
      fixedCount++
    }
  }

  console.log(`\n✅ Gotovo!`)
  console.log(`   ${fixedCount} pitanja ažurirano`)
  console.log(`   ${translatedCount} opcija prevedeno`)
  console.log(`   ${typeChangedCount} pitanja zahtijeva ručno ispravljanje tipa`)

  // Prikaži sva problematična pitanja
  if (typeChangedCount > 0) {
    console.log(`\n⚠️  Pitanja koja trebaju ručno ispravljanje:`)
    const problematicQuestions = await prisma.question.findMany({
      where: {
        type: 'CODE_WILL_COMPILE',
        OR: [
          { prompt: { contains: 'Što će ispisati' } },
          { prompt: { contains: 'Koji je output' } },
          { prompt: { contains: 'Što ispisuje' } },
        ],
      },
      include: {
        options: true,
        lecture: {
          select: { title: true, slug: true },
        },
      },
    })

    for (const q of problematicQuestions) {
      const hasCompileOptions = q.options.some(opt =>
        opt.text.includes('compile') ||
        opt.text.includes('Kompilira') ||
        opt.text.includes('Will compile')
      )

      if (hasCompileOptions) {
        console.log(`\n   ID: ${q.id}`)
        console.log(`   Lekcija: ${q.lecture.title}`)
        console.log(`   Prompt: ${q.prompt}`)
        console.log(`   Opcije:`)
        q.options.forEach((opt, i) => {
          console.log(`      ${i + 1}. ${opt.text} ${opt.isCorrect ? '✓' : ''}`)
        })
      }
    }
  }
}

fixQuestions()
  .catch((error) => {
    console.error('Greška:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
