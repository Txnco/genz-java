'use client'

import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import { QuestionCard } from '@/components/question-card'
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
  correctAnswerIds: string[]
  userCorrect: string[]
  userIncorrect: string[]
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

  const fetchQuestion = useCallback(async (repeatMode = false, restart = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const params = new URLSearchParams({ lecture: slug })
      if (repeatMode) params.append('repeatMode', 'true')
      if (restart) params.append('restart', 'true')

      const url = `/api/quiz?${params.toString()}`
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

  const handleRestartQuiz = () => {
    setIsRepeatMode(false)
    setRepeatAnswered(0)
    fetchQuestion(false, true)
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-32 bg-base-300/50 rounded-lg animate-pulse" />
          <div className="h-8 w-24 bg-base-300/50 rounded-lg animate-pulse" />
        </div>
        <div className="h-2 w-full bg-base-300/50 rounded-full mb-6 animate-pulse" />
        <div className="card-float p-6">
          <div className="space-y-4">
            <div className="h-5 w-24 bg-base-300/50 rounded-lg animate-pulse" />
            <div className="h-6 w-3/4 bg-base-300/50 rounded-lg animate-pulse" />
            <div className="h-24 w-full bg-base-300/50 rounded-xl animate-pulse" />
            <div className="space-y-3 pt-4">
              <div className="h-14 w-full bg-base-300/50 rounded-xl animate-pulse" />
              <div className="h-14 w-full bg-base-300/50 rounded-xl animate-pulse" />
              <div className="h-14 w-full bg-base-300/50 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card-float p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Greška</h2>
          <p className="text-base-content/60 mb-6">{error}</p>
          <button
            onClick={() => fetchQuestion(isRepeatMode)}
            className="btn-modern btn-modern-primary"
          >
            Pokušaj ponovno
          </button>
        </div>
      </div>
    )
  }

  // Completion screen
  if (quizState?.completed || !quizState?.question) {
    const hasIncorrect = (quizState?.incorrectCount ?? 0) > 0
    const allCorrect = quizState?.allCorrect

    return (
      <div className="max-w-3xl mx-auto">
        <div className="card-float p-10 text-center animate-scale-in">
          {allCorrect ? (
            <>
              <div className="text-6xl mb-5">🏆</div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">Izvrsno!</h2>
              <p className="text-base-content/60">
                Odgovorio/la si točno na sva pitanja u ovoj lekciji!
              </p>
            </>
          ) : isRepeatMode ? (
            <>
              <div className="text-6xl mb-5">✅</div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">Ponavljanje završeno!</h2>
              <p className="text-base-content/60">
                Prošao/la si kroz sva netočna pitanja.
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-5">📚</div>
              <h2 className="text-2xl font-bold tracking-tight mb-3">Lekcija završena!</h2>
              <p className="text-base-content/60 mb-4">
                Odgovorio/la si na sva pitanja u ovoj lekciji.
              </p>
              {hasIncorrect && (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-warning/10 border border-warning/30 text-warning text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span>Imaš {quizState?.incorrectCount} netočnih pitanja</span>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href={`/lectures/${slug}`}
              className="btn-modern btn-modern-secondary"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Natrag na lekciju
            </Link>

            {hasIncorrect && !isRepeatMode && (
              <button
                onClick={handleStartRepeat}
                className="btn-modern btn-modern-primary"
              >
                Ponovi netočna (50% XP)
              </button>
            )}

            {isRepeatMode && hasIncorrect && (
              <button
                onClick={handleStartRepeat}
                className="btn-modern btn-modern-primary"
              >
                Ponovi ponovno
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const progressPercent = isRepeatMode
    ? (repeatAnswered / quizState.totalQuestions) * 100
    : (quizState.answeredQuestions / quizState.totalQuestions) * 100

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <Link
          href={`/lectures/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Izađi iz kviza
        </Link>
        <div className="flex items-center gap-3">
          {isRepeatMode && (
            <span className="badge-warning-modern text-xs">
              Ponavljanje (50% XP)
            </span>
          )}
          <span className="text-sm text-base-content/60 font-medium">
            {isRepeatMode
              ? `${repeatAnswered}/${quizState.totalQuestions}`
              : `${quizState.answeredQuestions}/${quizState.totalQuestions}`
            }
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`h-1.5 rounded-full ${isRepeatMode ? 'bg-warning/20' : 'bg-base-300/50'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${isRepeatMode ? 'bg-warning' : 'bg-linear-to-r from-primary to-secondary'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={quizState.question}
        onSubmit={handleSubmitAnswer}
        isSubmitting={isSubmitting}
        evaluation={answerResult ? {
          correctAnswerIds: answerResult.correctAnswerIds,
          userCorrect: answerResult.userCorrect,
          userIncorrect: answerResult.userIncorrect,
          explanation: answerResult.explanation,
          xpAwarded: answerResult.xpAwarded,
        } : null}
        onNext={handleNextQuestion}
      />
    </div>
  )
}
