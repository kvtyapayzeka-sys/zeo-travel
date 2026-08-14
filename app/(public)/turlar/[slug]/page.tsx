import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { BookingCard } from '@/components/tour/booking-card'
import { getPublicTourBySlug, getPublicTours } from '@/lib/data/public'
import { Clock, Users, Check, X } from 'lucide-react'
import { TourSchema } from '@/components/seo/json-ld'

export const revalidate = 300

export async function generateStaticParams() {
  const tours = await getPublicTours()
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = await getPublicTourBySlug(params.slug)

  if (!tour) {
    return {
      title: 'Tur Bulunamadı',
    }
  }

  return {
    title: `${tour.title} | Zeo Travel`,
    description: tour.description.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [{ url: tour.images[0] }],
    },
  }
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = await getPublicTourBySlug(params.slug)

  if (!tour) {
    notFound()
  }

  const hours = Math.floor(tour.duration / 60)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zeotravel.com'

  return (
    <>
      <TourSchema tour={tour} url={`${baseUrl}/turlar/${tour.slug}`} />
      <div className="bg-zeo-sand pb-28 pt-12 lg:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-4 aspect-[16/9] overflow-hidden border-2 border-zeo-ink md:col-span-3">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:col-span-1 md:grid md:gap-3">
              {tour.images.slice(1, 3).map((image, i) => (
                <div key={i} className="aspect-square overflow-hidden border-2 border-zeo-ink">
                  <img
                    src={image}
                    alt={`${tour.title} ${i + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {tour.images.length > 3 && (
                <button className="group relative aspect-square overflow-hidden border-2 border-zeo-ink">
                  <img
                    src={tour.images[3] || tour.images[0]}
                    alt="Diğer fotoğraflar"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-zeo-ink/70">
                    <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-white">
                      +{tour.images.length - 3} Fotoğraf
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="default">{tour.category.name}</Badge>
                {tour.isHighlighted && <Badge variant="accent">Popüler</Badge>}
              </div>
              <h1 className="font-bricolage text-3xl font-extrabold uppercase leading-[0.95] text-zeo-ink lg:text-5xl">
                {tour.title}
              </h1>

              {/* Meta Info */}
              <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-zeo-ink/10 py-5">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-zeo-coral" />
                  <span className="text-[14px] font-semibold text-zeo-ink">{hours} saat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-zeo-coral" />
                  <span className="text-[14px] font-semibold text-zeo-ink">Maks {tour.maxCapacity} kişi</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
                Tur Hakkında
              </h2>
              <p className="text-[15px] leading-relaxed text-zeo-ink/70">
                {tour.description}
              </p>
            </div>

            {/* Included/Excluded */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
                  Neler Dahil
                </h3>
                <ul className="space-y-2.5">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-zeo-ink/70">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-zeo-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
                  Neler Dahil Değil
                </h3>
                <ul className="space-y-2.5">
                  {tour.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-zeo-ink/70">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-zeo-ink/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
                Özellikler
              </h3>
              <div className="flex flex-wrap gap-2">
                {tour.features.map((feature, i) => (
                  <span
                    key={i}
                    className="rounded-full border-2 border-zeo-ink px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-zeo-ink"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking */}
          <div className="lg:col-span-1">
            <BookingCard tour={tour} />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
