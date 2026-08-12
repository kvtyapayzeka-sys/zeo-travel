import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TourCard } from './tour-card'
import { getHighlightedTours } from '@/lib/mock-data'

export function FeaturedTours() {
  const tours = getHighlightedTours()

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-h1 font-bold text-zeo-neutral-900 mb-2">
              Öne Çıkan Turlar
            </h2>
            <p className="text-body-lg text-zeo-neutral-600 max-w-2xl">
              En çok tercih edilen ve müşterilerimizin favorisi turlarımızı keşfedin
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/turlar">
              Tümünü Gör →
            </Link>
          </Button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/turlar">
              Tüm Turları Gör →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
