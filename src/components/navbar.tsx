'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          {status === 'authenticated' && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/dashboard">Nadzorna ploča</Link></li>
              <li><Link href="/lectures">Lekcije</Link></li>
              <li><Link href="/tests">Testovi</Link></li>
              {session?.user?.role === 'ADMIN' && (
                <li><Link href="/admin">Administracija</Link></li>
              )}
            </ul>
          )}
        </div>
        <Link href="/" className="btn btn-ghost text-xl text-primary">
          GenZ Java
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        {status === 'authenticated' && (
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/dashboard">Nadzorna ploča</Link></li>
            <li><Link href="/lectures">Lekcije</Link></li>
            <li><Link href="/tests">Testovi</Link></li>
            {session?.user?.role === 'ADMIN' && (
              <li><Link href="/admin">Administracija</Link></li>
            )}
          </ul>
        )}
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {status === 'loading' ? (
          <div className="skeleton w-8 h-8 rounded-full"></div>
        ) : status === 'authenticated' ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-lg font-medium">
                  {session.user?.name?.[0] || session.user?.email?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{session.user?.name || session.user?.email}</span>
              </li>
              <li><Link href="/settings">Postavke</Link></li>
              {/* <li><Link href="/settings/ai">AI postavke</Link></li> */}
              <li className="divider my-1"></li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-error"
                >
                  Odjava
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="btn btn-ghost btn-sm">
              Prijava
            </Link>
            <Link href="/auth/register" className="btn btn-primary btn-sm">
              Registracija
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
