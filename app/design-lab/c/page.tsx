import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getCategories, getHighlightedTours, getTours } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Reveal } from '@/components/kinetic/reveal'
import { ScrollCarousel } from '@/components/kinetic/scroll-carousel'
import { HeroSlideshow } from '@/components/kinetic/hero-slideshow'

const display = 'font-[family-name:var(--font-bricolage)]'
const body = 'font-[family-name:var(--font-manrope)]'

const rotations = ['lg:-rotate-2', 'lg:rotate-1', 'lg:-rotate-1', 'lg:rotate-2']

const coords = [
  { name: 'Kemer', lat: '36.60°N', lon: '30.56°E', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&h=700&fit=crop&q=80' },
  { name: 'Alanya', lat: '36.54°N', lon: '31.99°E', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=700&fit=crop&q=80' },
  { name: 'Side', lat: '36.77°N', lon: '31.39°E', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&h=700&fit=crop&q=80' },
  { name: 'Belek', lat: '36.86°N', lon: '31.06°E', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=700&h=700&fit=crop&q=80' },
  { name: 'Kaş', lat: '36.20°N', lon: '29.64°E', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&h=700&fit=crop&q=80' },
]

function Ticker({ items, className = '' }: { items: string[]; className?: string }) {
  const loop = [...items, ...items]
  return (
    <div aria-hidden="true" className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-6 text-[13px] font-semibold uppercase tracking-[0.14em]">
            {t}
            <span className="text-[#ff5a3d]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ConceptC() {
  const tours = getTours()
  const featured = getHighlightedTours()
  const categories = getCategories()
  const tickerItems = categories.map((c) => c.name)

  return (
    <div className={`${body} bg-[#f6f1e6] text-[#0a1420]`}>
      {/* Header */}
      <header className="sticky top-9 z-40 border-b border-white/10 bg-[#0a1420]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link href="/design-lab/c" className={`${display} text-xl font-extrabold uppercase tracking-tight text-white`}>
            Zeo<span className="text-[#ff5a3d]">.</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/60 md:flex">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <Link href="/turlar" className="hover:text-white">Turlar</Link>
            <Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white">İletişim</Link>
          </nav>
          <Link
            href="/turlar"
            className="hidden rounded-full bg-[#ff5a3d] px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.05em] text-[#0a1420] transition-transform hover:scale-105 md:inline-block"
          >
            Rezervasyon
          </Link>
        </div>
      </header>

      {/* Hero — full-bleed photo, content + ticker overlaid so the ticker is visible without scrolling */}
      <section className="relative flex h-[88vh] max-h-[820px] min-h-[600px] w-full flex-col overflow-hidden bg-[#0a1420] text-white">
        <HeroSlideshow
          images={[
            { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=1200&fit=crop&q=80', alt: 'Yükseklerden Akdeniz manzarası' },
            { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&h=1200&fit=crop&q=80', alt: 'Kemer koyunda dalış' },
            { src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1800&h=1200&fit=crop&q=80', alt: 'Belek doğasında at turu' },
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1420]/85 via-[#0a1420]/20 to-[#0a1420]/85" />

        <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pt-8 lg:px-12 lg:pt-12">
          <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
            <span>36.8°N 30.7°E</span>
            <span className="text-[#ff5a3d]">·</span>
            <span>Antalya, Türkiye</span>
          </div>

          <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-12">
            <Reveal className="lg:col-span-8">
              <h1 className={`${display} text-[17vw] font-extrabold uppercase leading-[0.82] tracking-tight sm:text-8xl lg:text-[8.5rem]`}>
                Keşfet
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="max-w-xs text-[15px] leading-relaxed text-white/70">
                Tekne, paraşüt, ATV, dalış — Antalya&apos;nın rehberli
                aktiviteleri tek noktada. Etiketle, seç, ayır.
              </p>
              <span className="mt-3 inline-block rounded-full bg-[#cbe85b] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0a1420]">
                {tours.length} aktif tur
              </span>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-[#0a1420]/70 py-3 backdrop-blur-sm">
          <Ticker items={tickerItems} className="text-white/70" />
        </div>
      </section>

      {/* Discovery pills */}
      <section className="bg-[#0a1420] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-6 py-6 lg:px-12">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/turlar?kategori=${c.slug}`}
              className="rounded-full border border-white/20 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-white/70 transition-colors hover:border-[#ff5a3d] hover:text-white"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/turlar"
            className="ml-auto flex items-center gap-1 rounded-full bg-[#ff5a3d] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#0a1420]"
          >
            Tümü <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Featured — rotated stack */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#ff5a3d]">Öne Çıkanlar</p>
          <h2 className={`${display} mb-14 text-4xl font-extrabold uppercase leading-none lg:text-6xl`}>
            Bu hafta sahada
          </h2>
        </Reveal>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0">
          {featured.map((tour, i) => (
            <Reveal
              key={tour.id}
              delay={i * 0.06}
              className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto"
            >
              <Link
                href={`/turlar/${tour.slug}`}
                className={`group block border-2 border-[#0a1420] bg-white p-2.5 shadow-[6px_6px_0_0_#0a1420] transition-transform duration-300 hover:!rotate-0 ${rotations[i % rotations.length]}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={tour.images[0]}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 1024px) 60vw, 24vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-[#cbe85b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#0a1420]">
                    {Math.round(tour.duration / 60)} sa
                  </span>
                </div>
                <div className="border-t border-dashed border-[#0a1420]/30 px-1 pt-3">
                  <h3 className="text-[14px] font-bold leading-snug">{tour.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.06em] text-[#0a1420]/50">{tour.category.name}</span>
                    <span className={`${display} font-extrabold text-[#ff5a3d]`}>{formatPrice(tour.priceAdult)}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Category gallery — scroll snap */}
      <section className="bg-[#0a1420] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <h2 className={`${display} mb-10 text-4xl font-extrabold uppercase leading-none lg:text-6xl`}>
              Kategoriler
            </h2>
          </Reveal>
        </div>
        <ScrollCarousel
          trackClassName="gap-4 px-6 lg:px-12"
          arrowClassName="bg-[#0a1420]/80 text-white hover:bg-[#ff5a3d]"
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/turlar?kategori=${cat.slug}`}
              className="group relative aspect-[3/4] w-[62vw] shrink-0 snap-start overflow-hidden sm:w-[38vw] lg:w-[22vw]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 60vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <p className={`${display} -rotate-2 text-2xl font-extrabold uppercase leading-none text-white`}>
                  {cat.name}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-white/60">
                  {cat.tourCount} tur · geliştirme verisi
                </p>
              </div>
            </Link>
          ))}
        </ScrollCarousel>
      </section>

      {/* Destination coordinate tags */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <h2 className={`${display} mb-10 text-3xl font-extrabold uppercase leading-none lg:text-5xl`}>
            Saha koordinatları
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {coords.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.05}>
              <div className="border-2 border-[#0a1420] bg-white p-2">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image src={d.image} alt={d.name} fill sizes="(max-width: 1024px) 40vw, 18vw" className="object-cover" />
                </div>
                <p className={`${display} mt-2 text-sm font-extrabold uppercase`}>{d.name}</p>
                <p className="text-[11px] text-[#0a1420]/50">{d.lat} {d.lon}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust — briefing tags */}
      <section className="border-y-2 border-[#0a1420] bg-[#f6f1e6]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-6 py-10 lg:px-12">
          {[
            'Rehberli / profesyonel ekip',
            'Ekipman dahil',
            'Havale ile güvenli ödeme',
            'Rezervasyon sonrası e-posta onayı',
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-[#0a1420] bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0a1420] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <h2 className={`${display} max-w-3xl text-5xl font-extrabold uppercase leading-[0.9] lg:text-7xl`}>
              Tarihi seç, <span className="text-[#ff5a3d]">rotayı çiz.</span>
            </h2>
            <Link
              href="/turlar"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ff5a3d] px-8 py-4 text-[14px] font-bold uppercase tracking-[0.06em] text-[#0a1420] transition-transform hover:scale-105"
            >
              Turları görüntüle <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 border-y border-white/10 py-3">
          <Ticker items={tickerItems} className="text-white/50" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1420] px-6 py-10 text-white/50 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 text-[13px] md:flex-row md:items-center">
          <span className={`${display} text-lg font-extrabold uppercase text-white`}>Zeo Travel</span>
          <span>Lara, Antalya · Concept C — Kinetic Expedition</span>
        </div>
      </footer>
    </div>
  )
}
