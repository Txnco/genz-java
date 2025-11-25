'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QuestionType, Difficulty } from '@prisma/client'

interface Lecture {
  id: string
  title: string
}

interface Option {
  text: string
  isCorrect: boolean
  order: number
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'SINGLE_CHOICE', label: 'Single Choice' },
  { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { value: 'TRUE_FALSE', label: 'True/False' },
  { value: 'FILL_IN_BLANK', label: 'Fill in the Blank' },
  { value: 'CODE_WILL_COMPILE', label: 'Code Will Compile?' },
  { value: 'CODE_WILL_CRASH', label: 'Code Will Crash?' },
  { value: 'SHORT_TEXT', label: 'Short Text Answer' },
]

const DIFFICULTIES: Difficulty[] = ['EASY', 'MEDIUM', 'HARD']

export default function NewQuestionPage() {
  const router = useRouter()
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [lectureId, setLectureId] = useState('')
  const [type, setType] = useState<QuestionType>('SINGLE_CHOICE')
  const [prompt, setPrompt] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [explanation, setExplanation] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM')
  const [tags, setTags] = useState('')
  const [options, setOptions] = useState<Option[]>([
    { text: '', isCorrect: false, order: 0 },
    { text: '', isCorrect: false, order: 1 },
  ])

  useEffect(() => {
    fetch('/api/admin/lectures')
      .then(res => res.json())
      .then(setLectures)
  }, [])

  useEffect(() => {
    if (type === 'TRUE_FALSE') {
      setOptions([
        { text: 'True', isCorrect: false, order: 0 },
        { text: 'False', isCorrect: false, order: 1 },
      ])
    } else if (type === 'CODE_WILL_COMPILE' || type === 'CODE_WILL_CRASH') {
      setOptions([
        { text: 'Will compile and run successfully', isCorrect: false, order: 0 },
        { text: 'Will not compile (compilation error)', isCorrect: false, order: 1 },
        { text: 'Compiles but throws runtime exception', isCorrect: false, order: 2 },
      ])
    }
  }, [type])

  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false, order: options.length }])
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, field: keyof Option, value: string | boolean) => {
    const newOptions = [...options]
    if (field === 'isCorrect' && type === 'SINGLE_CHOICE') {
      newOptions.forEach(opt => (opt.isCorrect = false))
    }
    newOptions[index] = { ...newOptions[index], [field]: value }
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const data = {
      lectureId,
      type,
      prompt,
      codeSnippet: codeSnippet || undefined,
      explanation: explanation || undefined,
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      options: options.filter(opt => opt.text.trim()),
    }

    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to create question')
      }

      router.push('/admin/questions')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const showCodeSnippet = ['CODE_WILL_COMPILE', 'CODE_WILL_CRASH'].includes(type)
  const showOptions = !['FILL_IN_BLANK', 'SHORT_TEXT'].includes(type)

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/questions"
        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to Questions
      </Link>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Create New Question
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lecture
            </label>
            <select
              value={lectureId}
              onChange={(e) => setLectureId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a lecture</option>
              {lectures.map(lecture => (
                <option key={lecture.id} value={lecture.id}>
                  {lecture.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Question Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            >
              {QUESTION_TYPES.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Question Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter the question..."
          />
        </div>

        {showCodeSnippet && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code Snippet (Java)
            </label>
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white font-mono text-sm"
              placeholder="public class Example { ... }"
            />
          </div>
        )}

        {showOptions && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Answer Options
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type={type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
                    name="correctAnswer"
                    checked={option.isCorrect}
                    onChange={(e) => updateOption(index, 'isCorrect', e.target.checked)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(index, 'text', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!['TRUE_FALSE', 'CODE_WILL_COMPILE', 'CODE_WILL_CRASH'].includes(type) && (
              <button
                type="button"
                onClick={addOption}
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add Option
              </button>
            )}
          </div>
        )}

        {['FILL_IN_BLANK', 'SHORT_TEXT'].includes(type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correct Answer(s)
            </label>
            <input
              type="text"
              value={options[0]?.text || ''}
              onChange={(e) => setOptions([{ text: e.target.value, isCorrect: true, order: 0 }])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter the correct answer"
            />
            <p className="text-xs text-gray-500 mt-1">
              For multiple acceptable answers, separate with commas
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Explanation (shown after answering)
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            placeholder="Explain the correct answer..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            >
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              placeholder="oop, inheritance, polymorphism"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Question'}
          </button>
          <Link
            href="/admin/questions"
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
