# ZEO TRAVEL - NEXT.JS SEO IMPLEMENTATION GUIDE

## PROJE YAPISI

```
zeo-travel/
├── app/
│   ├── layout.tsx                 # Root layout (Global metadata)
│   ├── page.tsx                   # Ana sayfa
│   ├── sitemap.ts                 # Sitemap generator
│   ├── robots.ts                  # Robots.txt generator
│   ├── turlar/
│   │   ├── page.tsx              # Turlar listesi
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Tur detay sayfası
│   │   ├── tekne-turu-antalya/
│   │   │   └── page.tsx          # Konum özel sayfa
│   │   └── sitemap.ts            # Turlar sitemap
│   ├── blog/
│   │   ├── page.tsx              # Blog listesi
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Blog detay
│   │   └── sitemap.ts            # Blog sitemap
│   └── api/
│       └── revalidate/
│           └── route.ts          # On-demand revalidation
├── components/
│   ├── JsonLd.tsx                # Schema markup component
│   ├── TourCard.tsx              # Tur kartı
│   └── Breadcrumbs.tsx           # Breadcrumb navigation
├── lib/
│   ├── api.ts                    # API fonksiyonları
│   ├── analytics.ts              # Google Analytics helpers
│   └── seo.ts                    # SEO utility fonksiyonları
├── public/
│   ├── images/                   # Optimize edilmiş görseller
│   └── og-image.jpg              # Open Graph image
└── next.config.js                # Next.js configuration
```

---

## 1. ROOT LAYOUT SETUP

