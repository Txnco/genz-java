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
import { filesAndFoldersQuestions } from './files-and-folders'
import { javaBasicsQuestions } from './questions-java-basics'
import { javaFx } from './javafx'

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
  sortingQuestions,
  codeBehaviorQuestions,
  filesAndFoldersQuestions,
  javaFx,
  // javaBasicsQuestions,
]

type SeedMode = 'SYNC' | 'RESET'

export async function seedQuestions() {
  const seedMode = (process.env.SEED_MODE || 'SYNC') as SeedMode
  console.log('🌱 Seeding questions...')
  console.log(`ℹ️  Mode: ${seedMode}`)

  for (const seeder of questionSeeders) {
    console.log(`\n📚 Processing lecture: ${seeder.lectureSlug}`)

    // Find the lecture by slug
    const lecture = await prisma.lecture.findUnique({
      where: { slug: seeder.lectureSlug },
    })

    if (!lecture) {
      console.warn(`⚠️  Lecture with slug '${seeder.lectureSlug}' not found. Skipping...`)
      continue
    }

    if (seedMode === 'RESET') {
      console.log(`🔥 RESET MODE: Deleting all questions for ${seeder.lectureSlug}...`)
      await prisma.question.deleteMany({
        where: { lectureId: lecture.id },
      })
      console.log(`✨ Deleted all questions. Re-creating...`)
    }

    let createdCount = 0
    let updatedCount = 0
    let skippedCount = 0
    const processedQuestionIds: string[] = []

    for (const questionData of seeder.questions) {
      // Check if question already exists (by prompt and lectureId)
      const existingQuestion = await prisma.question.findFirst({
        where: {
          lectureId: lecture.id,
          prompt: questionData.prompt,
        },
      })

      if (existingQuestion) {
        if (seedMode === 'SYNC') {
          // Update existing question metadata
          await prisma.question.update({
            where: { id: existingQuestion.id },
            data: {
              type: questionData.type as any,
              codeSnippet: questionData.codeSnippet || null,
              explanation: questionData.explanation || null,
              difficulty: questionData.difficulty as any,
              // Note: We are strictly NOT updating options here to preserve UserQuestionAnswer integrity.
              // If options need to change, the question prompt should ideally change or use RESET mode.
            }
          })
          updatedCount++
          processedQuestionIds.push(existingQuestion.id)
        } else {
          // In RESET mode, we shouldn't really hit this as we deleted everything, 
          // unless there are duplicate prompts in the seed file itself.
          skippedCount++
        }
      } else {
        // Create the question with its options
        const newQuestion = await prisma.question.create({
          data: {
            lectureId: lecture.id,
            type: questionData.type as any,
            prompt: questionData.prompt,
            codeSnippet: questionData.codeSnippet || null,
            explanation: questionData.explanation || null,
            difficulty: questionData.difficulty as any,
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
        processedQuestionIds.push(newQuestion.id)
      }
    }

    // After processing all seed questions, check for orphans in SYNC mode
    if (seedMode === 'SYNC') {
      const orphans = await prisma.question.findMany({
        where: {
          lectureId: lecture.id,
          id: { notIn: processedQuestionIds }
        },
        select: { id: true }
      })

      if (orphans.length > 0) {
        console.log(`🗑️  Found ${orphans.length} orphan questions (present in DB but not in seed). Deleting...`)
        await prisma.question.deleteMany({
          where: {
            id: { in: orphans.map(o => o.id) }
          }
        })
      }
    }

    console.log(`✅ Result for ${seeder.lectureSlug}:`)
    console.log(`   Created: ${createdCount}`)
    if (seedMode === 'SYNC') {
      console.log(`   Updated: ${updatedCount}`)
      console.log(`   Skipped: ${skippedCount}`)
    }
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
