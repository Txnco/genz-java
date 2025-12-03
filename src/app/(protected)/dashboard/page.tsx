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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Pozdrav, <span className="text-gradient">{user.name || 'Student'}</span> 👋
          </h1>
          <p className="mt-1 text-base-content/60">
            Nastavi pratiti svoj napredak u učenju Jave
          </p>
        </div>
        <Link href="/lectures" className="btn-modern btn-modern-primary">
          Nastavi učiti
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level Card */}
        <div className="card-float p-5 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-base-content/60 font-medium">Razina</p>
              <p className="text-3xl font-bold text-gradient">{user.level}</p>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18" cy="18" r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-base-300"
                />
                <circle
                  cx="18" cy="18" r="15.5"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${levelProgress.percentage} 100`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {levelProgress.percentage}%
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-base-content/60">
              <span>{user.xp} XP</span>
              <span>{levelProgress.xpForNext} XP</span>
            </div>
            <div className="progress-modern">
              <div 
                className="progress-modern-fill" 
                style={{ width: `${levelProgress.percentage}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="card-float p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm text-base-content/60 font-medium">Niz dana</p>
              <p className="text-2xl font-bold">{user.currentStreak}</p>
            </div>
          </div>
          <p className="text-xs text-base-content/50">
            Rekord: {user.longestStreak} dana
          </p>
        </div>

        {/* Questions Card */}
        <div className="card-float p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📝</span>
            <div>
              <p className="text-sm text-base-content/60 font-medium">Pitanja</p>
              <p className="text-2xl font-bold">{totalAnswers}</p>
            </div>
          </div>
          <p className="text-xs text-base-content/50">
            Ukupno riješenih
          </p>
        </div>

        {/* Accuracy Card */}
        <div className="card-float p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-sm text-base-content/60 font-medium">Točnost</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>
          <p className="text-xs text-base-content/50">
            {correctAnswers}/{totalAnswers} točno
          </p>
        </div>
      </div>

      {/* Lectures Progress */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold tracking-tight">Napredak po lekcijama</h2>
          <Link href="/lectures" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            Prikaži sve →
          </Link>
        </div>
        
        <div className="grid gap-3">
          {lectures.map((lecture, index) => {
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
                className="card-modern p-5 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {lecture.order}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {lecture.title}
                      </h3>
                      {lecture.description && (
                        <p className="text-sm text-base-content/50 truncate mt-0.5">
                          {lecture.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="badge-modern text-xs">
                        {answered}/{totalQuestions}
                      </span>
                      {answered > 0 && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          correctPercentage >= 70 
                            ? 'bg-green-500/10 text-green-600' 
                            : correctPercentage >= 40 
                              ? 'bg-yellow-500/10 text-yellow-600' 
                              : 'bg-red-500/10 text-red-600'
                        }`}>
                          {correctPercentage}%
                        </span>
                      )}
                    </div>
                    <div className="w-24 hidden sm:block">
                      <div className="progress-modern h-1.5">
                        <div 
                          className="progress-modern-fill" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-base-content/30 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}

          {lectures.length === 0 && (
            <div className="card-float p-8 text-center">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-base-content/60">Još nema dostupnih lekcija</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
