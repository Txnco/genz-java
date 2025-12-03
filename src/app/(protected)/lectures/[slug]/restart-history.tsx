'use client'

import { useState } from 'react'

interface RestartRecord {
  id: string
  questionsAnswered: number
  questionsCorrect: number
  accuracy: number
  restartedAt: Date | string
}

interface RestartHistoryProps {
  history: RestartRecord[]
}

export function RestartHistory({ history }: RestartHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="card-float p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="font-semibold">Povijest pokušaja</h2>
            <p className="text-sm text-base-content/60">{history.length} prethodnih pokušaja</p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-base-content/40 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-5 space-y-3 animate-fade-up">
          {history.map((record, index) => (
            <div 
              key={record.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-base-200/50 border border-base-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center text-sm font-medium text-base-content/60">
                  #{history.length - index}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {record.questionsCorrect}/{record.questionsAnswered} točno
                  </p>
                  <p className="text-xs text-base-content/50">
                    {formatDate(record.restartedAt)}
                  </p>
                </div>
              </div>
              <div className={`text-lg font-bold ${
                record.accuracy >= 70 ? 'text-green-500' : 
                record.accuracy >= 40 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {record.accuracy}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

