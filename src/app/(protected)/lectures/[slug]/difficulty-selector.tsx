'use client'

import { useState, useEffect } from 'react'

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

interface DifficultyStats {
    total: number
    answered: number
    correct: number
}

interface DifficultySelectorProps {
    stats: Record<Difficulty, DifficultyStats>
    onChange?: (selected: Difficulty[]) => void
}

const STORAGE_KEY = 'quiz-difficulty-preference'

const difficultyConfig = {
    EASY: { label: 'Lagano', color: 'green', emoji: '🟢' },
    MEDIUM: { label: 'Srednje', color: 'yellow', emoji: '🟡' },
    HARD: { label: 'Teško', color: 'red', emoji: '🔴' },
} as const

export function DifficultySelector({ stats, onChange }: DifficultySelectorProps) {
    const [selected, setSelected] = useState<Difficulty[]>(['EASY', 'MEDIUM', 'HARD'])
    const [mounted, setMounted] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Difficulty[]
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setSelected(parsed)
                }
            } catch {
                // Invalid data, use defaults
            }
        }
    }, [])

    // Save to localStorage and notify parent when selection changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
            onChange?.(selected)
        }
    }, [selected, mounted, onChange])

    const toggleDifficulty = (difficulty: Difficulty) => {
        setSelected(prev => {
            const isSelected = prev.includes(difficulty)
            // Prevent deselecting the last one
            if (isSelected && prev.length === 1) {
                return prev
            }
            if (isSelected) {
                return prev.filter(d => d !== difficulty)
            }
            return [...prev, difficulty]
        })
    }

    const colorClasses = {
        green: {
            active: 'bg-green-500/20 ring-green-500/50 text-green-600 dark:text-green-400',
            inactive: 'bg-[var(--border-color)]/30 ring-[var(--border-color)]/50 text-[var(--text-muted)]',
            dot: 'bg-green-500',
        },
        yellow: {
            active: 'bg-yellow-500/20 ring-yellow-500/50 text-yellow-600 dark:text-yellow-400',
            inactive: 'bg-[var(--border-color)]/30 ring-[var(--border-color)]/50 text-[var(--text-muted)]',
            dot: 'bg-yellow-500',
        },
        red: {
            active: 'bg-red-500/20 ring-red-500/50 text-red-600 dark:text-red-400',
            inactive: 'bg-[var(--border-color)]/30 ring-[var(--border-color)]/50 text-[var(--text-muted)]',
            dot: 'bg-red-500',
        },
    }

    // Avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="card-float p-6">
                <h2 className="font-semibold text-lg mb-4">Filtriraj po težini</h2>
                <div className="flex flex-wrap gap-3">
                    {(['EASY', 'MEDIUM', 'HARD'] as const).map(difficulty => (
                        <div key={difficulty} className="h-12 w-28 bg-[var(--border-color)]/30 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="card-float p-6">
            <h2 className="font-semibold text-lg mb-4">Filtriraj po težini</h2>
            <div className="flex flex-wrap gap-3">
                {(['EASY', 'MEDIUM', 'HARD'] as const).map(difficulty => {
                    const config = difficultyConfig[difficulty]
                    const colors = colorClasses[config.color]
                    const isActive = selected.includes(difficulty)
                    const isLastSelected = isActive && selected.length === 1
                    const diffStats = stats[difficulty]

                    return (
                        <button
                            key={difficulty}
                            onClick={() => toggleDifficulty(difficulty)}
                            disabled={isLastSelected}
                            className={`
                flex items-center gap-2.5 px-4 py-2.5 rounded-xl ring-1 font-medium
                transition-all duration-200
                ${isActive ? colors.active : colors.inactive}
                ${isLastSelected ? 'cursor-not-allowed opacity-70' : 'hover:scale-[1.02] active:scale-[0.98]'}
              `}
                            title={isLastSelected ? 'Mora biti odabrana barem jedna težina' : undefined}
                        >
                            <span className={`w-2.5 h-2.5 rounded-full ${isActive ? colors.dot : 'bg-[var(--text-muted)]/40'}`} />
                            <span>{config.label}</span>
                            <span className="text-sm opacity-70">({diffStats.total})</span>
                        </button>
                    )
                })}
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-3">
                Odaberi koje težine želiš vježbati. Postavka se pamti za sve lekcije.
            </p>
        </div>
    )
}

// Helper to get selected difficulties from localStorage (for use in other components)
export function getSelectedDifficulties(): Difficulty[] {
    if (typeof window === 'undefined') return ['EASY', 'MEDIUM', 'HARD']

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        try {
            const parsed = JSON.parse(saved) as Difficulty[]
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed
            }
        } catch {
            // Invalid data
        }
    }
    return ['EASY', 'MEDIUM', 'HARD']
}
