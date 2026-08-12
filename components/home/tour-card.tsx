import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Clock, Users } from 'lucide-react'
import type { Tour } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const hours = Math.max(1, Math.floor(tour.duration / 60))

  return (
    <div className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-zeo-neutral-200">
      <Image
        src={tour.images[0]}
        alt={tour.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {tour.isHighlighted && (
        <Badge variant="accent" className="absolute top-4 right-4 z-10">
          Popüler
        </Badge>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-10 bg-white rounded-2xl p-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-h4 text-zeo-neutral-900 mb-2 line-clamp-2">
          {tour.title}
        </h3>

        <div className="flex items-center gap-4 mb-3 text-body-sm text-zeo-neutral-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{hours} saat</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {tour.maxCapacity}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(tour.rating)
                    ? 'fill-zeo-accent-500 text-zeo-accent-500'
                    : 'text-zeo-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-body-sm font-semibold text-zeo-neutral-900">
            {tour.rating}
          </span>
          <span className="text-body-sm text-zeo-neutral-600">
            ({tour.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-caption text-zeo-neutral-500">Kişi başı</p>
            <p className="text-h3 font-space font-bold text-zeo-primary-600">
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
