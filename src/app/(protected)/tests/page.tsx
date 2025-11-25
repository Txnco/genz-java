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

  // Fetch tests directly from database
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

  // Calculate statistics for each test
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testovi</h1>
        <div className="flex gap-2">
          <Link href="/tests/create" className="btn btn-primary">
            ⚡ Generiraj test
          </Link>
          {session.user.role === 'ADMIN' && (
            <Link href="/admin/tests/new" className="btn btn-outline">
              Kreiraj detaljni test
            </Link>
          )}
        </div>
      </div>

      <div className="alert alert-info mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Testovi kombiniraju pitanja iz različitih lekcija. Testirajte svoje znanje!</span>
      </div>

      {testsWithStats.length === 0 ? (
        <div className="alert">
          <span>Nema dostupnih testova. Generirajte prvi test!</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testsWithStats.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  )
}

function TestCard({ test }: { test: any }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{test.title}</h2>
        {test.description && (
          <p className="text-sm opacity-70">{test.description}</p>
        )}
        
        {test.createdBy && (
          <div className="badge badge-outline badge-sm">
            Kreirao: {test.createdBy.name || test.createdBy.email}
          </div>
        )}
        
        <div className="divider my-2"></div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="opacity-70">Broj pitanja:</span>
            <span className="font-semibold">{test.questionCount}</span>
          </div>
          
          {test.timeLimit && (
            <div className="flex justify-between">
              <span className="opacity-70">Vremensko ograničenje:</span>
              <span className="font-semibold">{test.timeLimit} min</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="opacity-70">Pokušaja:</span>
            <span className="font-semibold">{test.statistics.attemptCount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="opacity-70">Prosječan uspjeh:</span>
            <span className="font-semibold">{test.statistics.successRate}%</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link href={`/tests/${test.id}`} className="btn btn-primary btn-sm">
            Započni test
          </Link>
        </div>
      </div>
    </div>
  )
}
