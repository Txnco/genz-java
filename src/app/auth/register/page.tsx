'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Lozinke se ne podudaraju')
      return
    }

    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 znakova')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registracija nije uspjela')
        return
      }

      router.push('/auth/login?registered=true')
    } catch {
      setError('Nešto je pošlo po zlu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 mesh-bg relative overflow-hidden px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Card */}
        <div className="card-float p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              href="/" 
              className="inline-block font-display font-bold text-2xl tracking-tight mb-6"
            >
              <span className="text-gradient">GenZ</span> Java
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Kreiraj račun</h1>
            <p className="mt-2 text-base-content/60">
              Započni svoje putovanje učenja Jave
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm animate-scale-in">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-base-content/80">
                Ime i prezime
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                placeholder="Ivan Horvat"
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-base-content/80">
                Email adresa
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern"
                placeholder="tvoj@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-base-content/80">
                Lozinka
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                placeholder="Minimalno 6 znakova"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-base-content/80">
                Potvrdi lozinku
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-modern"
                placeholder="Ponovi lozinku"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-modern btn-modern-primary w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Kreiranje računa...
                </span>
              ) : (
                'Kreiraj račun'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-base-content/60">
            Već imaš račun?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Prijavi se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
