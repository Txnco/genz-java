import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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

  const answeredQuestionIds = new Set(userAnswers.map(a => a.questionId))
  const correctQuestionIds = new Set(
    userAnswers.filter(a => a.isCorrect).map(a => a.questionId)
  )

  const totalQuestions = lecture.questions.length
  const answeredCount = answeredQuestionIds.size
  const correctCount = correctQuestionIds.size

  const difficultyStats = {
    EASY: { total: 0, answered: 0, correct: 0 },
    MEDIUM: { total: 0, answered: 0, correct: 0 },
    HARD: { total: 0, answered: 0, correct: 0 },
  }

  const difficultyLabels = {
    EASY: 'Lagano',
    MEDIUM: 'Srednje',
    HARD: 'Teško',
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/lectures" className="btn btn-ghost btn-sm mb-4">
          ← Natrag na lekcije
        </Link>

        <h1 className="text-3xl font-bold">{lecture.title}</h1>
        {lecture.description && (
          <p className="mt-2 text-base-content/70">{lecture.description}</p>
        )}
      </div>

      {/* Progress Overview */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Tvoj napredak</h2>

          <div className="stats stats-vertical lg:stats-horizontal shadow mt-4">
            <div className="stat">
              <div className="stat-title">Pokušano pitanja</div>
              <div className="stat-value">{answeredCount}/{totalQuestions}</div>
              <div className="stat-desc">Ukupno pitanja u lekciji</div>
            </div>

            <div className="stat">
              <div className="stat-title">Točni odgovori</div>
              <div className="stat-value text-success">{correctCount}</div>
              <div className="stat-desc">Od {answeredCount} pokušanih</div>
            </div>

            <div className="stat">
              <div className="stat-title">Točnost</div>
              <div className="stat-value text-primary">
                {answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
              </div>
              <div className="stat-desc">Postotak točnih</div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Po težini</h3>
            <div className="space-y-3">
              {(['EASY', 'MEDIUM', 'HARD'] as const).map(difficulty => {
                const stats = difficultyStats[difficulty]
                const percentage = stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0
                const progressClass = {
                  EASY: 'progress-success',
                  MEDIUM: 'progress-warning',
                  HARD: 'progress-error',
                }
                return (
                  <div key={difficulty}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{difficultyLabels[difficulty]}</span>
                      <span>
                        {stats.answered}/{stats.total} ({stats.correct} točno)
                      </span>
                    </div>
                    <progress
                      className={`progress ${progressClass[difficulty]} w-full`}
                      value={percentage}
                      max={100}
                    ></progress>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Start Quiz Button */}
      <div className="flex justify-center">
        <Link
          href={`/lectures/${slug}/quiz`}
          className="btn btn-primary btn-lg"
        >
          {answeredCount > 0 ? 'Nastavi kviz' : 'Pokreni kviz'}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Lecture Content */}
      {lecture.content && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sadržaj lekcije</h2>
            <div className="prose max-w-none mt-4">
              <pre className="whitespace-pre-wrap text-sm">
                {lecture.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
