import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Navbar } from '@/components/navbar'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-base-100 mesh-bg">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="animate-fade-up">
          {children}
        </div>
      </main>
    </div>
  )
}
