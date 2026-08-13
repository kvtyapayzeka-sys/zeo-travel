import type { Metadata } from 'next'
import { Manrope, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Zeo Travel - Antalya Turları ve Aktiviteleri',
    template: '%s | Zeo Travel',
  },
  description: 'Antalya\'nın en güvenilir turizm acentası. Tekne turları, yamaç paraşütü, ATV safari ve daha fazlası. Profesyonel rehberlik ve güvenli turlar.',
  keywords: ['antalya turları', 'tekne turu', 'yamaç paraşütü', 'atv safari', 'antalya aktiviteleri', 'tur rezervasyonu'],
  authors: [{ name: 'Zeo Travel' }],
  creator: 'Zeo Travel',
  publisher: 'Zeo Travel',
  metadataBase: new URL('https://zeotravel.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://zeotravel.com',
    title: 'Zeo Travel - Antalya Turları ve Aktiviteleri',
    description: 'Antalya\'nın en güvenilir turizm acentası. Tekne turları, yamaç paraşütü, ATV safari ve daha fazlası.',
    siteName: 'Zeo Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeo Travel - Antalya Turları',
    description: 'Antalya\'nın en güvenilir turizm acentası. Profesyonel rehberlik ve güvenli turlar.',
    creator: '@zeotravel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${manrope.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
