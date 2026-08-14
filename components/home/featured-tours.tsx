import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/kinetic/reveal'
import { FeaturedTourCard } from './featured-tour-card'
import type { PublicTour } from '@/types/public.types'

export function FeaturedTours({ tours }: { tours: PublicTour[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
      <Reveal>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-zeo-coral">Öne Çıkanlar</p>
        <div className="mb-14 flex items-end justify-between gap-4">
          <h2 className="font-bricolage text-4xl font-extrabold uppercase leading-none text-zeo-ink lg:text-6xl">
            Bu hafta sahada
          </h2>
          <Link
            href="/turlar"
            className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-zeo-ink hover:text-zeo-coral md:flex"
          >
            Tümü <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>

      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0">
        {tours.map((tour, i) => (
          <Reveal
            key={tour.id}
            delay={i * 0.06}
            className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto"
          >
            <FeaturedTourCard tour={tour} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/turlar"
          className="inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-zeo-ink"
        >
          Tüm turları gör <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
