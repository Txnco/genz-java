'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const AVAILABLE_MODELS = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Brz i pristupačan)' },
  { value: 'gpt-4o', label: 'GPT-4o (Uravnotežen)' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo (Visoka kvaliteta)' },
]

export default function AISettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [preferredModel, setPreferredModel] = useState('gpt-4o-mini')
  const [hasExistingKey, setHasExistingKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/settings/ai')
      .then(res => res.json())
      .then(data => {
        if (data.hasKey) {
          setHasExistingKey(true)
        }
        if (data.preferredModel) {
          setPreferredModel(data.preferredModel)
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/settings/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey || undefined,
          preferredModel,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Nije moguće spremiti postavke')
      }

      setMessage({ type: 'success', text: 'Postavke uspješno spremljene!' })
      setApiKey('')
      setHasExistingKey(true)
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Spremanje nije uspjelo' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Jeste li sigurni da želite ukloniti API ključ?')) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/ai', {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Brisanje API ključa nije uspjelo')
      }

      setHasExistingKey(false)
      setMessage({ type: 'success', text: 'API ključ je uklonjen' })
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Brisanje nije uspjelo' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-8 w-32 bg-base-300/50 rounded-lg animate-pulse" />
        <div className="h-12 w-64 bg-base-300/50 rounded-lg animate-pulse" />
        <div className="card-float p-6">
          <div className="space-y-4">
            <div className="h-4 w-3/4 bg-base-300/50 rounded animate-pulse" />
            <div className="h-12 w-full bg-base-300/50 rounded-lg animate-pulse" />
            <div className="h-12 w-full bg-base-300/50 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/settings"
        className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Natrag na postavke
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI postavke</h1>
        <p className="mt-2 text-base-content/60">
          Konfiguriraj OpenAI za generiranje pitanja
        </p>
      </div>

      {/* Settings card */}
      <div className="card-float p-6">
        <p className="text-sm text-base-content/60 mb-6">
          Unesi svoj OpenAI API ključ za omogućavanje AI generiranja pitanja. 
          Tvoj ključ je sigurno pohranjen i nikad se ne logira.
        </p>

        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 text-sm animate-scale-in ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
              : 'bg-error/10 border border-error/20 text-error'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              OpenAI API ključ
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={hasExistingKey ? '••••••••••••••••' : 'sk-...'}
              className="input-modern"
            />
            {hasExistingKey && (
              <p className="text-xs text-base-content/50">
                Imaš postojeći API ključ. Ostavi prazno da zadržiš trenutni.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              Preferirani model
            </label>
            <select
              value={preferredModel}
              onChange={(e) => setPreferredModel(e.target.value)}
              className="input-modern cursor-pointer"
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-modern btn-modern-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Spremanje...
                </span>
              ) : (
                'Spremi postavke'
              )}
            </button>

            {hasExistingKey && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="btn-modern bg-error/10 text-error border border-error/20 hover:bg-error/20 disabled:opacity-60"
              >
                Ukloni API ključ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Help card */}
      <div className="card-modern p-5 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Kako dobiti API ključ</h3>
            <ol className="list-decimal list-inside text-sm text-base-content/70 space-y-1">
              <li>Idi na <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
              <li>Prijavi se ili kreiraj račun</li>
              <li>Klikni &quot;Create new secret key&quot;</li>
              <li>Kopiraj ključ i zalijepi ga gore</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
