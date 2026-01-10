'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from './theme-toggle'
import { useState } from 'react'
import { BuyMeCoffeeNav } from './buy-me-coffee'

export function Navbar() {
  const { data: session, status } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] backdrop-blur bg-[var(--bg-primary)]/80">
      <header className="mx-auto max-w-6xl px-4 lg:px-6 relative">
        <nav className="flex h-16 items-center justify-between relative">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight transition-all hover:opacity-70 z-20"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[var(--text-primary)]">GenZ</span>
            <span className="text-[var(--text-muted)]">Java</span>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] ml-2 border-l border-[var(--border-color)] pl-3">
              Study + Memes
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {status === 'authenticated' ? (
              <>
                <NavLink href="/dashboard">Nadzorna ploča</NavLink>
                <NavLink href="/lectures">Lekcije</NavLink>
                <NavLink href="/tests">Testovi</NavLink>
                <NavLink href="/leaderboard">🏆 Ljestvica</NavLink>
                {session?.user?.role === 'ADMIN' && (
                  <NavLink href="/admin">Admin</NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink href="#questions">Pitanja</NavLink>
                <NavLink href="#tips">Savjeti</NavLink>
                <NavLink href="#tracks">Program</NavLink>
                <NavLink href="#memes">Memeovi</NavLink>
                <NavLink href="#faq">O nama</NavLink>
              </>
            )}
          </div>

          {/* Mobile Center - Buy Me Coffee */}
          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <BuyMeCoffeeNav />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 z-20">
            <ThemeToggle />

            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-lg bg-[var(--border-color)] animate-pulse" />
            ) : status === 'authenticated' ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 sm:pl-3 pr-1.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] transition-colors"
                >
                  <span className="hidden sm:block text-sm font-medium text-[var(--text-muted)] max-w-[80px] truncate">
                    {session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] font-medium text-xs flex items-center justify-center">
                    {session.user?.name?.[0] || session.user?.email?.[0]?.toUpperCase()}
                  </div>
                </button>
                
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-52 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-lg z-50 animate-slide-down origin-top-right">
                      <div className="px-3 py-2.5 border-b border-[var(--border-color)]">
                        <p className="font-medium text-sm truncate text-[var(--text-primary)]">
                          {session.user?.name || session.user?.email}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      
                      <div className="py-1">
                        <DropdownLink href="/settings" onClick={() => setUserMenuOpen(false)}>
                          <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Postavke
                        </DropdownLink>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500/80 hover:bg-red-500/5 hover:text-red-500 transition-colors text-left"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                          Odjava
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/auth/login" 
                  className="hidden sm:flex px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Prijava
                </Link>
                <Link 
                  href="/auth/register" 
                  className="btn-modern btn-modern-primary text-sm px-4 py-2"
                >
                  Kreni s vježbom
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] py-4 animate-slide-down relative z-10">
            <div className="flex flex-col gap-1">
              {status === 'authenticated' ? (
                <>
                  <MobileNavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Nadzorna ploča
                  </MobileNavLink>
                  <MobileNavLink href="/lectures" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    Lekcije
                  </MobileNavLink>
                  <MobileNavLink href="/tests" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    Testovi
                  </MobileNavLink>
                  <MobileNavLink href="/leaderboard" onClick={() => setMobileMenuOpen(false)}>
                    <span className="w-4 h-4 opacity-60 flex items-center justify-center">🏆</span>
                    Ljestvica
                  </MobileNavLink>
                  {session?.user?.role === 'ADMIN' && (
                    <MobileNavLink href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                      </svg>
                      Admin
                    </MobileNavLink>
                  )}
                </>
              ) : (
                <>
                  <MobileNavLink href="#questions" onClick={() => setMobileMenuOpen(false)}>Pitanja</MobileNavLink>
                  <MobileNavLink href="#tips" onClick={() => setMobileMenuOpen(false)}>Savjeti</MobileNavLink>
                  <MobileNavLink href="#tracks" onClick={() => setMobileMenuOpen(false)}>Program</MobileNavLink>
                  <MobileNavLink href="#memes" onClick={() => setMobileMenuOpen(false)}>Memeovi</MobileNavLink>
                  <MobileNavLink href="#faq" onClick={() => setMobileMenuOpen(false)}>O nama</MobileNavLink>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string
  children: React.ReactNode
  onClick?: () => void 
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-lg transition-colors"
    >
      {children}
    </Link>
  )
}

function DropdownLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string
  children: React.ReactNode
  onClick?: () => void 
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] transition-colors"
    >
      {children}
    </Link>
  )
}
