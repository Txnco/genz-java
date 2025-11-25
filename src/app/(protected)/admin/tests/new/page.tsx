'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Lecture {
  id: string
  title: string
  slug: string
}

export default function NewTestPage() {
  const router = useRouter()
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questionCount: 10,
    timeLimit: 30,
    lectureIds: [] as string[],
  })
  const [hasTimeLimit, setHasTimeLimit] = useState(false)
  const [selectAllLectures, setSelectAllLectures] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLectures() {
      try {
        const response = await fetch('/api/lectures')
        if (!response.ok) throw new Error('Failed to load lectures')
        const data = await response.json()
        setLectures(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lectures')
      }
    }
    loadLectures()
  }, [])

  const handleLectureToggle = (lectureId: string) => {
    setFormData(prev => ({
      ...prev,
      lectureIds: prev.lectureIds.includes(lectureId)
        ? prev.lectureIds.filter(id => id !== lectureId)
        : [...prev.lectureIds, lectureId],
    }))
  }

  const handleSelectAll = () => {
    if (selectAllLectures) {
      setFormData(prev => ({ ...prev, lectureIds: [] }))
    } else {
      setFormData(prev => ({ ...prev, lectureIds: lectures.map(l => l.id) }))
    }
    setSelectAllLectures(!selectAllLectures)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timeLimit: hasTimeLimit ? formData.timeLimit : undefined,
          lectureIds: selectAllLectures ? undefined : formData.lectureIds,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create test')
      }

      router.push('/tests')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kreiraj novi test</h1>

      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Naslov testa</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Opis (opcionalno)</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows={3}
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Broj pitanja</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            min="1"
            max="50"
            value={formData.questionCount}
            onChange={e => setFormData(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={hasTimeLimit}
              onChange={e => setHasTimeLimit(e.target.checked)}
            />
            <span className="label-text">Vremensko ograničenje</span>
          </label>
          
          {hasTimeLimit && (
            <input
              type="number"
              className="input input-bordered mt-2"
              min="1"
              max="180"
              value={formData.timeLimit}
              onChange={e => setFormData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
              placeholder="Vrijeme u minutama"
            />
          )}
        </div>

        <div className="divider"></div>

        <div className="form-control mb-4">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={selectAllLectures}
              onChange={handleSelectAll}
            />
            <span className="label-text font-semibold">Odaberi pitanja iz svih lekcija</span>
          </label>
        </div>

        {!selectAllLectures && (
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Odaberi lekcije</span>
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-4">
              {lectures.map(lecture => (
                <label key={lecture.id} className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={formData.lectureIds.includes(lecture.id)}
                    onChange={() => handleLectureToggle(lecture.id)}
                  />
                  <span className="label-text">{lecture.title}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Kreiranje...
              </>
            ) : (
              'Kreiraj test'
            )}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.back()}
          >
            Odustani
          </button>
        </div>
      </form>
    </div>
  )
}
