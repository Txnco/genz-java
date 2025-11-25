'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { QuestionType } from '@prisma/client'

interface TestAnswer {
  id: string
  questionId: string
  selectedOptionIds: string[]
  textAnswer: string | null
  isCorrect: boolean
  isSkipped: boolean
  question: {
    id: string
    type: QuestionType
    difficulty: string
    prompt: string
    codeSnippet: string | null
    explanation: string | null
    options: Array<{
      id: string
      text: string
      isCorrect: boolean
    }>
    lecture: {
      title: string
    }
  }
}

interface TestResult {
  id: string
  score: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  skippedCount: number
  timeSpent: number | null
  completedAt: string
  test: {
    title: string
    description: string | null
  }
  answers: TestAnswer[]
}

interface ResultsPageProps {
  params: Promise<{ id: string; attemptId: string }>
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const resolvedParams = use(params)
  const [result, setResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    async function loadResults() {
      try {
        const response = await fetch(`/api/tests/results/${resolvedParams.attemptId}`)
        if (!response.ok) throw new Error('Failed to load results')
        const data = await response.json()
        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results')
      } finally {
        setIsLoading(false)
      }
    }

    loadResults()
  }, [resolvedParams.attemptId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Učitavanje rezultata...</p>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error || 'Rezultati nisu pronađeni'}</span>
        </div>
      </div>
    )
  }

  const maxScore = 30 // Always 30 points: 6 medium (2 pts) + 6 hard (3 pts) = 30
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100)
  const passed = result.score >= 15 // 50% of 30 points
  const timeSpentFormatted = result.timeSpent 
    ? `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}`
    : 'N/A'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{result.test.title}</h1>
        {result.test.description && (
          <p className="text-sm opacity-70 mb-6">{result.test.description}</p>
        )}

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">
                <span className={result.score >= 0 ? 'text-success' : 'text-error'}>
                  {result.score}
                </span>
                <span className="text-2xl opacity-50"> / {maxScore}</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {passed ? '🎉 Čestitamo!' : '💪 Pokušaj ponovo!'}
              </h2>
              
              <p className="text-lg mb-2">
                Točno: <strong className="text-success">{result.correctAnswers}</strong> | 
                Netočno: <strong className="text-error">{result.incorrectAnswers}</strong> | 
                Preskočeno: <strong className="text-warning">{result.skippedCount}</strong>
              </p>
              
              <p className="text-sm opacity-70 mb-4">
                Bodovanje: Medium = +2 boda | Hard = +3 boda | Netočno = -1 bod | Preskočeno = 0 bodova
              </p>

              <div className="stats stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Ukupni bodovi</div>
                  <div className={`stat-value ${result.score >= 0 ? 'text-success' : 'text-error'}`}>
                    {result.score}
                  </div>
                  <div className="stat-desc">od {maxScore} mogućih</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Vrijeme</div>
                  <div className="stat-value text-2xl">{timeSpentFormatted}</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Postotak točnih</div>
                  <div className={`stat-value text-2xl ${passed ? 'text-success' : 'text-error'}`}>
                    {percentage}%
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex gap-2 justify-center">
              <Link href="/tests" className="btn btn-primary">
                Natrag na testove
              </Link>
              <button onClick={() => setShowDetails(!showDetails)} className="btn btn-outline">
                {showDetails ? 'Sakrij detalje' : 'Prikaži detalje'}
              </button>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Pregled odgovora</h2>
            
            {result.answers.map((answer, index) => {
              const pointValue = answer.question.difficulty === 'MEDIUM' ? 2 : 3
              const pointsEarned = answer.isSkipped ? 0 : answer.isCorrect ? pointValue : -1
              
              return (
              <div key={answer.id} className={`card shadow-xl border-2 ${
                answer.isSkipped ? 'border-warning bg-warning' : 
                answer.isCorrect ? 'border-success bg-success' : 
                'border-error bg-error'
              } bg-opacity-10`}>
                <div className="card-body">
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`badge badge-lg ${
                        answer.isSkipped ? 'badge-warning' : 
                        answer.isCorrect ? 'badge-success' : 
                        'badge-error'
                      }`}>
                        {answer.isSkipped ? '⊘' : answer.isCorrect ? '✓' : '✗'}
                      </span>
                      <span className={`text-xs font-bold ${
                        pointsEarned > 0 ? 'text-success' : 
                        pointsEarned < 0 ? 'text-error' : 
                        'text-warning'
                      }`}>
                        {pointsEarned > 0 ? '+' : ''}{pointsEarned}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">Pitanje {index + 1}</h3>
                          <span className={`badge badge-sm ${
                            answer.question.difficulty === 'MEDIUM' ? 'badge-warning' : 'badge-error'
                          }`}>
                            {answer.question.difficulty === 'MEDIUM' ? 'Medium (+2)' : 'Hard (+3)'}
                          </span>
                          {answer.isSkipped && <span className="badge badge-warning badge-sm">Preskočeno</span>}
                        </div>
                        <span className="badge badge-sm badge-outline">{answer.question.lecture.title}</span>
                      </div>
                      
                      <p className="mb-3 font-medium">{answer.question.prompt}</p>
                      
                      {answer.question.codeSnippet && (
                        <pre className="bg-base-200 p-4 rounded-lg mb-2 overflow-x-auto">
                          <code>{answer.question.codeSnippet}</code>
                        </pre>
                      )}

                      {!answer.isSkipped && (
                        <div className="space-y-2 mt-3">
                          {(answer.question.options || []).filter(opt => opt != null).map(option => {
                            const isSelected = answer.selectedOptionIds.includes(option.id)
                            const isCorrect = option.isCorrect

                            return (
                              <div
                                key={option.id}
                                className={`p-4 rounded-lg border-2 ${
                                  isCorrect && isSelected
                                    ? 'bg-success/20 border-success border-[3px]'
                                    : isCorrect
                                    ? 'bg-success/10 border-success'
                                    : isSelected
                                    ? 'bg-error/20 border-error border-[3px]'
                                    : 'bg-base-200 border-base-300'
                                }`}
                              >
                                <div className="flex flex-col gap-2">
                                  {/* Badges */}
                                  <div className="flex gap-2 flex-wrap">
                                    {isCorrect && (
                                      <span className="badge badge-success badge-sm gap-1 font-semibold">
                                        ✓ TOČAN ODGOVOR
                                      </span>
                                    )}
                                    {isSelected && (
                                      <span className={`badge badge-sm gap-1 font-semibold ${
                                        isCorrect ? 'badge-success' : 'badge-error'
                                      }`}>
                                        {isCorrect ? '✓ VAŠ ODABIR' : '✗ VAŠ ODABIR'}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Option text */}
                                  <span className={`text-base ${
                                    isCorrect || isSelected ? 'font-semibold' : ''
                                  }`}>
                                    {option.text}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                      
                      {answer.isSkipped && (
                        <div className="alert alert-warning mt-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>Ovo pitanje je preskočeno</span>
                        </div>
                      )}

                      {answer.question.explanation && (
                        <div className="alert mt-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span><strong>Objašnjenje:</strong> {answer.question.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            )}
          </div>
        )}
      </div>
    </div>
  )
}
