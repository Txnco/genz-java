import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { getLevelProgress } from '@/lib/gamification'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: {
        include: { lecture: true },
      },
      answers: true,
    },
  })

  if (!user) return null

  const lectures = await prisma.lecture.findMany({
    orderBy: { order: 'asc' },
    include: {
      questions: { select: { id: true } },
    },
  })

  const totalAnswers = user.answers.length
  const correctAnswers = user.answers.filter(a => a.isCorrect).length
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0
  const levelProgress = getLevelProgress(user.xp)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="hero bg-base-200 rounded-box p-6">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold">
              Dobrodošao natrag, {user.name || 'Student'}!
            </h1>
            <p className="py-4 text-base-content/70">
              Prati svoj napredak i nastavi učiti Javu.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level & XP Card */}
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title text-4xl">{user.level}</h2>
                <p className="text-primary-content/80">Razina</p>
              </div>
              <div className="radial-progress text-primary-content" style={{ "--value": levelProgress.percentage, "--size": "4rem" } as React.CSSProperties}>
                {levelProgress.percentage}%
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{user.xp} XP</span>
                <span>{levelProgress.xpForNext} XP</span>
              </div>
              <progress className="progress progress-accent w-full" value={levelProgress.currentLevelXp} max={levelProgress.xpNeeded}></progress>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🔥</div>
              <div>
                <h2 className="card-title text-3xl">{user.currentStreak}</h2>
                <p className="text-base-content/70">Dana u nizu</p>
              </div>
            </div>
            <div className="stat-desc mt-2">
              Najbolji rezultat: {user.longestStreak} dana
            </div>
          </div>
        </div>

        {/* Questions Answered */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="text-4xl">📝</div>
              <div>
                <h2 className="card-title text-3xl">{totalAnswers}</h2>
                <p className="text-base-content/70">Odgovorenih pitanja</p>
              </div>
            </div>
            <div className="stat-desc mt-2">
              Ukupno pokušaja
            </div>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎯</div>
              <div>
                <h2 className="card-title text-3xl">{accuracy}%</h2>
                <p className="text-base-content/70">Točnost</p>
              </div>
            </div>
            <div className="stat-desc mt-2">
              {correctAnswers} točnih od {totalAnswers}
            </div>
          </div>
        </div>
      </div>

      {/* Lectures Progress */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Napredak po lekcijama</h2>
        <div className="grid gap-4">
          {lectures.map(lecture => {
            const progress = user.progress.find(p => p.lectureId === lecture.id)
            const totalQuestions = lecture.questions.length
            const answered = progress?.questionsAnswered || 0
            const correct = progress?.questionsCorrect || 0
            const percentage = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0
            const correctPercentage = answered > 0 ? Math.round((correct / answered) * 100) : 0

            return (
              <Link
                key={lecture.id}
                href={`/lectures/${lecture.slug}`}
                className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title text-lg">{lecture.title}</h3>
                      {lecture.description && (
                        <p className="text-sm text-base-content/70 mt-1">
                          {lecture.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="badge badge-primary badge-lg">
                        {answered}/{totalQuestions}
                      </div>
                      {answered > 0 && (
                        <div className={`badge badge-sm mt-1 ${correctPercentage >= 70 ? 'badge-success' : correctPercentage >= 40 ? 'badge-warning' : 'badge-error'}`}>
                          {correctPercentage}% točno
                        </div>
                      )}
                    </div>
                  </div>
                  <progress
                    className="progress progress-primary w-full mt-2"
                    value={percentage}
                    max={100}
                  ></progress>
                </div>
              </Link>
            )
          })}

          {lectures.length === 0 && (
            <div className="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Još nema dostupnih lekcija. Provjeri kasnije!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
