'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Lecture {
  id: string
  title: string
  slug: string
  description: string | null
  order: number
  content: string | null
  tags: string[]
}

interface GenerateQuestionsResponse {
  success: boolean
  created: number
  questions: unknown[]
  error?: string
}

interface EditLecturePageProps {
  params: Promise<{ id: string }>
}

export default function EditLecturePage({ params }: EditLecturePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    fetch(`/api/admin/lectures/${id}`)
      .then(res => res.json())
      .then(data => {
        setLecture(data)
        setTags(data.tags || [])
        setIsLoading(false)
      })
      .catch(() => {
        setError('Failed to load lecture')
        setIsLoading(false)
      })
  }, [id])

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      order: parseInt(formData.get('order') as string) || 0,
      content: formData.get('content'),
      tags: tags,
    }

    try {
      const response = await fetch(`/api/admin/lectures/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to update lecture')
      }

      router.push('/admin/lectures')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lecture? All questions will also be deleted.')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/lectures/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete lecture')
      }

      router.push('/admin/lectures')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
      setIsDeleting(false)
    }
  }

  const handleGenerateQuestions = async () => {
    const count = prompt('How many questions to generate? (1-10)', '5')
    if (!count) return

    const numCount = parseInt(count)
    if (isNaN(numCount) || numCount < 1 || numCount > 10) {
      setError('Please enter a number between 1 and 10')
      return
    }

    setIsGenerating(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/admin/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lectureId: id, count: numCount }),
      })

      const data: GenerateQuestionsResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions')
      }

      setSuccessMessage(`Successfully generated ${data.created} questions!`)
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl animate-pulse space-y-4">
        <div className="h-4 w-32 bg-base-200 rounded" />
        <div className="h-8 w-48 bg-base-200 rounded" />
        <div className="space-y-3 mt-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-base-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (!lecture) {
    return (
      <div className="card-float p-8 text-center">
        <p className="text-base-content/60">Lecture not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/lectures"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Lectures
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Lecture</h2>
        <div className="flex gap-2">
          <button
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
            className="btn-modern btn-modern-secondary text-sm py-2 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate AI Questions
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-modern btn-modern-danger text-sm py-2"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-float p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={lecture.title}
            className="input-modern"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={lecture.slug}
            className="input-modern"
          />
          <p className="text-xs text-base-content/50 mt-1">Lowercase letters, numbers, and hyphens only</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input
            type="number"
            name="order"
            defaultValue={lecture.order}
            className="input-modern"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={2}
            defaultValue={lecture.description || ''}
            className="input-modern resize-none"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add a tag..."
              className="input-modern flex-1"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn-modern btn-modern-secondary px-4"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag tag-removable flex items-center gap-1.5 pr-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <textarea
            name="content"
            rows={10}
            defaultValue={lecture.content || ''}
            className="input-modern resize-none font-mono text-sm"
          />
          <p className="text-xs text-base-content/50 mt-1">Used for AI question generation</p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-modern btn-modern-primary flex-1 py-3"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/lectures"
            className="btn-modern btn-modern-secondary py-3 px-6"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
