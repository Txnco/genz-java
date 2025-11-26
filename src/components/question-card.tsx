'use client'

import { useState, useEffect } from 'react'
import { QuestionType } from '@prisma/client'

interface QuestionOption {
  id: string
  text: string
  order: number
}

interface EvaluationData {
  correctAnswerIds: string[]
  userCorrect: string[]
  userIncorrect: string[]
  explanation: string | null
  xpAwarded: number
}

interface QuestionCardProps {
  question: {
    id: string
    type: QuestionType
    prompt: string
    codeSnippet: string | null
    options: QuestionOption[]
  }
  onSubmit: (answer: { selectedOptionIds: string[]; textAnswer?: string }) => Promise<void>
  isSubmitting: boolean
  evaluation?: EvaluationData | null
  onNext?: () => void
}

export function QuestionCard({
  question,
  onSubmit,
  isSubmitting,
  evaluation,
  onNext
}: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [textAnswer, setTextAnswer] = useState('')

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptions([])
    setTextAnswer('')
  }, [question.id])

  const isSubmitted = evaluation !== null && evaluation !== undefined

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return // Don't allow changes after submission

    // Allow multiple selections for all question types (including SINGLE_CHOICE)
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleSubmit = () => {
    if (isSubmitted && onNext) {
      // If already submitted, "Nastavi" button moves to next question
      onNext()
      return
    }

    if (question.type === 'FILL_IN_BLANK' || question.type === 'SHORT_TEXT') {
      onSubmit({ selectedOptionIds: [], textAnswer })
    } else {
      onSubmit({ selectedOptionIds: selectedOptions })
    }
  }

  const isTextQuestion = question.type === 'FILL_IN_BLANK' || question.type === 'SHORT_TEXT'
  const canSubmit = isSubmitted || (isTextQuestion ? textAnswer.trim() !== '' : selectedOptions.length > 0)

  // Options are already shuffled by the backend API
  const displayOptions = question.options || []

  // Helper function to determine styling for each option
  const getOptionStyling = (optionId: string) => {
    if (!isSubmitted || !evaluation) {
      // Before submission - normal styling
      const isSelected = selectedOptions.includes(optionId)
      return {
        containerClass: `p-4 rounded-lg border-2 cursor-pointer transition-all ${
          isSelected
            ? 'border-primary bg-primary/10'
            : 'border-base-300 hover:border-base-content/30'
        }`,
        shouldShowCheck: false,
      }
    }

    // After submission - evaluation styling
    const isSelected = selectedOptions.includes(optionId)
    const isCorrectAnswer = evaluation.correctAnswerIds.includes(optionId)
    const isUserCorrect = evaluation.userCorrect.includes(optionId)
    const isUserIncorrect = evaluation.userIncorrect.includes(optionId)

    let containerClass = 'p-4 rounded-lg border-2 cursor-not-allowed transition-all '

    if (isUserCorrect) {
      // User selected & correct - green background
      containerClass += 'bg-green-600/20 border-green-500'
    } else if (isUserIncorrect) {
      // User selected & incorrect - red background
      containerClass += 'bg-red-600/20 border-red-500'
    } else if (isCorrectAnswer) {
      // Correct but not selected - green outline only
      containerClass += 'border-green-500 bg-base-200'
    } else {
      // Not selected and not correct - normal
      containerClass += 'border-base-300 bg-base-200'
    }

    return {
      containerClass,
      shouldShowCheck: isCorrectAnswer,
    }
  }

  return (
    <div className="card bg-base-200 shadow-xl">
      {/* Question Header */}
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-primary">
            {formatQuestionType(question.type)}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg whitespace-pre-wrap">
            {question.prompt}
          </p>
        </div>

        {/* Code Snippet */}
        {question.codeSnippet && (
          <div className="mt-4 mockup-code">
            <pre><code>{question.codeSnippet}</code></pre>
          </div>
        )}

        {/* Answer Section */}
        <div className="mt-6">
          {isTextQuestion ? (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tvoj odgovor:</span>
              </label>
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Upiši svoj odgovor ovdje..."
                disabled={isSubmitting || isSubmitted}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {!isSubmitted && (
                <p className="text-sm text-base-content/70 mb-4">
                  Odaberi jedan ili više odgovora
                </p>
              )}
              {displayOptions.map((option) => {
                const styling = getOptionStyling(option.id)
                return (
                  <div
                    key={option.id}
                    onClick={() => !isSubmitted && handleOptionSelect(option.id)}
                    className={styling.containerClass}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        disabled={isSubmitted}
                        readOnly
                        className="checkbox checkbox-primary"
                      />
                      <span className="flex-1">{option.text}</span>
                      {styling.shouldShowCheck && (
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Explanation (shown after submission) */}
          {isSubmitted && evaluation?.explanation && (
            <div className="mt-6 p-4 bg-base-300 rounded-lg">
              <h4 className="font-medium mb-2">Objašnjenje:</h4>
              <p className="text-base-content/80 whitespace-pre-wrap">
                {evaluation.explanation}
              </p>
            </div>
          )}

          {/* XP Award (shown after submission) */}
          {isSubmitted && evaluation && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <span className="text-primary font-medium">
                +{evaluation.xpAwarded} XP
              </span>
            </div>
          )}

          {/* Submit/Next Button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="btn btn-primary w-full mt-6"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Provjera...
              </>
            ) : isSubmitted ? (
              <>
                Nastavi
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            ) : (
              'Pošalji odgovor'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function formatQuestionType(type: QuestionType): string {
  const typeMap: Record<QuestionType, string> = {
    SINGLE_CHOICE: 'Jedan odgovor',
    MULTIPLE_CHOICE: 'Više odgovora',
    TRUE_FALSE: 'Točno / Netočno',
    FILL_IN_BLANK: 'Dopuni',
    CODE_WILL_COMPILE: 'Analiza koda',
    CODE_WILL_CRASH: 'Analiza koda',
    SHORT_TEXT: 'Kratki odgovor',
  }
  return typeMap[type] || type
}
