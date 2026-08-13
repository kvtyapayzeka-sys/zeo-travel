import type { Metadata } from 'next'
import Link from 'next/link'
import { Fraunces, Public_Sans, Archivo, IBM_Plex_Sans, Bricolage_Grotesque } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-public-sans',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Design Lab — Zeo Travel',
}

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${publicSans.variable} ${archivo.variable} ${plexSans.variable} ${bricolage.variable}`}
    >
      <div className="sticky top-0 z-[100] flex h-9 items-center justify-between gap-3 overflow-hidden whitespace-nowrap bg-neutral-900 px-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white/80 sm:gap-4 sm:px-4 sm:text-[11px] sm:tracking-[0.12em]">
        <Link href="/design-lab" className="shrink-0 hover:text-white">
          Design Lab<span className="hidden sm:inline"> — sadece keşif, yayında değil</span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          <Link href="/design-lab/a" className="hover:text-white">
            <span className="sm:hidden">A</span><span className="hidden sm:inline">A · Editorial</span>
          </Link>
          <Link href="/design-lab/b" className="hover:text-white">
            <span className="sm:hidden">B</span><span className="hidden sm:inline">B · Modernist</span>
          </Link>
          <Link href="/design-lab/c" className="hover:text-white">
            <span className="sm:hidden">C</span><span className="hidden sm:inline">C · Kinetic</span>
          </Link>
          <Link href="/" className="hover:text-white">
            <span className="sm:hidden">Site ↗</span><span className="hidden sm:inline">Canlı site ↗</span>
          </Link>
        </nav>
      </div>
      {children}
    </div>
  )
}
