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
        containerClass: `group relative px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${
          isSelected
            ? 'bg-[var(--text-primary)]/[0.06] ring-1 ring-[var(--text-primary)]/20'
            : 'bg-[var(--bg-surface)] hover:bg-[var(--text-primary)]/[0.03] ring-1 ring-transparent hover:ring-[var(--text-primary)]/10'
        }`,
        indicatorClass: isSelected 
          ? 'bg-[var(--text-primary)] ring-0' 
          : 'bg-transparent ring-1 ring-[var(--text-muted)]/40 group-hover:ring-[var(--text-muted)]/60',
        shouldShowCheck: false,
        isCorrect: false,
        isIncorrect: false,
      }
    }

    const isCorrectAnswer = evaluation.correctAnswerIds.includes(optionId)
    const isUserCorrect = evaluation.userCorrect.includes(optionId)
    const isUserIncorrect = evaluation.userIncorrect.includes(optionId)

    let containerClass = 'relative px-5 py-4 rounded-2xl transition-all duration-300 cursor-default '
    let indicatorClass = 'ring-1 '

    if (isUserCorrect) {
      containerClass += 'bg-emerald-500/[0.08] ring-1 ring-emerald-500/30'
      indicatorClass = 'bg-emerald-500 ring-0'
    } else if (isUserIncorrect) {
      containerClass += 'bg-rose-500/[0.08] ring-1 ring-rose-500/30'
      indicatorClass = 'bg-rose-500 ring-0'
    } else if (isCorrectAnswer) {
      containerClass += 'bg-emerald-500/[0.04] ring-1 ring-emerald-500/20'
      indicatorClass = 'bg-transparent ring-1 ring-emerald-500/50'
    } else {
      containerClass += 'bg-[var(--bg-surface)]/50 ring-1 ring-[var(--border-color)]/30'
      indicatorClass = 'bg-transparent ring-1 ring-[var(--text-muted)]/20'
    }

    return {
      containerClass,
      indicatorClass,
      shouldShowCheck: isCorrectAnswer,
      isCorrect: isUserCorrect,
      isIncorrect: isUserIncorrect,
    }
  }

  return (
    <div className="bg-[var(--bg-surface)] rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden animate-scale-in ring-1 ring-[var(--border-color)]/50">
      {/* Question Header */}
      <div className="px-7 pt-7 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--text-primary)]/[0.06] text-[var(--text-muted)]">
            {formatQuestionType(question.type)}
          </span>
        </div>

        <p className="text-lg leading-[1.7] text-[var(--text-primary)] whitespace-pre-wrap">
          {question.prompt}
        </p>

        {/* Code Snippet */}
        {question.codeSnippet && (
          <div className="mt-6 rounded-2xl overflow-hidden ring-1 ring-[var(--border-color)]/30">
            <pre className="!rounded-2xl !my-0 !border-0 text-[13px]">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Answer Section */}
      <div className="px-7 pb-7 pt-2">
        {isTextQuestion ? (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[var(--text-muted)]">
              Tvoj odgovor
            </label>
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="w-full px-5 py-4 bg-[var(--bg-surface)] rounded-2xl text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 ring-1 ring-[var(--border-color)]/50 focus:ring-[var(--text-primary)]/30 focus:outline-none transition-all"
              placeholder="Upiši svoj odgovor ovdje..."
              disabled={isSubmitting || isSubmitted}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {!isSubmitted && (
              <p className="text-sm text-[var(--text-muted)]/70 mb-5">
                Odaberi jedan ili više odgovora
              </p>
            )}
            {displayOptions.map((option, index) => {
              const styling = getOptionStyling(option.id)
              return (
                <div
                  key={option.id}
                  onClick={() => !isSubmitted && handleOptionSelect(option.id)}
                  className={styling.containerClass}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Custom radio/checkbox indicator */}
                    <div className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${styling.indicatorClass}`}>
                      {(selectedOptions.includes(option.id) || styling.shouldShowCheck) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-[15px] leading-relaxed text-[var(--text-primary)]/90">{option.text}</span>
                    
                    {/* Result icon */}
                    {isSubmitted && styling.isCorrect && (
                      <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {isSubmitted && styling.isIncorrect && (
                      <div className="shrink-0 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shadow-sm">
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
          <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-[var(--text-primary)]/[0.03] to-transparent ring-1 ring-[var(--border-color)]/30">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm text-[var(--text-primary)]">Objašnjenje</h4>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap pl-[38px]">
              {evaluation.explanation}
            </p>
          </div>
        )}

        {/* XP Award */}
        {isSubmitted && evaluation && (
          <div className="mt-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20 animate-scale-in">
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
          className={`w-full mt-7 py-4 px-6 rounded-2xl font-semibold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitted
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90'
              : canSubmit
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 shadow-lg shadow-[var(--text-primary)]/10'
                : 'bg-[var(--border-color)] text-[var(--text-muted)] cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Provjera...
            </>
          ) : isSubmitted ? (
            <>
              Nastavi
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
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