### `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zeotravel.com'),
  title: {
    default: 'Zeo Travel | Antalya Tekne Turu & Macera Turları',
    template: '%s | Zeo Travel'
  },
  description: 'Antalya, Fethiye ve Kemer\'de tekne turu, parasailing, ATV safari ve yamaç paraşütü turları. ⭐ 5000+ Mutlu Müşteri | Hemen Rezervasyon Yap!',
  keywords: [
    'tekne turu antalya',
    'parasailing antalya',
    'atv safari antalya',
    'yamaç paraşütü fethiye',
    'kemer tekne turu',
    'antalya turları',
    'macera turları antalya'
  ],
  authors: [{ name: 'Zeo Travel', url: 'https://zeotravel.com' }],
  creator: 'Zeo Travel',
  publisher: 'Zeo Travel Turizm Acentası',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://zeotravel.com',
    siteName: 'Zeo Travel',
    title: 'Zeo Travel | Antalya\'nın En İyi Tekne Turu & Macera Aktiviteleri',
    description: 'Antalya\'da unutulmaz turizm deneyimleri. Tekne turu, parasailing, ATV safari ve daha fazlası! 5000+ mutlu müşteri.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zeo Travel - Antalya Turları',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zeotravel',
    creator: '@zeotravel',
    title: 'Zeo Travel | Antalya Tekne Turu & Macera Turları',
    description: 'Antalya\'da unutulmaz turizm deneyimleri. Online rezervasyon yapın!',
    images: ['/twitter-image.jpg'],
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
  alternates: {
    canonical: 'https://zeotravel.com',
    languages: {
      'tr-TR': 'https://zeotravel.com',
      'en-US': 'https://zeotravel.com/en',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

---

## 2. TUR DETAY SAYFASI

### `app/turlar/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTour, getTours } from '@/lib/api'
import { JsonLd } from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Props {
  params: { slug: string }
}

// Static Site Generation - Tüm turlar için pre-render
export async function generateStaticParams() {
  const tours = await getTours()
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}

// Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await getTour(params.slug)
  
  if (!tour) {
    return {
      title: 'Tur Bulunamadı',
    }
  }

  const title = `${tour.name} | ${tour.duration} Saat | ${tour.price}₺'den Başlayan Fiyatlarla`
  const description = `${tour.shortDescription} ⭐ ${tour.rating} Puan | ${tour.reviewCount}+ Yorum | Ücretsiz İptal`

  return {
    title,
    description,
    keywords: [
      tour.name.toLowerCase(),
      `${tour.category} ${tour.location}`.toLowerCase(),
      `${tour.location} turları`,
      tour.category,
      ...tour.tags,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://zeotravel.com/turlar/${tour.slug}`,
      images: [
        {
          url: tour.mainImage,
          width: 1200,
          height: 630,
          alt: tour.name,
        },
        ...tour.galleryImages.slice(0, 3).map(img => ({
          url: img,
          width: 800,
          height: 600,
          alt: `${tour.name} - Galeri`,
        }))
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tour.mainImage],
    },
    alternates: {
      canonical: `https://zeotravel.com/turlar/${tour.slug}`,
    },
  }
}

export default async function TourPage({ params }: Props) {
  const tour = await getTour(params.slug)
  
  if (!tour) {
    notFound()
  }

  // Schema.org JSON-LD
  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tour.name,
    description: tour.description,
    image: [tour.mainImage, ...tour.galleryImages],
    touristType: tour.suitableFor,
    availableLanguage: ['tr', 'en', 'de', 'ru'],
    isAccessibleForFree: false,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      addressLocality: tour.location,
      addressRegion: tour.region,
      addressCountry: 'TR'
    }
  }

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: tour.name,
    price: tour.price,
    priceCurrency: 'TRY',
    availability: 'https://schema.org/InStock',
    validFrom: tour.seasonStart,
    validThrough: tour.seasonEnd,
    url: `https://zeotravel.com/turlar/${tour.slug}`,
    seller: {
      '@type': 'Organization',
      name: 'Zeo Travel'
    },
    priceValidUntil: tour.seasonEnd,
  }

  const aggregateRatingSchema = tour.reviewCount > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: tour.rating,
    reviewCount: tour.reviewCount,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': 'TouristAttraction',
      name: tour.name
    }
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://zeotravel.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Turlar',
        item: 'https://zeotravel.com/turlar'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tour.category,
        item: `https://zeotravel.com/turlar/${tour.categorySlug}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: tour.name,
        item: `https://zeotravel.com/turlar/${tour.slug}`
      }
    ]
  }

  return (
    <>
      <JsonLd data={touristAttractionSchema} />
      <JsonLd data={offerSchema} />
      {aggregateRatingSchema && <JsonLd data={aggregateRatingSchema} />}
      <JsonLd data={breadcrumbSchema} />

      <article>
        <Breadcrumbs
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Turlar', href: '/turlar' },
            { label: tour.category, href: `/turlar/${tour.categorySlug}` },
            { label: tour.name, href: `/turlar/${tour.slug}` },
          ]}
        />

        <header>
          <h1>{tour.name}</h1>
          <div className="tour-meta">
            <span>⏱️ {tour.duration} Saat</span>
            <span>📍 {tour.location}</span>
            <span>⭐ {tour.rating} ({tour.reviewCount} yorum)</span>
          </div>
        </header>

        <section className="tour-hero">
          <Image
            src={tour.mainImage}
            alt={`${tour.name} - Ana Görsel`}
            width={1200}
            height={800}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL={tour.blurDataURL}
          />
        </section>

        <section>
          <h2>Tur Hakkında</h2>
          <p>{tour.description}</p>
        </section>

        <section>
          <h2>Tur Programı</h2>
          {tour.itinerary.map((item, index) => (
            <div key={index}>
              <h3>{item.time} - {item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Fiyata Dahil Olanlar</h2>
          <ul>
            {tour.included.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Fiyata Dahil Olmayanlar</h2>
          <ul>
            {tour.excluded.map((item, index) => (
              <li key={index}>❌ {item}</li>
            ))}
          </ul>
        </section>

        {/* Daha fazla bölüm... */}
      </article>
    </>
  )
}

// ISR: Her 1 saatte bir yeniden oluştur
export const revalidate = 3600
```

---

## 3. SITEMAP OLUŞTURMA

### `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://zeotravel.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://zeotravel.com/turlar',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://zeotravel.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://zeotravel.com/hakkimizda',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://zeotravel.com/iletisim',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
```

### `app/turlar/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getTours } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getTours()
  
  return tours.map((tour) => ({
    url: `https://zeotravel.com/turlar/${tour.slug}`,
    lastModified: tour.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
}
```

---

## 4. ROBOTS.TXT

### `app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/payment/',
          '/*?page=',
          '/*?sort=',
          '/*?filter=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
      },
    ],
    sitemap: [
      'https://zeotravel.com/sitemap.xml',
      'https://zeotravel.com/turlar/sitemap.xml',
      'https://zeotravel.com/blog/sitemap.xml',
    ],
  }
}
```

---

## 5. JSON-LD COMPONENT

### `components/JsonLd.tsx`

```typescript
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

---

## 6. ANALYTICS UTILITIES

