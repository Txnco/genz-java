'use client'

interface AnswerResultProps {
  isCorrect: boolean
  explanation: string | null
  correctAnswers?: string[]
  xpAwarded: number
  onNext: () => void
  isHalfPoints?: boolean
}

export function AnswerResult({
  isCorrect,
  explanation,
  correctAnswers,
  xpAwarded,
  onNext,
  isHalfPoints,
}: AnswerResultProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      {/* Result Header */}
      <div className={`p-6 ${isCorrect ? 'bg-success/20' : 'bg-error/20'}`}>
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isCorrect ? 'bg-success' : 'bg-error'
            }`}
          >
            {isCorrect ? (
              <svg
                className="w-6 h-6 text-success-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-error-content"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${
                isCorrect ? 'text-success' : 'text-error'
              }`}
            >
              {isCorrect ? 'Točno!' : 'Netočno'}
            </h3>
            <p className="text-sm text-base-content/70">
              +{xpAwarded} XP {isHalfPoints && '(50%)'}
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="card-body">
        {!isCorrect && correctAnswers && correctAnswers.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">
              Točan odgovor{correctAnswers.length > 1 ? 'i' : ''}:
            </h4>
            <ul className="list-disc list-inside">
              {correctAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </div>
        )}

        {explanation && (
          <div>
            <h4 className="font-medium mb-2">Objašnjenje:</h4>
            <p className="text-base-content/70 whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        )}

        <button
          onClick={onNext}
          className="btn btn-primary w-full mt-6"
        >
          Sljedeće pitanje
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
