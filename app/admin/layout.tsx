import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AdminNavigation } from '@/components/admin/admin-navigation'
import { authOptions, isAdmin } from '@/lib/auth'

export const metadata: Metadata = {
  title: {
    default: 'Operasyon Paneli',
    template: '%s | ZEO OPS',
  },
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || !isAdmin(session.user.role)) {
    redirect('/auth/signin?callbackUrl=/admin')
  }

  return (
    <div className="min-h-screen bg-[#f3efe5] text-zeo-ink">
      <AdminNavigation
        userName={session.user.name ?? 'Admin'}
        userEmail={session.user.email ?? ''}
      />
      <main className="px-4 py-8 sm:px-6 lg:ml-72 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  )
}
