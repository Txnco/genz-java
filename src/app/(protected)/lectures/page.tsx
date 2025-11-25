import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function LecturesPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const lectures = await prisma.lecture.findMany({
    orderBy: { order: 'asc' },
    include: {
      questions: { select: { id: true } },
    },
  })

  const userProgress = await prisma.userProgress.findMany({
    where: { userId: session.user.id },
  })

  const progressMap = new Map(userProgress.map(p => [p.lectureId, p]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lekcije</h1>
        <p className="mt-2 text-base-content/70">
          Odaberi lekciju za vježbanje Java koncepata.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map(lecture => {
          const progress = progressMap.get(lecture.id)
          const totalQuestions = lecture.questions.length
          const answered = progress?.questionsAnswered || 0
          const correct = progress?.questionsCorrect || 0
          const percentage = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0
          const correctPercentage = answered > 0 ? Math.round((correct / answered) * 100) : 0

          return (
            <Link
              key={lecture.id}
              href={`/lectures/${lecture.slug}`}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-start justify-between mb-2">
                  <div className="badge badge-primary badge-lg font-bold">
                    {lecture.order}
                  </div>
                  {answered > 0 && (
                    <div className={`badge ${
                      correctPercentage >= 80 ? 'badge-success' :
                      correctPercentage >= 50 ? 'badge-warning' : 'badge-error'
                    }`}>
                      {correctPercentage}% točno
                    </div>
                  )}
                </div>

                <h3 className="card-title">{lecture.title}</h3>

                {lecture.description && (
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {lecture.description}
                  </p>
                )}

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-base-content/70">Napredak</span>
                    <span className="font-medium">
                      {answered}/{totalQuestions} pitanja
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={percentage}
                    max={100}
                  ></progress>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {lectures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium">Još nema lekcija</h3>
          <p className="text-base-content/70 mt-2">
            Lekcije će se pojaviti ovdje kada budu dodane.
          </p>
        </div>
      )}
    </div>
  )
}