### `lib/analytics.ts`

```typescript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

// Google Analytics Event Tracking
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Tour View Event
export const trackTourView = (tourData: {
  tour_id: string
  tour_name: string
  tour_category: string
  tour_price: number
  tour_location: string
}) => {
  trackEvent('tour_view', tourData)
}

// Add to Cart Event
export const trackAddToCart = (tourData: {
  tour_id: string
  tour_name: string
  tour_price: number
}) => {
  trackEvent('add_to_cart', {
    currency: 'TRY',
    value: tourData.tour_price,
    items: [
      {
        item_id: tourData.tour_id,
        item_name: tourData.tour_name,
        price: tourData.tour_price,
      },
    ],
  })
}

// Begin Checkout Event
export const trackBeginCheckout = (tourData: {
  tour_id: string
  tour_name: string
  tour_price: number
}) => {
  trackEvent('begin_checkout', {
    currency: 'TRY',
    value: tourData.tour_price,
    items: [
      {
        item_id: tourData.tour_id,
        item_name: tourData.tour_name,
        price: tourData.tour_price,
      },
    ],
  })
}

// Purchase Event
export const trackPurchase = (orderData: {
  transaction_id: string
  value: number
  items: Array<{
    item_id: string
    item_name: string
    price: number
  }>
}) => {
  trackEvent('purchase', {
    transaction_id: orderData.transaction_id,
    value: orderData.value,
    currency: 'TRY',
    items: orderData.items,
  })
}

// Facebook Pixel Events
export const fbTrackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Custom Event: Phone Click
export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: 'phone_number_clicked',
  })
}

// Custom Event: WhatsApp Click
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_clicked',
  })
}
```

---

