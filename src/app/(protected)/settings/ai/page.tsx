'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const AVAILABLE_MODELS = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast & Affordable)' },
  { value: 'gpt-4o', label: 'GPT-4o (Balanced)' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo (High Quality)' },
]

export default function AISettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [preferredModel, setPreferredModel] = useState('gpt-4o-mini')
  const [hasExistingKey, setHasExistingKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/settings/ai')
      .then(res => res.json())
      .then(data => {
        if (data.hasKey) {
          setHasExistingKey(true)
        }
        if (data.preferredModel) {
          setPreferredModel(data.preferredModel)
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/settings/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey || undefined,
          preferredModel,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save settings')
      }

      setMessage('Settings saved successfully!')
      setApiKey('')
      setHasExistingKey(true)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove your API key?')) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/ai', {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      setHasExistingKey(false)
      setMessage('API key removed')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading settings...</div>
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/settings"
        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to Settings
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        AI Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Enter your OpenAI API key to enable AI-powered question generation. Your API key is stored securely and never logged.
        </p>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('success') || message.includes('removed')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={hasExistingKey ? '••••••••••••••••' : 'sk-...'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
            />
            {hasExistingKey && (
              <p className="text-xs text-gray-500 mt-1">
                You have an existing API key. Leave blank to keep it.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Model
            </label>
            <select
              value={preferredModel}
              onChange={(e) => setPreferredModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>

            {hasExistingKey && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Remove API Key
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          How to get an API key
        </h3>
        <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a></li>
          <li>Sign in or create an account</li>
          <li>Click &quot;Create new secret key&quot;</li>
          <li>Copy the key and paste it above</li>
        </ol>
      </div>
    </div>
  )
}
