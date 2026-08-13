import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users } from 'lucide-react'
import type { Tour } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const hours = Math.max(1, Math.floor(tour.duration / 60))

  return (
    <div className="group overflow-hidden border-2 border-zeo-ink bg-white transition-shadow duration-200 hover:shadow-[6px_6px_0_0_#0a1420]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-zeo-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
          {hours} sa
        </span>
        {tour.isHighlighted && (
          <Badge variant="accent" className="absolute right-3 top-3">
            Popüler
          </Badge>
        )}
      </div>

      <div className="p-4">
        <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">{tour.category.name}</p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-zeo-ink">
          {tour.title}
        </h3>

        <div className="mt-2 flex items-center gap-4 text-[12px] text-zeo-ink/60">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {hours} saat
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            Maks {tour.maxCapacity}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-zeo-ink/10 pt-4">
          <div>
            <p className="text-[11px] text-zeo-ink/50">Kişi başı</p>
            <p className="font-bricolage text-xl font-extrabold text-zeo-coral">
              {formatPrice(tour.priceAdult)}
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href={`/turlar/${tour.slug}`}>İncele</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
