import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ReservationForm } from '@/components/reservation/reservation-form'
import { getPublicTourBySlug } from '@/lib/data/public'

export const metadata: Metadata = {
  title: 'Rezervasyon Talebi',
  description: 'Seçtiğiniz tur için rezervasyon talebinizi oluşturun.',
  robots: { index: false, follow: false },
}

interface ReservationPageProps {
  searchParams: {
    tur?: string
    tarih?: string
    saat?: string
    yetiskin?: string
    cocuk?: string
  }
}

export default async function ReservationPage({
  searchParams,
}: ReservationPageProps) {
  if (!searchParams.tur) {
    redirect('/turlar')
  }

  const tour = await getPublicTourBySlug(searchParams.tur)

  if (!tour) {
    notFound()
  }

  const dateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(searchParams.tarih ?? '')
  const timeIsValid = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(
    searchParams.saat ?? ''
  )

  if (!dateIsValid || !timeIsValid) {
    redirect(`/turlar/${tour.slug}#booking`)
  }

  const adults = clampCount(searchParams.yetiskin, 1, 50, 1)
  const children = clampCount(searchParams.cocuk, 0, 50, 0)

  return (
    <div className="bg-zeo-sand py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-10 max-w-3xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-zeo-coral">
            Güvenli rezervasyon
          </p>
          <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none text-zeo-ink lg:text-6xl">
            Bilgilerini tamamla
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zeo-ink/60">
            Talebin kaydedildikten sonra ödeme durumu beklemede olarak oluşturulur.
          </p>
        </div>

        <ReservationForm
          tour={tour}
          tourDate={searchParams.tarih!}
          timeSlot={searchParams.saat!}
          initialAdults={adults}
          initialChildren={children}
        />
      </div>
    </div>
  )
}

function clampCount(
  rawValue: string | undefined,
  min: number,
  max: number,
  fallback: number
) {
  const parsed = Number.parseInt(rawValue ?? '', 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}
