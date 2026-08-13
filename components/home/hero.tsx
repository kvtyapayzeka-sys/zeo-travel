import Link from 'next/link'
import { getCategories, getTours } from '@/lib/mock-data'
import { HeroSlideshow } from '@/components/kinetic/hero-slideshow'
import { Reveal } from '@/components/kinetic/reveal'

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=1200&fit=crop&q=80', alt: 'Yükseklerden Akdeniz manzarası' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&h=1200&fit=crop&q=80', alt: 'Kemer koyunda dalış' },
  { src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1800&h=1200&fit=crop&q=80', alt: 'Belek doğasında at turu' },
]

export function Ticker({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div aria-hidden="true" className="marquee overflow-hidden text-white/70">
      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-6 text-[13px] font-semibold uppercase tracking-[0.14em]">
            {t}
            <span className="text-zeo-coral">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const tours = getTours()
  const categories = getCategories()
  const tickerItems = categories.map((c) => c.name)

  return (
    <>
      {/* Hero — full-bleed slideshow, content + ticker overlaid so the ticker is visible without scrolling */}
      <section className="relative flex h-[90vh] max-h-[840px] min-h-[600px] w-full flex-col overflow-hidden bg-zeo-ink text-white">
        <HeroSlideshow images={heroImages} />
        <div className="absolute inset-0 bg-gradient-to-b from-zeo-ink/85 via-zeo-ink/20 to-zeo-ink/85" />

        <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pt-8 lg:px-12 lg:pt-12">
          <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
            <span>36.8°N 30.7°E</span>
            <span className="text-zeo-coral">·</span>
            <span>Antalya, Türkiye</span>
          </div>

          <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-12">
            <Reveal className="lg:col-span-8">
              <h1 className="font-bricolage text-[17vw] font-extrabold uppercase leading-[0.82] tracking-tight sm:text-8xl lg:text-[8.5rem]">
                Keşfet
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="max-w-xs text-[15px] leading-relaxed text-white/70">
                Tekne, paraşüt, ATV, dalış — Antalya&apos;nın rehberli
                aktiviteleri tek noktada. Etiketle, seç, ayır.
              </p>
              <span className="mt-3 inline-block rounded-full bg-zeo-lime px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
                {tours.length} aktif tur
              </span>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-zeo-ink/70 py-3 backdrop-blur-sm">
          <Ticker items={tickerItems} />
        </div>
      </section>

      {/* Discovery pills */}
      <section className="bg-zeo-ink text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-6 py-6 lg:px-12">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/turlar?kategori=${c.slug}`}
              className="rounded-full border border-white/20 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-white/70 transition-colors hover:border-zeo-coral hover:text-white"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/turlar"
            className="ml-auto flex items-center gap-1 rounded-full bg-zeo-coral px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink"
          >
            Tümü
          </Link>
        </div>
      </section>
    </>
  )
}
