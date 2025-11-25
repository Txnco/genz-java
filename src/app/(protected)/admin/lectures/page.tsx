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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Manage Lectures
        </h2>
        <Link
          href="/admin/lectures/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Lecture
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Order
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Slug
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Questions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {lectures.map(lecture => (
              <tr key={lecture.id}>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {lecture.order}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                  {lecture.title}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  {lecture.slug}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {lecture._count.questions}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/lectures/${lecture.id}`}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/questions?lecture=${lecture.id}`}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-sm"
                    >
                      Questions
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {lectures.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No lectures yet. Create your first lecture!
          </div>
        )}
      </div>
    </div>
  )
}
