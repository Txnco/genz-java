'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface LectureWithProgress {
  id: string
  title: string
  slug: string
  description: string | null
  order: number
  tags: string[]
  totalQuestions: number
  answered: number
  correct: number
}

interface LecturesListProps {
  lectures: LectureWithProgress[]
  allTags: string[]
}

export function LecturesList({ lectures, allTags }: LecturesListProps) {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredLectures = useMemo(() => {
    return lectures.filter(lecture => {
      // Search filter
      const searchLower = search.toLowerCase()
      const matchesSearch =
        search === '' ||
        lecture.title.toLowerCase().includes(searchLower) ||
        lecture.description?.toLowerCase().includes(searchLower) ||
        lecture.tags.some(tag => tag.toLowerCase().includes(searchLower))

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => lecture.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [lectures, search, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedTags([])
  }

  const hasFilters = search !== '' || selectedTags.length > 0

  return (
    <>
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži lekcije..."
            className="input-modern pl-12 pr-4"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag transition-all ${selectedTags.includes(tag) ? 'tag-active' : ''
                  }`}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Active filters indicator */}
        {hasFilters && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-muted)]">
              {filteredLectures.length} od {lectures.length} lekcija
            </span>
            <button
              onClick={clearFilters}
              className="text-violet-500 hover:text-violet-600 font-medium transition-colors"
            >
              Očisti filtere
            </button>
          </div>
        )}
      </div>

      {/* Lectures Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLectures.map((lecture, index) => {
          const percentage = lecture.totalQuestions > 0
            ? Math.round((lecture.answered / lecture.totalQuestions) * 100)
            : 0
          const correctPercentage = lecture.answered > 0
            ? Math.round((lecture.correct / lecture.answered) * 100)
            : 0
          const isCompleted = percentage === 100

          return (
            <Link
              key={lecture.id}
              href={`/lectures/${lecture.slug}`}
              className="group relative flex flex-col bg-[var(--bg-surface)] rounded-3xl p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] ring-1 ring-[var(--border-color)]/50 hover:ring-violet-500/30 transition-all duration-300 hover:-translate-y-1 animate-fade-up overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Header row with Order and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-lg shadow-inner">
                  {lecture.order}
                </div>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Završeno
                  </span>
                ) : lecture.answered > 0 ? (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ${correctPercentage >= 70
                    ? 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20'
                    : correctPercentage >= 40
                      ? 'bg-amber-500/10 text-amber-600 ring-amber-500/20'
                      : 'bg-rose-500/10 text-rose-600 ring-rose-500/20'
                    }`}>
                    {correctPercentage}% točno
                  </span>
                ) : null}
              </div>

              {/* Main Content */}
              <div className="flex-1 mb-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                  {lecture.title}
                </h3>

                {lecture.description && (
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {lecture.description}
                  </p>
                )}
              </div>

              {/* Footer Section */}
              <div className="mt-auto space-y-4">
                {/* Tags */}
                {lecture.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {lecture.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-background)] text-[var(--text-muted)] ring-1 ring-[var(--border-color)]">
                        {tag}
                      </span>
                    ))}
                    {lecture.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-[var(--text-muted)]">
                        +{lecture.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Progress Bar & Arrow Row */}
                <div className="pt-4 border-t border-[var(--border-color)]/50">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[var(--text-muted)]">Napredak</span>
                        <span className="text-[var(--text-primary)]">
                          {lecture.answered} / {lecture.totalQuestions}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--bg-background)] rounded-full overflow-hidden ring-1 ring-[var(--border-color)]/30">
                        <div
                          className="h-full bg-violet-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <div className="w-8 h-8 rounded-full bg-[var(--bg-background)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shadow-sm ring-1 ring-[var(--border-color)] group-hover:ring-violet-500 shrink-0 group-hover:scale-110 group-hover:shadow-md">
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredLectures.length === 0 && (
        <div className="card-float p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium mb-2">Nema rezultata</h3>
          <p className="text-[var(--text-muted)] mb-4">
            {hasFilters
              ? 'Pokušaj s drugim filterima ili pojmovima za pretraživanje'
              : 'Lekcije će se pojaviti ovdje kada budu dodane'
            }
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="btn-modern btn-modern-secondary text-sm"
            >
              Očisti filtere
            </button>
          )}
        </div>
      )}
    </>
  )
}

