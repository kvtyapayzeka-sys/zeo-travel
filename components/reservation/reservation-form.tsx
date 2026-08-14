'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import type { PublicTour } from '@/types/public.types'

interface ReservationFormProps {
  tour: PublicTour
  tourDate: string
  timeSlot: string
  initialAdults: number
  initialChildren: number
}

export function ReservationForm({
  tour,
  tourDate,
  timeSlot,
  initialAdults,
  initialChildren,
}: ReservationFormProps) {
  const router = useRouter()
  const [adultCount, setAdultCount] = useState(initialAdults)
  const [childCount, setChildCount] = useState(initialChildren)
  const [infantCount, setInfantCount] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const total =
    adultCount * tour.priceAdult +
    childCount * tour.priceChild +
    infantCount * tour.priceInfant

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourDate,
          timeSlot,
          adultCount,
          childCount,
          infantCount,
          customerInfo: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.replace(/[\s()-]/g, ''),
          },
          pickupLocation: pickupLocation.trim() || undefined,
          specialRequests: specialRequests.trim() || undefined,
          referralSource: 'direct',
        }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Rezervasyon oluşturulamadı')
      }

      const params = new URLSearchParams({ email: email.trim().toLowerCase() })
      router.push(
        `/rezervasyon/${payload.data.reservationNumber}?${params.toString()}`
      )
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Rezervasyon oluşturulamadı'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <section className="border-2 border-zeo-ink bg-white p-6">
          <h2 className="font-bricolage text-2xl font-extrabold uppercase text-zeo-ink">
            İletişim bilgileri
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Ad">
              <input
                required
                minLength={2}
                maxLength={50}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className={inputClassName}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Soyad">
              <input
                required
                minLength={2}
                maxLength={50}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className={inputClassName}
                autoComplete="family-name"
              />
            </Field>
            <Field label="E-posta">
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClassName}
                autoComplete="email"
              />
            </Field>
            <Field label="Telefon">
              <input
                required
                type="tel"
                placeholder="+905xxxxxxxxx"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={inputClassName}
                autoComplete="tel"
              />
            </Field>
          </div>
        </section>

        <section className="border-2 border-zeo-ink bg-white p-6">
          <h2 className="font-bricolage text-2xl font-extrabold uppercase text-zeo-ink">
            Katılımcılar
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <CountField label="Yetişkin" value={adultCount} min={1} max={50} onChange={setAdultCount} />
            <CountField label="Çocuk" value={childCount} min={0} max={50} onChange={setChildCount} />
            <CountField label="Bebek" value={infantCount} min={0} max={10} onChange={setInfantCount} />
          </div>
        </section>

        <section className="border-2 border-zeo-ink bg-white p-6">
          <h2 className="font-bricolage text-2xl font-extrabold uppercase text-zeo-ink">
            Tur notları
          </h2>
          <div className="mt-6 space-y-5">
            <Field label="Alınış noktası / otel (opsiyonel)">
              <input
                maxLength={200}
                value={pickupLocation}
                onChange={(event) => setPickupLocation(event.target.value)}
                className={inputClassName}
              />
            </Field>
            <Field label="Özel talepler (opsiyonel)">
              <textarea
                maxLength={500}
                rows={4}
                value={specialRequests}
                onChange={(event) => setSpecialRequests(event.target.value)}
                className={inputClassName}
              />
            </Field>
          </div>
        </section>
      </div>

      <aside className="h-fit border-2 border-zeo-ink bg-white p-6 lg:sticky lg:top-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zeo-coral">
          Rezervasyon özeti
        </p>
        <h2 className="mt-2 text-lg font-bold text-zeo-ink">{tour.title}</h2>
        <dl className="mt-6 space-y-3 border-y border-zeo-ink/10 py-5 text-sm">
          <SummaryRow label="Tarih" value={formatTourDate(tourDate)} />
          <SummaryRow label="Saat" value={timeSlot} />
          <SummaryRow label="Yetişkin" value={`${adultCount} kişi`} />
          {childCount > 0 && <SummaryRow label="Çocuk" value={`${childCount} kişi`} />}
          {infantCount > 0 && <SummaryRow label="Bebek" value={`${infantCount} kişi`} />}
        </dl>
        <div className="mt-5 flex items-end justify-between">
          <span className="font-bold text-zeo-ink">Toplam</span>
          <span className="font-bricolage text-2xl font-extrabold text-zeo-coral">
            {formatPrice(total, tour.currency)}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zeo-ink/55">
          Rezervasyon talebi havale ödemesi onaylanana kadar beklemede tutulur.
        </p>
        {submitError && (
          <p role="alert" className="mt-4 border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">
            {submitError}
          </p>
        )}
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor…' : 'Rezervasyon Talebi Oluştur'}
        </Button>
      </aside>
    </form>
  )
}

const inputClassName =
  'w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-[14px] text-zeo-ink outline-none transition-colors focus:border-zeo-coral'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
        {label}
      </span>
      {children}
    </label>
  )
}

function CountField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        required
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={inputClassName}
      />
    </Field>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-zeo-ink/55">{label}</dt>
      <dd className="font-semibold text-zeo-ink">{value}</dd>
    </div>
  )
}

function formatTourDate(date: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}
