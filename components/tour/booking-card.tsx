'use client'

import { useState } from 'react'
import { Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Tour } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface BookingCardProps {
  tour: Tour
}

export function BookingCard({ tour }: BookingCardProps) {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const subtotal = adults * tour.priceAdult + children * tour.priceChild
  const bookingHref = `/rezervasyon?tur=${tour.slug}&yetiskin=${adults}&cocuk=${children}`

  return (
    <>
      {/* Desktop sticky booking card */}
      <div className="hidden lg:block">
        <div className="sticky top-24 border-2 border-zeo-ink bg-white p-6">
          <div className="mb-6 border-b border-zeo-ink/10 pb-6">
            <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">Kişi Başı</p>
            <p className="font-bricolage text-3xl font-extrabold text-zeo-coral">
              {formatPrice(tour.priceAdult)}
            </p>
          </div>

          <div className="mb-6 space-y-5">
            <div>
              <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                Tarih Seçin
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zeo-ink/40" />
                <input
                  type="date"
                  className="w-full border-2 border-zeo-ink/20 py-3 pl-10 pr-4 text-[14px] text-zeo-ink focus:border-zeo-coral focus:outline-none"
                />
              </div>
            </div>

            <Counter label="Yetişkin Sayısı" value={adults} min={1} onChange={setAdults} />

            {tour.priceChild > 0 && (
              <div>
                <Counter label="Çocuk Sayısı" value={children} min={0} onChange={setChildren} />
                <p className="mt-1 text-[12px] text-zeo-ink/50">{formatPrice(tour.priceChild)} / çocuk</p>
              </div>
            )}
          </div>

          <div className="mb-6 space-y-2 border-y border-zeo-ink/10 py-4">
            <div className="flex justify-between text-[14px]">
              <span className="text-zeo-ink/60">
                {formatPrice(tour.priceAdult)} × {adults} yetişkin
              </span>
              <span className="font-semibold text-zeo-ink">{formatPrice(tour.priceAdult * adults)}</span>
            </div>
            {children > 0 && (
              <div className="flex justify-between text-[14px]">
                <span className="text-zeo-ink/60">
                  {formatPrice(tour.priceChild)} × {children} çocuk
                </span>
                <span className="font-semibold text-zeo-ink">{formatPrice(tour.priceChild * children)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 text-[16px]">
              <span className="font-bold text-zeo-ink">Toplam</span>
              <span className="font-bricolage font-extrabold text-zeo-coral">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <Button size="lg" className="mb-4 w-full" asChild>
            <a href={bookingHref}>Rezervasyon Yap</a>
          </Button>

          <div className="flex items-center justify-center gap-2 text-[13px] text-zeo-ink/60">
            <Shield className="h-4 w-4" />
            <span>Havale ile güvenli ödeme</span>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t-2 border-zeo-ink bg-white px-5 py-3 lg:hidden">
        <div>
          <p className="text-[10px] uppercase tracking-[0.06em] text-zeo-ink/50">Kişi başı</p>
          <p className="font-bricolage text-lg font-extrabold text-zeo-coral">{formatPrice(tour.priceAdult)}</p>
        </div>
        <Button asChild>
          <a href={bookingHref}>Rezervasyon Yap</a>
        </Button>
      </div>
    </>
  )
}

function Counter({
  label,
  value,
  min,
  onChange,
}: {
  label: string
  value: number
  min: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Azalt"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-10 w-10 items-center justify-center border-2 border-zeo-ink/20 text-zeo-ink transition-colors hover:border-zeo-coral hover:text-zeo-coral"
        >
          −
        </button>
        <span className="flex-1 text-center text-[16px] font-semibold text-zeo-ink">{value}</span>
        <button
          type="button"
          aria-label="Artır"
          onClick={() => onChange(value + 1)}
          className="flex h-10 w-10 items-center justify-center border-2 border-zeo-ink/20 text-zeo-ink transition-colors hover:border-zeo-coral hover:text-zeo-coral"
        >
          +
        </button>
      </div>
    </div>
  )
}
