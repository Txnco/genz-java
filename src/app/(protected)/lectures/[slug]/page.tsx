import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RestartButton } from './restart-button'
import { RestartHistory } from './restart-history'
import { LectureQuizSection } from './lecture-client'

interface LectureDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function LectureDetailPage({ params }: LectureDetailPageProps) {
  const { slug } = await params
  const session = await getServerSession(authOptions)
  if (!session) return null

  const lecture = await prisma.lecture.findUnique({
    where: { slug },
    include: {
      questions: {
        select: { id: true, difficulty: true },
      },
    },
  })

  if (!lecture) {
    notFound()
  }

  const userAnswers = await prisma.userQuestionAnswer.findMany({
    where: {
      userId: session.user.id,
      question: { lectureId: lecture.id },
    },
    select: {
      questionId: true,
      isCorrect: true,
    },
  })

  // Get restart history
  const restartHistory = await prisma.lectureProgressRestart.findMany({
    where: {
      userId: session.user.id,
      lectureId: lecture.id,
    },
    orderBy: {
      restartedAt: 'desc',
    },
    take: 5, // Show last 5 attempts
  })

  const answeredQuestionIds = new Set(userAnswers.map(a => a.questionId))
  const correctQuestionIds = new Set(
    userAnswers.filter(a => a.isCorrect).map(a => a.questionId)
  )

  const totalQuestions = lecture.questions.length
  const answeredCount = answeredQuestionIds.size
  const correctCount = correctQuestionIds.size
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0

  const difficultyStats = {
    EASY: { total: 0, answered: 0, correct: 0, label: 'Lagano', color: 'green' },
    MEDIUM: { total: 0, answered: 0, correct: 0, label: 'Srednje', color: 'yellow' },
    HARD: { total: 0, answered: 0, correct: 0, label: 'Teško', color: 'red' },
  }

  lecture.questions.forEach(q => {
    difficultyStats[q.difficulty].total++
    if (answeredQuestionIds.has(q.id)) {
      difficultyStats[q.difficulty].answered++
      if (correctQuestionIds.has(q.id)) {
        difficultyStats[q.difficulty].correct++
      }
    }
  })

  const tags = (lecture.tags as string[]) || []

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/lectures"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Natrag na lekcije
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{lecture.title}</h1>
            {lecture.description && (
              <p className="mt-2 text-lg text-base-content/60">{lecture.description}</p>
            )}
          </div>
          {answeredCount > 0 && (
            <RestartButton lectureId={lecture.id} lectureTitle={lecture.title} />
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-float p-5 text-center">
          <p className="text-3xl font-bold text-gradient">{answeredCount}/{totalQuestions}</p>
          <p className="text-sm text-base-content/60 mt-1">Riješeno</p>
        </div>
        <div className="card-float p-5 text-center">
          <p className="text-3xl font-bold text-green-500">{correctCount}</p>
          <p className="text-sm text-base-content/60 mt-1">Točno</p>
        </div>
        <div className="card-float p-5 text-center">
          <p className={`text-3xl font-bold ${accuracy >= 70 ? 'text-green-500' : accuracy >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
            {accuracy}%
          </p>
          <p className="text-sm text-base-content/60 mt-1">Točnost</p>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="card-float p-6">
        <h2 className="font-semibold text-lg mb-5">Napredak po težini</h2>
        <div className="space-y-5">
          {(['EASY', 'MEDIUM', 'HARD'] as const).map(difficulty => {
            const stats = difficultyStats[difficulty]
            const percentage = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0
            const colors = {
              green: { bg: 'bg-green-500', light: 'bg-green-500/10', text: 'text-green-600' },
              yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-500/10', text: 'text-yellow-600' },
              red: { bg: 'bg-red-500', light: 'bg-red-500/10', text: 'text-red-600' },
            }
            const color = colors[stats.color as keyof typeof colors]

            return (
              <div key={difficulty}>
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color.bg}`} />
                    <span className="font-medium">{stats.label}</span>
                  </div>
                  <span className="text-base-content/60">
                    {stats.answered}/{stats.total}
                    {stats.answered > 0 && (
                      <span className={`ml-2 ${color.text}`}>
                        ({stats.correct} točno)
                      </span>
                    )}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${color.light}`}>
                  <div
                    className={`h-full rounded-full ${color.bg} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Difficulty Selector and Start Quiz Button */}
      <LectureQuizSection
        slug={slug}
        answeredCount={answeredCount}
        difficultyStats={difficultyStats}
      />

      {/* Restart History */}
      {restartHistory.length > 0 && (
        <RestartHistory history={restartHistory} />
      )}
    </div>
  )
}
