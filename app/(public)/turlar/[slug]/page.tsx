import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getTourBySlug, getTours } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Check, 
  X, 
  Calendar,
  Shield 
} from 'lucide-react'

export async function generateStaticParams() {
  const tours = getTours()
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug)
  
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

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug)

  if (!tour) {
    notFound()
  }

  const hours = Math.floor(tour.duration / 60)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:grid md:col-span-1 gap-4">
              {tour.images.slice(1, 3).map((image, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt={`${tour.title} ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {tour.images.length > 3 && (
                <button className="relative aspect-square rounded-xl overflow-hidden group">
                  <img
                    src={tour.images[3] || tour.images[0]}
                    alt="More photos"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold">
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
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default">{tour.category.name}</Badge>
                {tour.isHighlighted && (
                  <Badge variant="accent">Popüler</Badge>
                )}
              </div>
              <h1 className="text-h1 font-bold text-zeo-neutral-900 mb-4">
                {tour.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-zeo-neutral-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-zeo-primary-500" />
                  <span className="text-body font-semibold">
                    {hours} saat
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-zeo-primary-500" />
                  <span className="text-body font-semibold">
                    Max {tour.maxCapacity} kişi
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(tour.rating)
                            ? 'fill-zeo-accent-500 text-zeo-accent-500'
                            : 'text-zeo-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-body font-semibold">
                    {tour.rating} ({tour.reviewCount} yorum)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-h3 font-semibold text-zeo-neutral-900 mb-4">
                Tur Hakkında
              </h2>
              <p className="text-body text-zeo-neutral-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Included/Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zeo-success/10">
                    <Check className="h-5 w-5 text-zeo-success" />
                  </div>
                  Neler Dahil
                </h3>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-zeo-success mt-0.5 flex-shrink-0" />
                      <span className="text-body text-zeo-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zeo-error/10">
                    <X className="h-5 w-5 text-zeo-error" />
                  </div>
                  Neler Dahil Değil
                </h3>
                <ul className="space-y-2">
                  {tour.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-zeo-error mt-0.5 flex-shrink-0" />
                      <span className="text-body text-zeo-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-h3 font-semibold text-zeo-neutral-900 mb-4">
                Özellikler
              </h3>
              <div className="flex flex-wrap gap-2">
                {tour.features.map((feature, i) => (
                  <Badge key={i} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-2xl p-6 border-2 border-zeo-neutral-200">
              <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-zeo-neutral-200">
                <div>
                  <p className="text-caption text-zeo-neutral-500 mb-1">Kişi Başı</p>
                  <p className="text-display-lg font-space font-bold text-zeo-primary-600">
                    {formatPrice(tour.priceAdult)}
                  </p>
                </div>
                {tour.isHighlighted && (
                  <Badge variant="success">
                    %10 İndirim
                  </Badge>
                )}
              </div>

              {/* Tarih Seçimi */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-body-sm font-semibold text-zeo-neutral-700 mb-2">
                    Tarih Seçin
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zeo-neutral-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-semibold text-zeo-neutral-700 mb-2">
                    Yetişkin Sayısı
                  </label>
                  <div className="flex items-center gap-4">
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-50 transition">
                      -
                    </button>
                    <input
                      type="number"
                      value="2"
                      className="flex-1 text-center px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
                      min="1"
                    />
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-50 transition">
                      +
                    </button>
                  </div>
                </div>

                {tour.priceChild > 0 && (
                  <div>
                    <label className="block text-body-sm font-semibold text-zeo-neutral-700 mb-2">
                      Çocuk Sayısı
                    </label>
                    <div className="flex items-center gap-4">
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-50 transition">
                        -
                      </button>
                      <input
                        type="number"
                        value="0"
                        className="flex-1 text-center px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
                        min="0"
                      />
                      <button className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-50 transition">
                        +
                      </button>
                    </div>
                    <p className="text-caption text-zeo-neutral-600 mt-1">
                      {formatPrice(tour.priceChild)} / çocuk
                    </p>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 py-4 border-y border-zeo-neutral-200 mb-6">
                <div className="flex justify-between text-body">
                  <span className="text-zeo-neutral-600">
                    {formatPrice(tour.priceAdult)} x 2 kişi
                  </span>
                  <span className="font-semibold">
                    {formatPrice(tour.priceAdult * 2)}
                  </span>
                </div>
                {tour.isHighlighted && (
                  <div className="flex justify-between text-body">
                    <span className="text-zeo-neutral-600">Erken rezervasyon indirimi</span>
                    <span className="text-zeo-success font-semibold">
                      -{formatPrice((tour.priceAdult * 2) * 0.1)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-h4 pt-2">
                  <span className="font-semibold">Toplam</span>
                  <span className="text-zeo-primary-600 font-space font-bold">
                    {formatPrice(tour.priceAdult * 2 * 0.9)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="w-full mb-4"
                asChild
              >
                <a href={`/rezervasyon?tur=${tour.slug}`}>
                  Rezervasyon Yap →
                </a>
              </Button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-body-sm text-zeo-neutral-600">
                <Shield className="h-5 w-5 text-zeo-success" />
                <span>Güvenli ödeme - Ücretsiz iptal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
