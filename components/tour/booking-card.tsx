'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PublicTour } from '@/types/public.types'
import { formatPrice } from '@/lib/utils'

interface BookingCardProps {
  tour: PublicTour
}

interface AvailabilityDay {
  date: string
  slots: Array<{
    time: string
    availableSpots: number
    isAvailable: boolean
    priceOverride?: number
  }>
}

export function BookingCard({ tour }: BookingCardProps) {
  const router = useRouter()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availability, setAvailability] = useState<AvailabilityDay[]>([])
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true)

  const subtotal = adults * tour.priceAdult + children * tour.priceChild
  const selectedDay = useMemo(
    () => availability.find((day) => day.date === selectedDate),
    [availability, selectedDate]
  )
  const availableSlots = selectedDay?.slots.filter((slot) => slot.isAvailable) ?? []
  const canContinue = Boolean(selectedDate && selectedTime)

  useEffect(() => {
    let cancelled = false

    async function loadAvailability() {
      try {
        const response = await fetch(`/api/tours/${tour.slug}/availability?days=30`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          throw new Error('Müsait tarihler alınamadı')
        }

        if (!cancelled) {
          const today = new Date().toISOString().slice(0, 10)
          setAvailability(
            payload.data.availability.filter(
              (day: AvailabilityDay) =>
                day.date > today && day.slots.some((slot) => slot.isAvailable)
            )
          )
        }
      } catch (error) {
        if (!cancelled) {
          setAvailabilityError(
            error instanceof Error ? error.message : 'Müsait tarihler alınamadı'
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAvailability(false)
        }
      }
    }

    loadAvailability()

    return () => {
      cancelled = true
    }
  }, [tour.slug])

  function continueToReservation() {
    if (!canContinue) {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    const params = new URLSearchParams({
      tur: tour.slug,
      tarih: selectedDate,
      saat: selectedTime,
      yetiskin: String(adults),
      cocuk: String(children),
    })
    router.push(`/rezervasyon?${params.toString()}`)
  }

  return (
    <>
      {/* Booking card */}
      <div id="booking">
        <div className="border-2 border-zeo-ink bg-white p-6 lg:sticky lg:top-24">
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
                <select
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value)
                    setSelectedTime('')
                  }}
                  disabled={isLoadingAvailability || Boolean(availabilityError)}
                  className="w-full appearance-none border-2 border-zeo-ink/20 bg-white py-3 pl-10 pr-4 text-[14px] text-zeo-ink focus:border-zeo-coral focus:outline-none disabled:opacity-50"
                >
                  <option value="">
                    {isLoadingAvailability ? 'Tarihler yükleniyor…' : 'Tarih seçin'}
                  </option>
                  {availability.map((day) => (
                    <option key={day.date} value={day.date}>
                      {new Intl.DateTimeFormat('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        weekday: 'long',
                        timeZone: 'UTC',
                      }).format(new Date(`${day.date}T00:00:00Z`))}
                    </option>
                  ))}
                </select>
              </div>
              {availabilityError && (
                <p className="mt-2 text-[12px] text-zeo-error">{availabilityError}</p>
              )}
            </div>

            {selectedDate && (
              <div>
                <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                  Saat Seçin
                </label>
                <select
                  value={selectedTime}
                  onChange={(event) => setSelectedTime(event.target.value)}
                  className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-[14px] text-zeo-ink focus:border-zeo-coral focus:outline-none"
                >
                  <option value="">Saat seçin</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.time} value={slot.time}>
                      {slot.time} · {slot.availableSpots} yer
                    </option>
                  ))}
                </select>
              </div>
            )}

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

          <Button
            size="lg"
            className="mb-4 w-full"
            disabled={!canContinue}
            onClick={continueToReservation}
          >
            Rezervasyona Devam Et
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
        <Button onClick={continueToReservation}>
          {canContinue ? 'Devam Et' : 'Tarih Seç'}
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
