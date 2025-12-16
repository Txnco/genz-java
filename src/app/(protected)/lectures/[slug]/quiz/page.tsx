'use client'

import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import { QuestionCard } from '@/components/question-card'
import { BadgePopup, useBadgePopup } from '@/components/badge-popup'
import { QuestionType, BadgeType } from '@prisma/client'
import { getSelectedDifficulties } from '../difficulty-selector'

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
  earnedBadges?: BadgeType[]
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
  const { earnedBadge, showBadges, closeBadge } = useBadgePopup()

  const fetchQuestion = useCallback(async (repeatMode = false, restart = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const params = new URLSearchParams({ lecture: slug })
      if (repeatMode) params.append('repeatMode', 'true')
      if (restart) params.append('restart', 'true')

      // Add difficulty filter from localStorage
      const difficulties = getSelectedDifficulties()
      params.append('difficulties', difficulties.join(','))

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
      // Show badge popup if badges were earned
      if (data.earnedBadges && data.earnedBadges.length > 0) {
        showBadges(data.earnedBadges)
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
          <div className="h-7 w-28 bg-[var(--border-color)]/50 rounded-xl animate-pulse" />
          <div className="h-7 w-20 bg-[var(--border-color)]/50 rounded-xl animate-pulse" />
        </div>
        <div className="h-1 w-full bg-[var(--border-color)]/30 rounded-full mb-8 animate-pulse" />
        <div className="bg-[var(--bg-surface)] rounded-3xl p-7 shadow-[var(--shadow-md)] ring-1 ring-[var(--border-color)]/30">
          <div className="space-y-5">
            <div className="h-6 w-28 bg-[var(--border-color)]/40 rounded-full animate-pulse" />
            <div className="h-5 w-4/5 bg-[var(--border-color)]/40 rounded-xl animate-pulse" />
            <div className="h-28 w-full bg-[var(--border-color)]/30 rounded-2xl animate-pulse" />
            <div className="space-y-3 pt-3">
              <div className="h-16 w-full bg-[var(--border-color)]/25 rounded-2xl animate-pulse" />
              <div className="h-16 w-full bg-[var(--border-color)]/25 rounded-2xl animate-pulse" />
              <div className="h-16 w-full bg-[var(--border-color)]/25 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--bg-surface)] rounded-3xl p-12 text-center shadow-[var(--shadow-lg)] ring-1 ring-[var(--border-color)]/30">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Greška</h2>
          <p className="text-[var(--text-muted)] mb-7">{error}</p>
          <button
            onClick={() => fetchQuestion(isRepeatMode)}
            className="px-6 py-3 rounded-2xl font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all"
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
        <div className="bg-[var(--bg-surface)] rounded-3xl p-10 text-center shadow-[var(--shadow-lg)] ring-1 ring-[var(--border-color)]/30 animate-scale-in">
          {allCorrect ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                <span className="text-5xl">🏆</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">Izvrsno!</h2>
              <p className="text-[var(--text-muted)]">
                Odgovorio/la si točno na sva pitanja u ovoj lekciji!
              </p>
            </>
          ) : isRepeatMode ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-green-500/20 flex items-center justify-center">
                <span className="text-5xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">Ponavljanje završeno!</h2>
              <p className="text-[var(--text-muted)]">
                Prošao/la si kroz sva netočna pitanja.
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 flex items-center justify-center">
                <span className="text-5xl">📚</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">Lekcija završena!</h2>
              <p className="text-[var(--text-muted)] mb-5">
                Odgovorio/la si na sva pitanja u ovoj lekciji.
              </p>
              {hasIncorrect && (
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
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
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-[var(--text-primary)] bg-[var(--border-color)]/50 hover:bg-[var(--border-color)] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Natrag na lekciju
            </Link>

            {hasIncorrect && !isRepeatMode && (
              <button
                onClick={handleStartRepeat}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all shadow-lg shadow-[var(--text-primary)]/10"
              >
                Ponovi netočna (50% XP)
              </button>
            )}

            {isRepeatMode && hasIncorrect && (
              <button
                onClick={handleStartRepeat}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all shadow-lg shadow-[var(--text-primary)]/10"
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
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/lectures/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Izađi iz kviza
        </Link>
        <div className="flex items-center gap-3">
          {isRepeatMode && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
              Ponavljanje (50% XP)
            </span>
          )}
          <span className="text-sm text-[var(--text-muted)] font-medium tabular-nums">
            {isRepeatMode
              ? `${repeatAnswered}/${quizState.totalQuestions}`
              : `${quizState.answeredQuestions}/${quizState.totalQuestions}`
            }
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className={`h-1 rounded-full overflow-hidden ${isRepeatMode ? 'bg-amber-500/15' : 'bg-[var(--border-color)]/40'}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${isRepeatMode ? 'bg-amber-500' : 'bg-[var(--text-primary)]'}`}
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

      {/* Badge Popup */}
      <BadgePopup badgeType={earnedBadge} onClose={closeBadge} />
    </div>
  )
}
