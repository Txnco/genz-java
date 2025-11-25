import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  const [userCount, lectureCount, questionCount, answerCount] = await Promise.all([
    prisma.user.count(),
    prisma.lecture.count(),
    prisma.question.count(),
    prisma.userQuestionAnswer.count(),
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Dashboard Overview
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={userCount} />
        <StatCard label="Lectures" value={lectureCount} />
        <StatCard label="Questions" value={questionCount} />
        <StatCard label="Answers Submitted" value={answerCount} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </div>
    </div>
  )
}
