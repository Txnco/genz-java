'use client'

import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import { QuestionCard } from '@/components/question-card'
import { AnswerResult } from '@/components/answer-result'
import { QuestionType } from '@prisma/client'

interface QuestionOption {
  id: string
  text: string
  order: number
}

interface Question {
  id: string
  type: QuestionType
  prompt: string
  codeSnippet: string | null
  difficulty: string
  options: QuestionOption[]
}

interface QuizState {
  question: Question | null
  totalQuestions: number
  answeredQuestions: number
  completed: boolean
  incorrectCount?: number
  allCorrect?: boolean
  repeatMode?: boolean
  isHalfPoints?: boolean
}

interface AnswerResultData {
  isCorrect: boolean
  correctAnswers?: string[]
  explanation: string | null
  xpAwarded: number
  newXp: number
  newLevel: number
  streak: number
  wasHalfPoints?: boolean
}

interface QuizPageProps {
  params: Promise<{ slug: string }>
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = use(params)
  const [quizState, setQuizState] = useState<QuizState | null>(null)
  const [answerResult, setAnswerResult] = useState<AnswerResultData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRepeatMode, setIsRepeatMode] = useState(false)
  const [repeatAnswered, setRepeatAnswered] = useState(0)

  const fetchQuestion = useCallback(async (repeatMode = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const url = repeatMode
        ? `/api/quiz?lecture=${slug}&repeatMode=true`
        : `/api/quiz?lecture=${slug}`
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Greška pri dohvaćanju pitanja')
      }

      setQuizState(data)
      setAnswerResult(null)
      if (repeatMode) {
        setIsRepeatMode(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nešto je pošlo po zlu')
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchQuestion(false)
  }, [fetchQuestion])

  const handleSubmitAnswer = async (answer: {
    selectedOptionIds: string[]
    textAnswer?: string
  }) => {
    if (!quizState?.question) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: quizState.question.id,
          halfPoints: isRepeatMode,
          ...answer,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Greška pri slanju odgovora')
      }

      setAnswerResult(data)
      if (isRepeatMode) {
        setRepeatAnswered(prev => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri slanju odgovora')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextQuestion = () => {
    fetchQuestion(isRepeatMode)
  }

  const handleStartRepeat = () => {
    setRepeatAnswered(0)
    fetchQuestion(true)
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-8 w-1/4"></div>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-32 w-full"></div>
              <div className="flex flex-col gap-3">
                <div className="skeleton h-12 w-full"></div>
                <div className="skeleton h-12 w-full"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="text-error text-6xl mb-4">!</div>
        <h2 className="text-xl font-semibold mb-2">Greška</h2>
        <p className="text-base-content/70 mb-6">{error}</p>
        <button
          onClick={() => fetchQuestion(isRepeatMode)}
          className="btn btn-primary"
        >
          Pokušaj ponovno
        </button>
      </div>
    )
  }

  // Completion screen
  if (quizState?.completed || !quizState?.question) {
    const hasIncorrect = (quizState?.incorrectCount ?? 0) > 0
    const allCorrect = quizState?.allCorrect

    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center">
            {allCorrect ? (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="card-title text-2xl">Izvrsno!</h2>
                <p className="text-base-content/70">
                  Odgovorio/la si točno na sva pitanja u ovoj lekciji!
                </p>
              </>
            ) : isRepeatMode ? (
              <>
                <div className="text-6xl mb-4">✅</div>
                <h2 className="card-title text-2xl">Ponavljanje završeno!</h2>
                <p className="text-base-content/70">
                  Prošao/la si kroz sva netočna pitanja.
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📚</div>
                <h2 className="card-title text-2xl">Lekcija završena!</h2>
                <p className="text-base-content/70 mb-2">
                  Odgovorio/la si na sva pitanja u ovoj lekciji.
                </p>
                {hasIncorrect && (
                  <div className="alert alert-warning mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Imate {quizState?.incorrectCount} netočnih pitanja</span>
                  </div>
                )}
              </>
            )}

            <div className="card-actions mt-6 flex-col sm:flex-row gap-3">
              <Link
                href={`/lectures/${slug}`}
                className="btn btn-outline"
              >
                Natrag na lekciju
              </Link>

              {hasIncorrect && !isRepeatMode && (
                <button
                  onClick={handleStartRepeat}
                  className="btn btn-primary"
                >
                  Ponovi netočna pitanja (50% bodova)
                </button>
              )}

              {isRepeatMode && hasIncorrect && (
                <button
                  onClick={handleStartRepeat}
                  className="btn btn-primary"
                >
                  Ponovi ponovno
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/lectures/${slug}`}
          className="btn btn-ghost btn-sm"
        >
          ← Izađi iz kviza
        </Link>
        <div className="flex items-center gap-3">
          {isRepeatMode && (
            <div className="badge badge-warning">Ponavljanje (50% bodova)</div>
          )}
          <span className="text-sm text-base-content/70">
            {isRepeatMode
              ? `${repeatAnswered} / ${quizState.totalQuestions} ponovljeno`
              : `${quizState.answeredQuestions} / ${quizState.totalQuestions} odgovoreno`
            }
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <progress
          className={`progress w-full ${isRepeatMode ? 'progress-warning' : 'progress-primary'}`}
          value={isRepeatMode
            ? repeatAnswered
            : quizState.answeredQuestions
          }
          max={quizState.totalQuestions}
        ></progress>
      </div>

      {/* Question or Result */}
      {answerResult ? (
        <AnswerResult
          isCorrect={answerResult.isCorrect}
          explanation={answerResult.explanation}
          correctAnswers={answerResult.correctAnswers}
          xpAwarded={answerResult.xpAwarded}
          onNext={handleNextQuestion}
          isHalfPoints={answerResult.wasHalfPoints}
        />
      ) : (
        <QuestionCard
          question={quizState.question}
          onSubmit={handleSubmitAnswer}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
