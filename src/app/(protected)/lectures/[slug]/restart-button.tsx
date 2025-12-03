'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RestartButtonProps {
  lectureId: string
  lectureTitle: string
}

export function RestartButton({ lectureId, lectureTitle }: RestartButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)

  const handleRestart = async () => {
    setIsRestarting(true)
    
    try {
      const response = await fetch('/api/lectures/restart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lectureId }),
      })

      if (!response.ok) {
        throw new Error('Failed to restart')
      }

      router.refresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Error restarting lecture:', error)
      alert('Greška prilikom resetiranja napretka')
    } finally {
      setIsRestarting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-modern btn-modern-ghost text-sm px-3 py-2 text-base-content/60 hover:text-base-content"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span className="hidden sm:inline">Resetiraj napredak</span>
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isRestarting && setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-base-100 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Resetiraj napredak?</h3>
              <p className="text-base-content/60 mb-6">
                Sav napredak za lekciju <span className="font-medium text-base-content">&quot;{lectureTitle}&quot;</span> će biti obrisan. 
                Vaši prethodni rezultati bit će spremljeni u povijest pokušaja.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isRestarting}
                  className="flex-1 btn-modern btn-modern-secondary py-2.5"
                >
                  Odustani
                </button>
                <button
                  onClick={handleRestart}
                  disabled={isRestarting}
                  className="flex-1 btn-modern btn-modern-danger py-2.5"
                >
                  {isRestarting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetiranje...
                    </span>
                  ) : (
                    'Resetiraj'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

