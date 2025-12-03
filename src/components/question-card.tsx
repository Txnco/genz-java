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

  useEffect(() => {
    setSelectedOptions([])
    setTextAnswer('')
  }, [question.id])

  const isSubmitted = evaluation !== null && evaluation !== undefined

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return

    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleSubmit = () => {
    if (isSubmitted && onNext) {
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

  const displayOptions = question.options || []

  const getOptionStyling = (optionId: string) => {
    if (!isSubmitted || !evaluation) {
      const isSelected = selectedOptions.includes(optionId)
      return {
        containerClass: `group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
          isSelected
            ? 'border-primary bg-primary/5'
            : 'border-base-300/70 hover:border-base-content/20 hover:bg-base-200/50'
        }`,
        checkClass: isSelected ? 'border-primary bg-primary text-white' : 'border-base-300',
        shouldShowCheck: false,
        isCorrect: false,
        isIncorrect: false,
      }
    }

    const isSelected = selectedOptions.includes(optionId)
    const isCorrectAnswer = evaluation.correctAnswerIds.includes(optionId)
    const isUserCorrect = evaluation.userCorrect.includes(optionId)
    const isUserIncorrect = evaluation.userIncorrect.includes(optionId)

    let containerClass = 'relative p-4 rounded-xl border-2 transition-all duration-200 cursor-default '
    let checkClass = 'border-base-300 '

    if (isUserCorrect) {
      containerClass += 'bg-green-500/10 border-green-500'
      checkClass = 'border-green-500 bg-green-500 text-white'
    } else if (isUserIncorrect) {
      containerClass += 'bg-red-500/10 border-red-500'
      checkClass = 'border-red-500 bg-red-500 text-white'
    } else if (isCorrectAnswer) {
      containerClass += 'border-green-500/50 bg-base-200'
      checkClass = 'border-green-500'
    } else {
      containerClass += 'border-base-300/50 bg-base-200/50'
    }

    return {
      containerClass,
      checkClass,
      shouldShowCheck: isCorrectAnswer,
      isCorrect: isUserCorrect,
      isIncorrect: isUserIncorrect,
    }
  }

  return (
    <div className="card-float overflow-hidden animate-scale-in">
      {/* Question Header */}
      <div className="p-6 pb-5 border-b border-base-200/80">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge-modern text-xs">
            {formatQuestionType(question.type)}
          </span>
        </div>

        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {question.prompt}
        </p>

        {/* Code Snippet */}
        {question.codeSnippet && (
          <div className="mt-5 rounded-xl overflow-hidden">
            <pre className="rounded-xl! my-0!">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Answer Section */}
      <div className="p-6">
        {isTextQuestion ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/70">
              Tvoj odgovor
            </label>
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="input-modern"
              placeholder="Upiši svoj odgovor ovdje..."
              disabled={isSubmitting || isSubmitted}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {!isSubmitted && (
              <p className="text-sm text-base-content/50 mb-4">
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
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${styling.checkClass}`}>
                      {(selectedOptions.includes(option.id) || styling.shouldShowCheck) && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-[15px] leading-relaxed">{option.text}</span>
                    
                    {/* Result icon */}
                    {isSubmitted && styling.isCorrect && (
                      <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {isSubmitted && styling.isIncorrect && (
                      <div className="shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Explanation */}
        {isSubmitted && evaluation?.explanation && (
          <div className="mt-6 p-4 rounded-xl bg-base-200/80 border border-base-300/50">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <h4 className="font-medium text-sm">Objašnjenje</h4>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-wrap">
              {evaluation.explanation}
            </p>
          </div>
        )}

        {/* XP Award */}
        {isSubmitted && evaluation && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full animate-scale-in">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              +{evaluation.xpAwarded} XP
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="btn-modern btn-modern-primary w-full mt-6 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Provjera...
            </span>
          ) : isSubmitted ? (
            <span className="flex items-center gap-2">
              Nastavi
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          ) : (
            'Pošalji odgovor'
          )}
        </button>
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
