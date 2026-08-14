'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

interface ReservationResult {
  reservationNumber: string
  status: string
  tourDate: string
  timeSlot: string
  adultCount: number
  childCount: number
  infantCount: number
  totalAmount: number
  currency: string
  tour: {
    title: string
    slug: string
    images: string[]
  }
  paymentInstructions: {
    reference: string
    bankAccounts: Array<{
      bankName?: string
      iban?: string
      accountHolder?: string
    }>
  }
}

export default function ReservationResultPage({
  params,
  searchParams,
}: {
  params: { number: string }
  searchParams: { email?: string }
}) {
  const email = searchParams.email ?? null
  const [reservation, setReservation] = useState<ReservationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!email) {
      setError('Rezervasyonu görüntülemek için e-posta doğrulaması gerekiyor.')
      return
    }

    let cancelled = false

    async function loadReservation() {
      try {
        const query = new URLSearchParams({ email: email! })
        const response = await fetch(
          `/api/reservations/${encodeURIComponent(params.number)}?${query.toString()}`
        )
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          throw new Error(payload.error?.message ?? 'Rezervasyon bulunamadı')
        }

        if (!cancelled) {
          setReservation(payload.data)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error ? loadError.message : 'Rezervasyon bulunamadı'
          )
        }
      }
    }

    loadReservation()
    return () => {
      cancelled = true
    }
  }, [email, params.number])

  if (error) {
    return (
      <ResultShell>
        <h1 className="font-bricolage text-3xl font-extrabold uppercase text-zeo-ink">
          Rezervasyon görüntülenemedi
        </h1>
        <p className="mt-4 text-sm text-zeo-ink/60">{error}</p>
        <Button asChild className="mt-6">
          <Link href="/turlar">Turlara dön</Link>
        </Button>
      </ResultShell>
    )
  }

  if (!reservation) {
    return (
      <ResultShell>
        <p className="text-sm text-zeo-ink/60">Rezervasyon yükleniyor…</p>
      </ResultShell>
    )
  }

  const bankAccounts = reservation.paymentInstructions.bankAccounts

  return (
    <ResultShell>
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-zeo-coral">
        Talep kaydedildi
      </p>
      <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none text-zeo-ink">
        {reservation.reservationNumber}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zeo-ink/60">
        Rezervasyonunuz şu anda ödeme onayı bekliyor. İşlemlerde açıklama olarak
        rezervasyon numarasını kullanın.
      </p>

      <dl className="mt-8 grid gap-4 border-y border-zeo-ink/10 py-6 sm:grid-cols-2">
        <ResultRow label="Tur" value={reservation.tour.title} />
        <ResultRow label="Durum" value={statusLabel(reservation.status)} />
        <ResultRow label="Tarih" value={formatDate(reservation.tourDate)} />
        <ResultRow label="Saat" value={reservation.timeSlot} />
        <ResultRow
          label="Katılımcı"
          value={`${reservation.adultCount + reservation.childCount + reservation.infantCount} kişi`}
        />
        <ResultRow
          label="Toplam"
          value={formatPrice(reservation.totalAmount, reservation.currency)}
        />
      </dl>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-zeo-ink">
          Havale bilgileri
        </h2>
        {bankAccounts.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {bankAccounts.map((account, index) => (
              <div key={`${account.iban}-${index}`} className="border-2 border-zeo-ink/15 p-4">
                <p className="font-bold text-zeo-ink">{account.bankName}</p>
                <p className="mt-2 break-all font-mono text-sm text-zeo-ink">
                  {account.iban}
                </p>
                <p className="mt-1 text-xs text-zeo-ink/55">{account.accountHolder}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 border border-zeo-ink/15 bg-zeo-sand p-4 text-sm text-zeo-ink/60">
            Banka hesap bilgileri henüz sistemde tanımlı değil. Rezervasyon
            numaranızı saklayın.
          </p>
        )}
      </section>
    </ResultShell>
  )
}

function ResultShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zeo-sand py-16">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <div className="border-2 border-zeo-ink bg-white p-6 shadow-[8px_8px_0_0_#0a1420] sm:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.08em] text-zeo-ink/45">{label}</dt>
      <dd className="mt-1 font-semibold text-zeo-ink">{value}</dd>
    </div>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: 'Ödeme bekliyor',
    CONFIRMED: 'Onaylandı',
    CANCELLED: 'İptal edildi',
    COMPLETED: 'Tamamlandı',
    NO_SHOW: 'Katılım olmadı',
    REFUNDED: 'İade edildi',
  }
  return labels[status] ?? status
}
