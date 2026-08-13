'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Turlar', href: '/turlar' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zeo-ink text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-bricolage text-xl font-extrabold uppercase tracking-tight">
              Zeo<span className="text-zeo-coral">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-5">
            <a
              href="tel:+905551234567"
              className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+90 555 123 4567</span>
            </a>
            <Button asChild size="sm">
              <Link href="/turlar">Turları Keşfet</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-full p-2 text-white hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menüyü aç</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-zeo-ink md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-white/70 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 space-y-3 px-3">
              <a
                href="tel:+905551234567"
                className="flex items-center gap-2 text-[13px] font-medium text-white/70"
              >
                <Phone className="h-4 w-4" />
                <span>+90 555 123 4567</span>
              </a>
              <Button asChild className="w-full">
                <Link href="/turlar">Turları Keşfet</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
