'use client'

import { useState } from 'react'
import { QuestionType } from '@prisma/client'

interface QuestionOption {
  id: string
  text: string
  order: number
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
}

export function QuestionCard({ question, onSubmit, isSubmitting }: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [textAnswer, setTextAnswer] = useState('')

  const handleOptionSelect = (optionId: string) => {
    if (question.type === 'MULTIPLE_CHOICE') {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleSubmit = () => {
    if (question.type === 'FILL_IN_BLANK' || question.type === 'SHORT_TEXT') {
      onSubmit({ selectedOptionIds: [], textAnswer })
    } else {
      onSubmit({ selectedOptionIds: selectedOptions })
    }
  }

  const isTextQuestion = question.type === 'FILL_IN_BLANK' || question.type === 'SHORT_TEXT'
  const canSubmit = isTextQuestion ? textAnswer.trim() !== '' : selectedOptions.length > 0

  // Options are already shuffled by the backend API
  const displayOptions = question.options || []

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
                disabled={isSubmitting}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {question.type === 'MULTIPLE_CHOICE' && (
                <p className="text-sm text-base-content/70 mb-4">
                  Odaberi sve točne odgovore
                </p>
              )}
              {displayOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => !isSubmitting && handleOptionSelect(option.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOptions.includes(option.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-base-content/30'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {question.type === 'MULTIPLE_CHOICE' ? (
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        readOnly
                        className="checkbox checkbox-primary"
                      />
                    ) : (
                      <input
                        type="radio"
                        checked={selectedOptions.includes(option.id)}
                        readOnly
                        className="radio radio-primary"
                      />
                    )}
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
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
