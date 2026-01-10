'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Test {
    id: string
    title: string
    description: string | null
    questionCount: number
    timeLimit: number | null
    createdAt: string
    createdBy: {
        name: string | null
        email: string
    } | null
    tags: string[]
    statistics: {
        attemptCount: number
        successRate: number
    }
}

export default function AdminTestsPage() {
    const router = useRouter()
    const [tests, setTests] = useState<Test[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState<string | null>(null) // ID of test being deleted

    useEffect(() => {
        loadTests()
    }, [])

    async function loadTests() {
        try {
            const response = await fetch('/api/tests')
            if (!response.ok) throw new Error('Failed to load tests')
            const data = await response.json()
            setTests(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load tests')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this test? This action cannot be undone.')) return

        setIsDeleting(id)
        try {
            const response = await fetch(`/api/tests/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete test')
            }

            // Remove from list
            setTests(prev => prev.filter(t => t.id !== id))
            router.refresh()
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete test')
        } finally {
            setIsDeleting(null)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <span>{error}</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Tests</h1>
                <Link href="/admin/tests/new" className="btn btn-primary">
                    Create New Test
                </Link>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Questions</th>
                            <th>Time Limit</th>
                            <th>Attempts</th>
                            <th>Success Rate</th>
                            <th>Tags</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-500">
                                    No tests found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            tests.map(test => (
                                <tr key={test.id}>
                                    <td>
                                        <div className="font-bold">{test.title}</div>
                                        <div className="text-xs opacity-50 truncate max-w-xs">
                                            {test.description}
                                        </div>
                                    </td>
                                    <td>{test.questionCount}</td>
                                    <td>{test.timeLimit ? `${test.timeLimit} min` : 'None'}</td>
                                    <td>{test.statistics.attemptCount}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <progress
                                                className="progress progress-success w-16"
                                                value={test.statistics.successRate}
                                                max="100"
                                            ></progress>
                                            <span>{test.statistics.successRate}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(test.tags) && test.tags.map((tag, i) => (
                                                <span key={i} className="badge badge-xs badge-ghost">{tag}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm">
                                            {test.createdBy?.name || 'Admin'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/tests/${test.id}`}
                                                className="btn btn-ghost btn-xs"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="btn btn-ghost btn-xs text-error"
                                                disabled={isDeleting === test.id}
                                            >
                                                {isDeleting === test.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
