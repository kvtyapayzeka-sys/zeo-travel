import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-zeo-neutral-50 via-white to-zeo-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Content (60%) */}
          <div className="lg:col-span-3 space-y-8 stagger-children">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-display-xl font-bold text-zeo-neutral-900 leading-tight">
                Antalya&apos;da Unutulmaz{' '}
                <span className="text-zeo-accent-500 relative">
                  Maceralar
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-zeo-accent-500/30"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 7C50 2 150 2 200 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-body-lg text-zeo-neutral-600 max-w-2xl">
                Tekne turlarından yamaç paraşütüne, güvenli ve profesyonel rehberlik ile 
                deneyimlememiş olduğunuz bir Antalya keşfedin.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/turlar">
                  Turları Keşfet →
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/iletisim">
                  İletişim
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zeo-success/10">
                  <Users className="h-6 w-6 text-zeo-success" />
                </div>
                <div>
                  <p className="text-h4 font-bold text-zeo-neutral-900">10,000+</p>
                  <p className="text-caption text-zeo-neutral-600">Mutlu Müşteri</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zeo-accent-500/10">
                  <Star className="h-6 w-6 text-zeo-accent-500" />
                </div>
                <div>
                  <p className="text-h4 font-bold text-zeo-neutral-900">4.9/5</p>
                  <p className="text-caption text-zeo-neutral-600">Ortalama Puan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zeo-primary-500/10">
                  <Shield className="h-6 w-6 text-zeo-primary-600" />
                </div>
                <div>
                  <p className="text-h4 font-bold text-zeo-neutral-900">%100</p>
                  <p className="text-caption text-zeo-neutral-600">Güvenli Ödeme</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image (40%) */}
          <div className="lg:col-span-2 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop&q=80"
                alt="Antalya Tekne Turu"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-zeo-accent-500 text-zeo-accent-500" />
                      ))}
                    </div>
                    <p className="text-body font-semibold text-zeo-neutral-900">4.9 Ortalama</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h4 font-bold text-zeo-primary-600">500+</p>
                    <p className="text-caption text-zeo-neutral-600">Tur Seçeneği</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-zeo-accent-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-zeo-primary-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
