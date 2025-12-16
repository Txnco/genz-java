'use client'

import Link from 'next/link'
import { DifficultySelector } from './difficulty-selector'

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

interface DifficultyStats {
    total: number
    answered: number
    correct: number
}

interface LectureClientProps {
    slug: string
    answeredCount: number
    difficultyStats: Record<Difficulty, DifficultyStats>
}

export function LectureQuizSection({ slug, answeredCount, difficultyStats }: LectureClientProps) {
    return (
        <>
            {/* Difficulty Selector */}
            <DifficultySelector stats={difficultyStats} />

            {/* Start Quiz Button */}
            <div className="flex justify-center pt-4">
                <Link
                    href={`/lectures/${slug}/quiz`}
                    className="btn-modern btn-modern-primary text-base px-10 py-4"
                >
                    {answeredCount > 0 ? 'Nastavi kviz' : 'Pokreni kviz'}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </>
    )
}
