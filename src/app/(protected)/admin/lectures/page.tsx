import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminLecturesPage() {
  const lectures = await prisma.lecture.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { questions: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Lectures</h2>
          <p className="text-base-content/60 text-sm mt-1">
            {lectures.length} lectures total
          </p>
        </div>
        <Link
          href="/admin/lectures/new"
          className="btn-modern btn-modern-primary text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Lecture
        </Link>
      </div>

      <div className="card-float overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-base-content/60">
                Order
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-base-content/60">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-base-content/60">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-base-content/60">
                Questions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-base-content/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {lectures.map(lecture => {
              const tags = (lecture.tags as string[]) || []
              return (
                <tr key={lecture.id} className="hover:bg-base-200/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-sm font-medium">
                      {lecture.order}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{lecture.title}</p>
                      <p className="text-xs text-base-content/50">{lecture.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag text-xs py-0.5 px-2">
                            {tag}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="text-xs text-base-content/40">
                            +{tags.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-base-content/40">No tags</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge-modern text-xs">
                      {lecture._count.questions} questions
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/lectures/${lecture.id}`}
                        className="text-sm text-violet-500 hover:text-violet-600 font-medium transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/questions?lecture=${lecture.id}`}
                        className="text-sm text-base-content/60 hover:text-base-content font-medium transition-colors"
                      >
                        Questions
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {lectures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-base-content/60">No lectures yet. Create your first lecture!</p>
          </div>
        )}
      </div>
    </div>
  )
}
