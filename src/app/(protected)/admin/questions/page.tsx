'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { QuestionType, Difficulty } from '@prisma/client'

interface Question {
  id: string
  type: QuestionType
  prompt: string
  difficulty: Difficulty
  lecture: { title: string }
  createdAt: string
}

export default function AdminQuestionsPage() {
  const searchParams = useSearchParams()
  const lectureFilter = searchParams.get('lecture')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = lectureFilter
      ? `/api/admin/questions?lecture=${lectureFilter}`
      : '/api/admin/questions'

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [lectureFilter])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return

    try {
      await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' })
      setQuestions(questions.filter(q => q.id !== id))
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading questions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Manage Questions
          {lectureFilter && <span className="text-sm text-gray-500 ml-2">(filtered)</span>}
        </h2>
        <Link
          href="/admin/questions/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Question
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Prompt
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Lecture
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {questions.map(question => (
              <tr key={question.id}>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    {formatType(question.type)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white max-w-md truncate">
                  {question.prompt}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  {question.lecture.title}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/questions/${question.id}`}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No questions yet. Create your first question!
          </div>
        )}
      </div>
    </div>
  )
}

function formatType(type: QuestionType): string {
  return type.replace(/_/g, ' ')
}

function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'EASY':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    case 'HARD':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
