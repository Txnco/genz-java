import { QuestionType } from '@prisma/client'

interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

interface EvaluationResult {
  isCorrect: boolean
  correctAnswers?: string[]
  feedback?: string
}

export function evaluateAnswer(
  questionType: QuestionType,
  options: QuestionOption[],
  selectedOptionIds: string[],
  textAnswer?: string
): EvaluationResult {
  switch (questionType) {
    case 'SINGLE_CHOICE':
    case 'TRUE_FALSE':
    case 'CODE_WILL_COMPILE':
    case 'CODE_WILL_CRASH':
      return evaluateSingleChoice(options, selectedOptionIds)

    case 'MULTIPLE_CHOICE':
      return evaluateMultipleChoice(options, selectedOptionIds)

    case 'FILL_IN_BLANK':
    case 'SHORT_TEXT':
      return evaluateTextAnswer(options, textAnswer)

    default:
      return { isCorrect: false, feedback: 'Unknown question type' }
  }
}

function evaluateSingleChoice(
  options: QuestionOption[],
  selectedOptionIds: string[]
): EvaluationResult {
  const correctOption = options.find(opt => opt.isCorrect)
  const selectedId = selectedOptionIds[0]

  const isCorrect = correctOption?.id === selectedId

  return {
    isCorrect,
    correctAnswers: correctOption ? [correctOption.text] : [],
  }
}

function evaluateMultipleChoice(
  options: QuestionOption[],
  selectedOptionIds: string[]
): EvaluationResult {
  const correctOptionIds = options.filter(opt => opt.isCorrect).map(opt => opt.id)
  const correctOptionTexts = options.filter(opt => opt.isCorrect).map(opt => opt.text)

  // Check if selected options match exactly with correct options
  const selectedSet = new Set(selectedOptionIds)
  const correctSet = new Set(correctOptionIds)

  const isCorrect =
    selectedSet.size === correctSet.size &&
    Array.from(selectedSet).every(id => correctSet.has(id))

  return {
    isCorrect,
    correctAnswers: correctOptionTexts,
  }
}

function evaluateTextAnswer(
  options: QuestionOption[],
  textAnswer?: string
): EvaluationResult {
  if (!textAnswer) {
    return { isCorrect: false, feedback: 'No answer provided' }
  }

  // Get correct answers from options (support multiple correct answers)
  const correctAnswers = options
    .filter(opt => opt.isCorrect)
    .map(opt => opt.text.toLowerCase().trim())

  const normalizedAnswer = textAnswer.toLowerCase().trim()

  // Check if the answer matches any correct answer
  const isCorrect = correctAnswers.some(correct => {
    // Exact match after normalization
    if (correct === normalizedAnswer) return true

    // Allow minor variations (remove extra spaces, punctuation)
    const cleanCorrect = correct.replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ')
    const cleanAnswer = normalizedAnswer.replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ')

    return cleanCorrect === cleanAnswer
  })

  return {
    isCorrect,
    correctAnswers: options.filter(opt => opt.isCorrect).map(opt => opt.text),
  }
}

// Code analysis question options
export const CODE_BEHAVIOR_OPTIONS = [
  { value: 'compiles_runs', text: 'Will compile and run successfully' },
  { value: 'no_compile', text: 'Will not compile (compilation error)' },
  { value: 'runtime_exception', text: 'Compiles but throws runtime exception' },
]

export const TRUE_FALSE_OPTIONS = [
  { value: 'true', text: 'True' },
  { value: 'false', text: 'False' },
]
