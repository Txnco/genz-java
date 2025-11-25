'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Lecture {
  id: string
  title: string
  slug: string
}

export default function CreateTestPage() {
  const router = useRouter()
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [selectedLectures, setSelectedLectures] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
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
    setSelectedLectures(prev =>
      prev.includes(lectureId)
        ? prev.filter(id => id !== lectureId)
        : [...prev, lectureId]
    )
  }

  const handleSelectAll = () => {
    if (selectedLectures.length === lectures.length) {
      setSelectedLectures([])
    } else {
      setSelectedLectures(lectures.map(l => l.id))
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/tests/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lectureIds: selectedLectures.length > 0 ? selectedLectures : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate test')
      }

      const { test, attempt } = await response.json()
      router.push(`/tests/${test.id}?attemptId=${attempt.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate test')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generiraj novi test</h1>

      <div className="max-w-2xl">
        <div className="alert alert-info mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Test će sadržavati 12 pitanja (6 medium +2 boda, 6 hard +3 boda). Netočni odgovori: -1 bod. Ukupno: 30 bodova. Vremensko ograničenje: 45 minuta.</span>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Odaberi lekcije</h2>

            <div className="form-control mb-4">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedLectures.length === lectures.length && lectures.length > 0}
                  onChange={handleSelectAll}
                />
                <span className="label-text font-semibold">
                  {selectedLectures.length === lectures.length ? 'Odznači sve' : 'Odaberi sve lekcije'}
                </span>
              </label>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4">
              {lectures.map(lecture => (
                <label key={lecture.id} className="label cursor-pointer justify-start gap-2 hover:bg-base-200 rounded p-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedLectures.includes(lecture.id)}
                    onChange={() => handleLectureToggle(lecture.id)}
                  />
                  <span className="label-text">{lecture.title}</span>
                </label>
              ))}
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                onClick={() => router.back()}
                className="btn btn-ghost"
              >
                Odustani
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || lectures.length === 0}
                className="btn btn-primary"
              >
                {isGenerating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generiranje...
                  </>
                ) : (
                  <>
                    ⚡ Generiraj i započni test
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