## 7. NEXT.JS CONFIG

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gzip compression etkin
  compress: true,

  // SWC ile minification
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'zeotravel.com',
      'cdn.zeotravel.com', // Eğer CDN kullanıyorsanız
    ],
  },

  // Trailing slash yok
  trailingSlash: false,

  // Powered by header'ı kaldır (security)
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },

  // Redirects (eski URL'lerden yenilere)
  async redirects() {
    return [
      {
        source: '/tur/:slug',
        destination: '/turlar/:slug',
        permanent: true,
      },
      {
        source: '/tours/:slug',
        destination: '/turlar/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 8. BREADCRUMBS COMPONENT

### `components/Breadcrumbs.tsx`

```typescript
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={item.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span itemProp="name">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                  <span className="separator"> / </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

---

## 9. ON-DEMAND REVALIDATION

### `app/api/revalidate/route.ts`

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // Secret token kontrolü
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { path, tag } = body

    if (path) {
      // Path-based revalidation
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    }

    if (tag) {
      // Tag-based revalidation
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path,
      tag 
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}

// Kullanım örneği (CMS webhook):
// POST https://zeotravel.com/api/revalidate?secret=YOUR_SECRET
// Body: { "path": "/turlar/kemer-tekne-turu" }
```

---

## 10. SEO UTILITY FUNCTIONS

### `lib/seo.ts`

```typescript
// Slug oluşturma (Türkçe karakterler düzelt)
export function generateSlug(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  }

  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Özel karakterleri kaldır
    .replace(/[\s_-]+/g, '-') // Boşlukları tire yap
    .replace(/^-+|-+$/g, '')  // Baş/sondaki tireleri kaldır
}

// Meta description kısaltma
export function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text
  
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return truncated.substring(0, lastSpace) + '...'
}

// Structured data helper
export function generateTourStructuredData(tour: any) {
  return {
    touristAttraction: {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: tour.name,
      description: tour.description,
      image: tour.images,
      address: {
        '@type': 'PostalAddress',
        addressLocality: tour.location,
        addressCountry: 'TR'
      }
    },
    offer: {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
    }
  }
}

// Open Graph image URL generator
export function getOgImageUrl(params: {
  title: string
  subtitle?: string
  image?: string
}): string {
  // OG image generator servisine istek (örn: Vercel OG)
  const url = new URL('https://zeotravel.com/api/og')
  url.searchParams.set('title', params.title)
  if (params.subtitle) url.searchParams.set('subtitle', params.subtitle)
  if (params.image) url.searchParams.set('image', params.image)
  
  return url.toString()
}

// Canonical URL generator
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zeotravel.com'
  return `${baseUrl}${path}`
}
```

---

## 11. ÖRNEK API FONKSIYONLARI

### `lib/api.ts`

```typescript
// Tour tiplemesi
export interface Tour {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  category: string
  categorySlug: string
  location: string
  region: string
  duration: number
  price: number
  discountPrice?: number
  rating: number
  reviewCount: number
  mainImage: string
  galleryImages: string[]
  blurDataURL: string
  tags: string[]
  keywords: string[]
  suitableFor: string[]
  included: string[]
  excluded: string[]
  itinerary: Array<{
    time: string
    title: string
    description: string
  }>
  seasonStart: string
  seasonEnd: string
  createdAt: string
  updatedAt: string
}

// Tüm turları getir
export async function getTours(): Promise<Tour[]> {
  // Veritabanı veya CMS'den çek
  const res = await fetch('https://api.zeotravel.com/tours', {
    next: { revalidate: 3600 } // 1 saat cache
  })
  
  if (!res.ok) throw new Error('Failed to fetch tours')
  
  return res.json()
}

// Tek tur getir
export async function getTour(slug: string): Promise<Tour | null> {
  const res = await fetch(`https://api.zeotravel.com/tours/${slug}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) return null
  
  return res.json()
}

// Kategoriye göre turlar
export async function getToursByCategory(categorySlug: string): Promise<Tour[]> {
  const res = await fetch(
    `https://api.zeotravel.com/tours?category=${categorySlug}`,
    { next: { revalidate: 3600 } }
  )
  
  if (!res.ok) throw new Error('Failed to fetch tours by category')
  
  return res.json()
}

// Lokasyona göre turlar
export async function getToursByLocation(location: string): Promise<Tour[]> {
  const res = await fetch(
    `https://api.zeotravel.com/tours?location=${location}`,
    { next: { revalidate: 3600 } }
  )
  
  if (!res.ok) throw new Error('Failed to fetch tours by location')
  
  return res.json()
}
```

---

## 12. ENV VARIABLES

### `.env.local`

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://zeotravel.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX

# API
NEXT_PUBLIC_API_URL=https://api.zeotravel.com
API_SECRET_KEY=your-secret-key

# Revalidation Secret
REVALIDATION_SECRET=your-revalidation-secret

# Database (örn: Supabase)
DATABASE_URL=postgresql://...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@zeotravel.com
SMTP_PASSWORD=your-password

# Search Console
GOOGLE_VERIFICATION=your-verification-code
YANDEX_VERIFICATION=your-verification-code
```

---

## DEPLOYMENT CHECKLIST

### Pre-Launch SEO Checklist:

```
✅ Meta tags (title, description) tüm sayfalarda
✅ Open Graph tags ekli
✅ Twitter Card tags ekli
✅ Canonical URLs doğru
✅ Schema markup (JSON-LD) ekli
✅ Sitemap.xml oluşturuldu ve test edildi
✅ Robots.txt doğru yapılandırıldı
✅ Google Analytics kuruldu
✅ Google Search Console kuruldu
✅ Page speed optimize edildi (Lighthouse 90+)
✅ Mobile responsive kontrol
✅ Alt text tüm görsellerde
✅ Internal linking yapıldı
✅ 404 sayfası özelleştirildi
✅ HTTPS aktif (SSL sertifikası)
✅ www → non-www redirect (veya tersi)
✅ URL yapısı SEO-friendly
✅ Breadcrumbs eklendi
✅ Loading state'ler optimize
✅ Error handling doğru
✅ Security headers eklendi
```

### Post-Launch:

```
✅ Google Search Console'a sitemap gönder
✅ Bing Webmaster Tools'a ekle
✅ Yandex Webmaster'a ekle
✅ Google Business Profile oluştur
✅ Sosyal medya hesapları aç ve bağla
✅ İlk blog yazılarını yayınla
✅ Backlink outreach başlat
✅ Performance monitoring kur (Vercel Analytics, Sentry)
```

---

## PERFORMANS MONITORING

### Web Vitals Tracking

```typescript
// app/layout.tsx içinde
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Analytics'e gönder
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Console'a log (development)
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }
  })

  return null
}
```

---

Erdal abi, bu implementation guide ile Next.js projesinde SEO'yu adım adım uygulayabilirsiniz. Her dosya için detaylı kod örneği ve açıklama ekledim. 

Sorularınız veya başka bir konuda yardıma ihtiyacınız varsa söyleyin! 🚀
