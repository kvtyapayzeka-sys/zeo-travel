'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {
  CalendarDays,
  BarChart3,
  Clock3,
  LogOut,
  Map,
  Tags,
} from 'lucide-react'

const navigation = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/rezervasyonlar', label: 'Rezervasyonlar', icon: CalendarDays },
  { href: '/admin/turlar', label: 'Turlar', icon: Map },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: Tags },
  { href: '/admin/musaitlik', label: 'Müsaitlik', icon: Clock3 },
]

export function AdminNavigation({
  userName,
  userEmail,
}: {
  userName: string
  userEmail: string
}) {
  const pathname = usePathname()

  return (
    <aside className="border-b-2 border-zeo-ink bg-zeo-ink text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r-2">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/admin" className="font-bricolage text-2xl font-extrabold uppercase">
            ZEO <span className="text-zeo-coral">OPS</span>
          </Link>
          <p className="mt-1 text-xs text-white/45">Tur operasyon paneli</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-1 lg:flex-col lg:overflow-visible">
          {navigation.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-3 border px-4 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-zeo-coral bg-zeo-coral text-zeo-ink'
                    : 'border-white/10 text-white/65 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden border-t border-white/10 p-4 lg:block">
          <p className="truncate text-sm font-semibold">{userName}</p>
          <p className="truncate text-xs text-white/45">{userEmail}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="mt-4 flex w-full items-center gap-3 border border-white/10 px-4 py-3 text-sm text-white/65 transition hover:border-zeo-coral hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Çıkış yap
          </button>
        </div>
      </div>
    </aside>
  )
}
