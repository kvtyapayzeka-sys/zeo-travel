import Link from 'next/link'
import Image from 'next/image'
import type { PublicTour } from '@/types/public.types'
import { formatPrice } from '@/lib/utils'

const rotations = ['lg:-rotate-2', 'lg:rotate-1', 'lg:-rotate-1', 'lg:rotate-2']

interface FeaturedTourCardProps {
  tour: PublicTour
  index: number
}

export function FeaturedTourCard({ tour, index }: FeaturedTourCardProps) {
  return (
    <Link
      href={`/turlar/${tour.slug}`}
      className={`group block border-2 border-zeo-ink bg-white p-2.5 shadow-[6px_6px_0_0_#0a1420] transition-transform duration-300 hover:!rotate-0 ${rotations[index % rotations.length]}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          sizes="(max-width: 1024px) 60vw, 24vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-zeo-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
          {Math.round(tour.duration / 60)} sa
        </span>
      </div>
      <div className="border-t border-dashed border-zeo-ink/30 px-1 pt-3">
        <h3 className="text-[14px] font-bold leading-snug text-zeo-ink">{tour.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">{tour.category.name}</span>
          <span className="font-bricolage font-extrabold text-zeo-coral">{formatPrice(tour.priceAdult)}</span>
        </div>
      </div>
    </Link>
  )
}
