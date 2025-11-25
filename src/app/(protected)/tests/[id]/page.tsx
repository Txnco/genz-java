'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

interface TestQuestion {
  id: string
  order: number
  question: Question & {
    lecture: {
      title: string
    }
  }
}

interface Test {
  id: string
  title: string
  description: string | null
  questionCount: number
  timeLimit: number | null
  questions: TestQuestion[]
}

interface TestPageProps {
  params: Promise<{ id: string }>
}

export default function TestPage({ params }: TestPageProps) {
  const router = useRouter()
  const [testId, setTestId] = useState<string | null>(null)
  const [test, setTest] = useState<Test | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, any>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

  // Unwrap params
  useEffect(() => {
    params.then(p => setTestId(p.id))
  }, [params])

  // Load test and create attempt
  useEffect(() => {
    if (!testId) return

    async function loadTest() {
      try {
        setIsLoading(true)
        
        // Check if attemptId is in URL (from quick generation)
        const urlParams = new URLSearchParams(window.location.search)
        const urlAttemptId = urlParams.get('attemptId')

        // Fetch test details
        const testResponse = await fetch(`/api/tests/${testId}`)
        if (!testResponse.ok) throw new Error('Failed to load test')
        const testData = await testResponse.json()
        setTest(testData)

        // Use existing attempt or create new one
        if (urlAttemptId) {
          setAttemptId(urlAttemptId)
        } else {
          const attemptResponse = await fetch('/api/tests/attempt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ testId }),
          })
          if (!attemptResponse.ok) throw new Error('Failed to start test')
          const attemptData = await attemptResponse.json()
          setAttemptId(attemptData.id)
        }

        // Set timer if test has time limit
        if (testData.timeLimit) {
          setTimeRemaining(testData.timeLimit * 60) // Convert to seconds
        }

        setStartTime(Date.now())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test')
      } finally {
        setIsLoading(false)
      }
    }

    loadTest()
  }, [testId])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          handleCompleteTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const handleAnswerSubmit = async (answer: {
    selectedOptionIds: string[]
    textAnswer?: string
  }, isSkipped = false) => {
    if (!test || !attemptId) return

    const currentQuestion = test.questions[currentQuestionIndex]
    
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/tests/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          questionId: currentQuestion.question.id,
          selectedOptionIds: isSkipped ? [] : answer.selectedOptionIds,
          textAnswer: isSkipped ? undefined : answer.textAnswer,
          isSkipped,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit answer')
      const data = await response.json()

      // Save answer locally
      const newAnswers = new Map(answers)
      newAnswers.set(currentQuestion.question.id, {
        ...answer,
        isCorrect: data.isCorrect,
        isSkipped,
        evaluation: data.evaluation,
      })
      setAnswers(newAnswers)

      // Move to next question or complete
      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        await handleCompleteTest()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    handleAnswerSubmit({ selectedOptionIds: [] }, true)
  }

  const handleCompleteTest = async () => {
    if (!attemptId) return

    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const response = await fetch('/api/tests/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, timeSpent }),
      })

      if (!response.ok) throw new Error('Failed to complete test')
      const result = await response.json()

      router.push(`/tests/${testId}/results/${attemptId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete test')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Učitavanje testa...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Test nije pronađen</span>
        </div>
      </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{test.title}</h1>
          {timeRemaining !== null && (
            <div className={`badge ${timeRemaining < 60 ? 'badge-error' : 'badge-info'} badge-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm opacity-70">
            Pitanje {currentQuestionIndex + 1} od {test.questions.length}
          </span>
          <span className="badge badge-sm">{currentQuestion.question.lecture.title}</span>
        </div>

        <progress className="progress progress-primary w-full" value={progress} max="100"></progress>
      </div>

      <div className="space-y-4">
        <QuestionCard
          question={currentQuestion.question}
          onSubmit={handleAnswerSubmit}
          isSubmitting={isSubmitting}
        />
        
        <div className="flex justify-center">
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="btn btn-outline btn-warning"
          >
            Preskoči pitanje
          </button>
        </div>
      </div>
    </div>
  )
}
