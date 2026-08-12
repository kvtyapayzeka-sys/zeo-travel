import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Star, Users, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zeo-neutral-50 via-white to-zeo-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-7 stagger-children order-2 lg:order-1">
            <div className="space-y-5">
              <p className="text-caption uppercase tracking-[0.2em] text-zeo-primary-600 font-semibold">
                Zeo Travel
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-zeo-neutral-900 leading-[1.1]">
                Antalya&apos;da unutulmaz{' '}
                <span className="text-zeo-accent-500 relative inline-block">
                  maceralar
                  <svg
                    className="absolute -bottom-1 left-0 w-full text-zeo-accent-500/40"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    aria-hidden="true"
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
              <p className="text-body-lg text-zeo-neutral-600 max-w-xl">
                Tekne turu, parasailing, ATV safari ve yamaç paraşütü — güvenli
                rehberlikle Antalya&apos;nın en iyi aktivitelerini keşfedin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/turlar">Turları Keşfet</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/iletisim">Bizi Arayın</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 max-w-lg">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zeo-success/10 shrink-0">
                  <Users className="h-5 w-5 text-zeo-success" />
                </div>
                <div>
                  <p className="text-body font-bold text-zeo-neutral-900">10.000+</p>
                  <p className="text-caption text-zeo-neutral-600">Mutlu misafir</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zeo-accent-500/10 shrink-0">
                  <Star className="h-5 w-5 text-zeo-accent-500" />
                </div>
                <div>
                  <p className="text-body font-bold text-zeo-neutral-900">4.9/5</p>
                  <p className="text-caption text-zeo-neutral-600">Ortalama puan</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zeo-primary-500/10 shrink-0">
                  <Shield className="h-5 w-5 text-zeo-primary-600" />
                </div>
                <div>
                  <p className="text-body font-bold text-zeo-neutral-900">Güvenli</p>
                  <p className="text-caption text-zeo-neutral-600">Havale / EFT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] max-h-[560px] mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl bg-zeo-neutral-200">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&h=1125&fit=crop&q=80"
                alt="Antalya tekne turu"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

              <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-zeo-accent-500 text-zeo-accent-500" />
                      ))}
                    </div>
                    <p className="text-body font-semibold text-zeo-neutral-900">4.9 ortalama</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h4 font-bold text-zeo-primary-600">Günlük</p>
                    <p className="text-caption text-zeo-neutral-600">tur seçenekleri</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 bg-zeo-accent-500/20 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 w-44 h-44 bg-zeo-primary-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
