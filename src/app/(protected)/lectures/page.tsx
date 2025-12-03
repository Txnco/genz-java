import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LecturesList } from './lectures-list'

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

  // Transform lectures with progress data
  const lecturesWithProgress = lectures.map(lecture => {
    const progress = progressMap.get(lecture.id)
    const totalQuestions = lecture.questions.length
    const answered = progress?.questionsAnswered || 0
    const correct = progress?.questionsCorrect || 0
    
    return {
      id: lecture.id,
      title: lecture.title,
      slug: lecture.slug,
      description: lecture.description,
      order: lecture.order,
      tags: (lecture.tags as string[]) || [],
      totalQuestions,
      answered,
      correct,
    }
  })

  // Get all unique tags
  const allTags = [...new Set(lecturesWithProgress.flatMap(l => l.tags))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lekcije</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Odaberi lekciju i započni vježbanje Java koncepata
        </p>
      </div>

      <LecturesList lectures={lecturesWithProgress} allTags={allTags} />
    </div>
  )
}
