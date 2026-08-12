'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, Mail } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Turlar', href: '/turlar' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zeo-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-h3 font-bold text-zeo-primary-600">
              Zeo <span className="text-zeo-accent-500">Travel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body font-medium text-zeo-neutral-700 transition-colors hover:text-zeo-primary-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+905551234567"
              className="flex items-center gap-2 text-body-sm text-zeo-neutral-600 hover:text-zeo-primary-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+90 555 123 4567</span>
            </a>
            <Button asChild>
              <Link href="/turlar">Turları Keşfet</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-zeo-neutral-700 hover:bg-zeo-neutral-100"
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
        <div className="md:hidden border-t border-zeo-neutral-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-body font-medium text-zeo-neutral-700 hover:bg-zeo-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              <a
                href="tel:+905551234567"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-body font-medium text-zeo-neutral-700 hover:bg-zeo-neutral-100"
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
