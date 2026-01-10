#!/usr/bin/env tsx
/**
 * Import generated questions from JSON into the database
 *
 * Usage:
 *   npx tsx importer/import-to-db.ts importer/output/classes-and-objects_20260110_153000.json
 *   npm run import-questions -- importer/output/classes-and-objects_20260110_153000.json
 */

import { PrismaClient, QuestionType, Difficulty } from '@prisma/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ============================================================================
// TYPES
// ============================================================================

interface QuestionOption {
  text: string
  isCorrect: boolean
}

interface Question {
  type: QuestionType
  prompt: string
  codeSnippet: string | null
  explanation: string
  difficulty: Difficulty
  options: QuestionOption[]
}

interface QuestionFile {
  lectureSlug: string
  generatedAt: string
  questions: Question[]
}

// ============================================================================
// PRISMA CLIENT
// ============================================================================

const prisma = new PrismaClient()

// ============================================================================
// VALIDATION
// ============================================================================

function validateQuestion(question: Question, index: number): string[] {
  const errors: string[] = []

  // Check required fields
  if (!question.type) errors.push(`Question ${index + 1}: Missing 'type'`)
  if (!question.prompt) errors.push(`Question ${index + 1}: Missing 'prompt'`)
  if (!question.explanation) errors.push(`Question ${index + 1}: Missing 'explanation'`)
  if (!question.difficulty) errors.push(`Question ${index + 1}: Missing 'difficulty'`)

  // Validate type enum
  const validTypes = [
    'SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_BLANK',
    'CODE_WILL_COMPILE', 'CODE_WILL_CRASH', 'SHORT_TEXT',
    // TVZ generator types
    'CODE_RUNTIME_BEHAVIOR', 'CODE_OUTPUT', 'FIND_THE_ERROR',
    'WHAT_IS_MISSING', 'WHAT_MUST_BE_FIXED', 'WHICH_STATEMENTS_COMPILE',
    'WHICH_EXCEPTIONS_OCCUR', 'WHICH_METHOD_IS_TERMINAL', 'WHICH_TYPE_IS_RETURNED',
    'ORDER_OF_EXECUTION', 'EDGE_CASE_BEHAVIOR'
  ]
  if (!validTypes.includes(question.type)) {
    errors.push(`Question ${index + 1}: Invalid type '${question.type}'`)
  }

  // Validate difficulty enum
  const validDifficulties = ['EASY', 'MEDIUM', 'HARD']
  if (!validDifficulties.includes(question.difficulty)) {
    errors.push(`Question ${index + 1}: Invalid difficulty '${question.difficulty}'`)
  }

  // Validate options
  if (!question.options || !Array.isArray(question.options)) {
    errors.push(`Question ${index + 1}: Missing or invalid 'options'`)
  } else {
    // Must have exactly 6 options
    if (question.options.length !== 6) {
      errors.push(`Question ${index + 1}: Expected 6 options, got ${question.options.length}`)
    }

    // Each option must have text and isCorrect
    question.options.forEach((opt, i) => {
      if (!opt.text) {
        errors.push(`Question ${index + 1}, Option ${i + 1}: Missing 'text'`)
      }
      if (typeof opt.isCorrect !== 'boolean') {
        errors.push(`Question ${index + 1}, Option ${i + 1}: Invalid 'isCorrect' (must be boolean)`)
      }
    })

    // At least one option must be correct
    const hasCorrect = question.options.some(opt => opt.isCorrect)
    if (!hasCorrect) {
      errors.push(`Question ${index + 1}: No correct answer found`)
    }
  }

  return errors
}

// ============================================================================
// IMPORT LOGIC
// ============================================================================

async function importQuestions(filePath: string) {
  console.log('📚 Java Question Importer - Database Integration\n')

  // Read and parse JSON file
  console.log(`📖 Reading file: ${filePath}`)
  const absolutePath = resolve(filePath)

  let data: QuestionFile
  try {
    const fileContent = readFileSync(absolutePath, 'utf-8')
    data = JSON.parse(fileContent)
  } catch (error) {
    console.error(`❌ Failed to read or parse file: ${error}`)
    process.exit(1)
  }

  console.log(`✓ Loaded ${data.questions.length} questions for lecture: ${data.lectureSlug}\n`)

  // Validate lecture exists
  console.log(`🔍 Validating lecture: ${data.lectureSlug}`)
  const lecture = await prisma.lecture.findUnique({
    where: { slug: data.lectureSlug }
  })

  if (!lecture) {
    console.error(`❌ Lecture not found in database: ${data.lectureSlug}`)
    console.error(`\n💡 Make sure you've run: npm run db:seed`)
    process.exit(1)
  }

  console.log(`✓ Lecture found: ${lecture.title} (ID: ${lecture.id})\n`)

  // Validate all questions
  console.log(`✅ Validating questions...`)
  const allErrors: string[] = []

  data.questions.forEach((question, index) => {
    const errors = validateQuestion(question, index)
    allErrors.push(...errors)
  })

  if (allErrors.length > 0) {
    console.error(`\n❌ Validation failed with ${allErrors.length} error(s):\n`)
    allErrors.forEach(error => console.error(`  • ${error}`))
    process.exit(1)
  }

  console.log(`✓ All ${data.questions.length} questions are valid\n`)

  // Import questions
  console.log(`💾 Importing questions to database...`)
  let imported = 0
  let skipped = 0

  for (const [index, questionData] of data.questions.entries()) {
    try {
      // Check if question already exists (prevent duplicates)
      const existingQuestion = await prisma.question.findFirst({
        where: {
          lectureId: lecture.id,
          prompt: questionData.prompt,
        }
      })

      if (existingQuestion) {
        console.log(`  ⚠️  Question ${index + 1}: Already exists (skipping)`)
        skipped++
        continue
      }

      // Create question with options in a transaction
      await prisma.question.create({
        data: {
          lectureId: lecture.id,
          type: questionData.type,
          prompt: questionData.prompt,
          codeSnippet: questionData.codeSnippet,
          explanation: questionData.explanation,
          difficulty: questionData.difficulty,
          options: {
            create: questionData.options.map((opt, i) => ({
              text: opt.text,
              isCorrect: opt.isCorrect,
              order: i,
            }))
          }
        }
      })

      imported++
      console.log(`  ✓ Question ${index + 1}: Imported`)
    } catch (error) {
      console.error(`  ❌ Question ${index + 1}: Import failed - ${error}`)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Import Summary')
  console.log('='.repeat(60))
  console.log(`Lecture:        ${data.lectureSlug}`)
  console.log(`Total questions: ${data.questions.length}`)
  console.log(`Imported:       ${imported}`)
  console.log(`Skipped:        ${skipped}`)
  console.log('='.repeat(60) + '\n')

  if (imported > 0) {
    console.log('✅ Import complete!\n')
  } else {
    console.log('⚠️  No new questions were imported.\n')
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('❌ Usage: npx tsx importer/import-to-db.ts <json-file>')
    console.error('\nExample:')
    console.error('  npx tsx importer/import-to-db.ts importer/output/classes-and-objects_20260110_153000.json')
    console.error('  npm run import-questions -- importer/output/oop-concepts_20260110_154500.json')
    process.exit(1)
  }

  const filePath = args[0]

  try {
    await importQuestions(filePath)
  } catch (error) {
    console.error(`\n❌ Fatal error: ${error}`)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
