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
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
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
                className={`tag transition-all ${
                  selectedTags.includes(tag) ? 'tag-active' : ''
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
              className="card-float p-6 group animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-violet-500/15 to-purple-500/15 flex items-center justify-center font-bold text-violet-600 dark:text-violet-400">
                  {lecture.order}
                </div>
                {isCompleted ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-500/10 px-2.5 py-1 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Završeno
                  </span>
                ) : lecture.answered > 0 ? (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    correctPercentage >= 70 
                      ? 'bg-green-500/10 text-green-600' 
                      : correctPercentage >= 40 
                        ? 'bg-yellow-500/10 text-yellow-600' 
                        : 'bg-red-500/10 text-red-600'
                  }`}>
                    {correctPercentage}% točno
                  </span>
                ) : null}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-violet-500 transition-colors">
                {lecture.title}
              </h3>
              
              {lecture.description && (
                <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">
                  {lecture.description}
                </p>
              )}

              {/* Tags */}
              {lecture.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lecture.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag text-xs py-0.5 px-2">
                      {tag}
                    </span>
                  ))}
                  {lecture.tags.length > 3 && (
                    <span className="text-xs text-[var(--text-muted)]">
                      +{lecture.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Progress */}
              <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-[var(--text-muted)]">Napredak</span>
                  <span className="font-medium">{lecture.answered}/{lecture.totalQuestions}</span>
                </div>
                <div className="progress-modern h-1.5">
                  <div 
                    className="progress-modern-fill" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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

