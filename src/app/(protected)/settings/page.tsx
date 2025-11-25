'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400">
                Name
              </label>
              <p className="text-gray-900 dark:text-white">
                {session?.user?.name || 'Not set'}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400">
                Email
              </label>
              <p className="text-gray-900 dark:text-white">
                {session?.user?.email}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400">
                Role
              </label>
              <p className="text-gray-900 dark:text-white capitalize">
                {session?.user?.role?.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            AI Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Configure your OpenAI API key for AI-powered question generation.
          </p>
          <Link
            href="/settings/ai"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Configure AI
          </Link>
        </div>
      </div>
    </div>
  )
}
