import { PrismaClient } from '@prisma/client'
import { classesAndObjectsQuestions } from './questions-classes-and-objects'
import { oopConceptsQuestions } from './questions-oop-concepts'
import { exceptionsQuestions } from './questions-exceptions'
import { javadocQuestions } from './questions-javadoc'
import { collectionsQuestions } from './questions-collections'
import { genericsQuestions } from './questions-generics'
import { lambdaExpressionsQuestions } from './questions-lambda-expressions'
import { streamApiQuestions } from './questions-stream-api'
import { sortingQuestions } from './questions-sorting'
import { codeBehaviorQuestions } from './questions-code-behavior'
import { javaBasicsQuestions } from './questions-java-basics'

const prisma = new PrismaClient()

//Array of all question seeders
const questionSeeders = [
  classesAndObjectsQuestions,
  oopConceptsQuestions,
  exceptionsQuestions,
  javadocQuestions,
  collectionsQuestions,
  genericsQuestions,
  lambdaExpressionsQuestions,
  streamApiQuestions,
  sortingQuestions
  // codeBehaviorQuestions,
  // javaBasicsQuestions,
]



export async function seedQuestions() {
  console.log('🌱 Seeding questions...')

  for (const seeder of questionSeeders) {
    console.log(`\n📚 Seeding questions for lecture: ${seeder.lectureSlug}`)

    // Find the lecture by slug
    const lecture = await prisma.lecture.findUnique({
      where: { slug: seeder.lectureSlug },
    })

    if (!lecture) {
      console.warn(`⚠️  Lecture with slug '${seeder.lectureSlug}' not found. Skipping...`)
      continue
    }

    let createdCount = 0
    let skippedCount = 0

    for (const questionData of seeder.questions) {
      // Check if question already exists (by prompt and lectureId)
      const existingQuestion = await prisma.question.findFirst({
        where: {
          lectureId: lecture.id,
          prompt: questionData.prompt,
        },
      })

      if (existingQuestion) {
        skippedCount++
        continue
      }

      // Create the question with its options
      await prisma.question.create({
        data: {
          lectureId: lecture.id,
          type: questionData.type,
          prompt: questionData.prompt,
          codeSnippet: questionData.codeSnippet,
          explanation: questionData.explanation,
          difficulty: questionData.difficulty,
          tags: ['seed'],
          options: {
            create: questionData.options.map((opt: { text: string; isCorrect: boolean }, index: number) => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
              order: index,
            })),
          },
        },
      })

      createdCount++
    }

    console.log(`✅ Created ${createdCount} questions, skipped ${skippedCount} duplicates`)
  }

  console.log('\n✨ Questions seeding complete!')
}

// Allow running this file directly
if (require.main === module) {
  seedQuestions()
    .catch((error) => {
      console.error('❌ Error seeding questions:', error)
      process.exit(1)
    })
    .finally(() => prisma.$disconnect())
}
