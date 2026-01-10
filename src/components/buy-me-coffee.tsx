'use client'

import Link from 'next/link'

// Fixed bottom-left version for desktop
export function BuyMeCoffee() {
  return (
    <Link
      href="https://buymeacoffee.com/aivanovic"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 left-6 z-[100] items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/15 hover:to-orange-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20 hover:ring-amber-500/30 transition-all duration-300 shadow-lg shadow-amber-500/5 hover:shadow-amber-500/10 group"
    >
      <span className="text-lg group-hover:scale-110 transition-transform duration-300">☕</span>
      <span className="text-sm font-medium">Kupi mi kavu</span>
    </Link>
  )
}

// Navbar version for mobile (centered)
export function BuyMeCoffeeNav() {
  return (
    <Link
      href="https://buymeacoffee.com/aivanovic"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/15 hover:to-orange-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20 hover:ring-amber-500/30 transition-all duration-300 group"
    >
      <span className="text-sm group-hover:scale-110 transition-transform duration-300">☕</span>
      <span className="text-xs font-medium">Kupi mi kavu</span>
    </Link>
  )
}
