import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Hero, Ticker } from '@/components/home/hero'
import { FeaturedTours } from '@/components/home/featured-tours'
import { Categories } from '@/components/home/categories'
import { getCategories } from '@/lib/mock-data'
import { Reveal } from '@/components/kinetic/reveal'

export const metadata = {
  title: 'Zeo Travel - Antalya Turları ve Aktiviteleri',
  description: 'Antalya\'nın en güvenilir turizm acentası. Tekne turları, yamaç paraşütü, ATV safari ve daha fazlası. Profesyonel rehberlik ve güvenli turlar.',
}

const coords = [
  { name: 'Kemer', lat: '36.60°N', lon: '30.56°E', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&h=700&fit=crop&q=80' },
  { name: 'Alanya', lat: '36.54°N', lon: '31.99°E', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=700&fit=crop&q=80' },
  { name: 'Side', lat: '36.77°N', lon: '31.39°E', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&h=700&fit=crop&q=80' },
  { name: 'Belek', lat: '36.86°N', lon: '31.06°E', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=700&h=700&fit=crop&q=80' },
  { name: 'Kaş', lat: '36.20°N', lon: '29.64°E', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&h=700&fit=crop&q=80' },
]

export default function Home() {
  const categories = getCategories()
  const tickerItems = categories.map((c) => c.name)

  return (
    <>
      <Hero />
      <FeaturedTours />
      <Categories />

      {/* Destination coordinate tags */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <h2 className="font-bricolage mb-10 text-3xl font-extrabold uppercase leading-none text-zeo-ink lg:text-5xl">
            Saha koordinatları
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {coords.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.05}>
              <div className="border-2 border-zeo-ink bg-white p-2">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image src={d.image} alt={d.name} fill sizes="(max-width: 1024px) 40vw, 18vw" className="object-cover" />
                </div>
                <p className="font-bricolage mt-2 text-sm font-extrabold uppercase text-zeo-ink">{d.name}</p>
                <p className="text-[11px] text-zeo-ink/50">{d.lat} {d.lon}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust — briefing tags */}
      <section className="border-y-2 border-zeo-ink bg-zeo-sand">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 px-6 py-10 lg:px-12">
          {[
            'Rehberli / profesyonel ekip',
            'Ekipman dahil',
            'Havale ile güvenli ödeme',
            'Rezervasyon sonrası e-posta onayı',
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-zeo-ink bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-zeo-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-zeo-ink py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <h2 className="font-bricolage max-w-3xl text-5xl font-extrabold uppercase leading-[0.9] lg:text-7xl">
              Tarihi seç, <span className="text-zeo-coral">rotayı çiz.</span>
            </h2>
            <Link
              href="/turlar"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-zeo-coral px-8 py-4 text-[14px] font-bold uppercase tracking-[0.06em] text-zeo-ink transition-transform hover:scale-105"
            >
              Turları görüntüle <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 border-y border-white/10 py-3">
          <Ticker items={tickerItems} />
        </div>
      </section>
    </>
  )
}
