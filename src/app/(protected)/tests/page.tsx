import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function TestsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login')
  }

  const tests = await prisma.test.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
      attempts: {
        where: { completed: true },
        select: {
          correctAnswers: true,
          totalQuestions: true,
        },
      },
      createdBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const testsWithStats = tests.map(test => {
    const completedAttempts = test.attempts.length
    const totalAnswers = test.attempts.reduce((sum, a) => sum + a.totalQuestions, 0)
    const correctAnswers = test.attempts.reduce((sum, a) => sum + a.correctAnswers, 0)
    const successRate = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

    return {
      id: test.id,
      title: test.title,
      description: test.description,
      questionCount: test._count.questions,
      timeLimit: test.timeLimit,
      createdAt: test.createdAt,
      createdBy: test.createdBy,
      statistics: {
        attemptCount: completedAttempts,
        successRate,
      },
    }
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testovi</h1>
          <p className="mt-2 text-base-content/60">
            Testiraj svoje znanje kombiniranim pitanjima iz više lekcija
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/tests/create" className="btn-modern btn-modern-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generiraj test
          </Link>
          {session.user.role === 'ADMIN' && (
            <Link href="/admin/tests/new" className="btn-modern btn-modern-secondary">
              Detaljni test
            </Link>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="card-modern p-4 flex items-center gap-4 bg-primary/5 border-primary/20">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
        <p className="text-sm text-base-content/70">
          Testovi kombiniraju pitanja iz različitih lekcija. Generiraj vlastiti test ili odaberi postojeći.
        </p>
      </div>

      {/* Tests Grid */}
      {testsWithStats.length === 0 ? (
        <div className="card-float p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-medium mb-2">Nema dostupnih testova</h3>
          <p className="text-base-content/60 mb-6">
            Generiraj prvi test i testiraj svoje znanje!
          </p>
          <Link href="/tests/create" className="btn-modern btn-modern-primary">
            Generiraj test
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testsWithStats.map((test, index) => (
            <TestCard key={test.id} test={test} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function TestCard({ test, index }: { test: any; index: number }) {
  return (
    <div 
      className="card-float p-6 flex flex-col animate-fade-up group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
          {test.title}
        </h2>
        {test.timeLimit && (
          <span className="shrink-0 ml-3 text-xs font-medium px-2.5 py-1 rounded-full bg-base-200">
            {test.timeLimit} min
          </span>
        )}
      </div>

      {test.description && (
        <p className="text-sm text-base-content/50 line-clamp-2 mb-4">
          {test.description}
        </p>
      )}

      {test.createdBy && (
        <p className="text-xs text-base-content/40 mb-4">
          Kreirao: {test.createdBy.name || test.createdBy.email}
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 py-4 border-t border-base-200/80 mt-auto">
        <div className="text-center">
          <p className="text-lg font-semibold">{test.questionCount}</p>
          <p className="text-xs text-base-content/50">Pitanja</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{test.statistics.attemptCount}</p>
          <p className="text-xs text-base-content/50">Pokušaja</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{test.statistics.successRate}%</p>
          <p className="text-xs text-base-content/50">Uspjeh</p>
        </div>
      </div>

      {/* Action */}
      <Link 
        href={`/tests/${test.id}`} 
        className="btn-modern btn-modern-primary w-full mt-4 justify-center"
      >
        Započni test
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  )
}
