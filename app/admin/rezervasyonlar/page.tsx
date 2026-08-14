import type { ReservationStatus } from '@prisma/client'
import { Search } from 'lucide-react'
import { PaymentApproveButton } from '@/components/admin/payment-approve-button'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatDate, formatPrice } from '@/lib/utils'

const reservationStatuses: ReservationStatus[] = [
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'NO_SHOW',
  'REFUNDED',
]

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string }
}) {
  const status = reservationStatuses.includes(
    searchParams.status as ReservationStatus
  )
    ? (searchParams.status as ReservationStatus)
    : undefined
  const search = searchParams.search?.trim()

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { reservationNumber: { contains: search, mode: 'insensitive' as const } },
              { guestEmail: { contains: search, mode: 'insensitive' as const } },
              { guestPhone: { contains: search } },
              { guestFirstName: { contains: search, mode: 'insensitive' as const } },
              { guestLastName: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    },
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: {
      tour: { select: { title: true, slug: true } },
      payments: {
        take: 1,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return (
    <div>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">
          Operasyon
        </p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none lg:text-5xl">
          Rezervasyonlar
        </h1>
      </header>

      <form className="mt-8 grid gap-3 border-2 border-zeo-ink bg-white p-4 md:grid-cols-[1fr_220px_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zeo-ink/40" />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Numara, e-posta, telefon veya isim"
            className="w-full border-2 border-zeo-ink/15 py-3 pl-10 pr-4 text-sm outline-none focus:border-zeo-coral"
          />
        </label>
        <select
          name="status"
          defaultValue={status ?? ''}
          className="border-2 border-zeo-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral"
        >
          <option value="">Tüm durumlar</option>
          {reservationStatuses.map((item) => (
            <option key={item} value={item}>{statusLabel(item)}</option>
          ))}
        </select>
        <Button type="submit">Filtrele</Button>
      </form>

      <div className="mt-6 space-y-4">
        {reservations.map((reservation) => {
          const payment = reservation.payments[0]

          return (
            <article key={reservation.id} className="border-2 border-zeo-ink bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zeo-ink/10 px-5 py-4">
                <div>
                  <p className="font-mono text-xs font-bold text-zeo-coral">
                    {reservation.reservationNumber}
                  </p>
                  <h2 className="mt-1 font-bold text-zeo-ink">{reservation.tour.title}</h2>
                </div>
                <span className="border border-zeo-ink/20 bg-zeo-sand px-3 py-1.5 text-xs font-bold uppercase">
                  {statusLabel(reservation.status)}
                </span>
              </div>

              <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 xl:grid-cols-5">
                <Info
                  label="Misafir"
                  value={`${reservation.guestFirstName ?? ''} ${reservation.guestLastName ?? ''}`.trim() || '—'}
                />
                <Info
                  label="İletişim"
                  value={`${reservation.guestEmail ?? '—'} · ${reservation.guestPhone ?? '—'}`}
                />
                <Info
                  label="Tur zamanı"
                  value={`${formatDate(reservation.tourDate)} · ${reservation.timeSlot}`}
                />
                <Info
                  label="Katılımcı"
                  value={`${reservation.totalParticipants} kişi`}
                />
                <Info
                  label="Toplam"
                  value={formatPrice(Number(reservation.totalAmount), reservation.currency)}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zeo-ink/10 bg-zeo-ink/[0.025] px-5 py-4">
                <p className="text-xs text-zeo-ink/55">
                  Ödeme: {payment ? paymentStatusLabel(payment.status) : 'Kayıt yok'}
                </p>
                {payment?.status === 'PENDING' && reservation.status === 'PENDING' && (
                  <PaymentApproveButton
                    paymentId={payment.id}
                    reservationNumber={reservation.reservationNumber}
                  />
                )}
              </div>
            </article>
          )
        })}

        {reservations.length === 0 && (
          <div className="border-2 border-dashed border-zeo-ink/20 py-16 text-center text-sm text-zeo-ink/50">
            Filtreye uygun rezervasyon bulunamadı.
          </div>
        )}
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-zeo-ink/40">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-zeo-ink">{value}</p>
    </div>
  )
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: 'Bekliyor',
    CONFIRMED: 'Onaylı',
    CANCELLED: 'İptal',
    COMPLETED: 'Tamamlandı',
    NO_SHOW: 'Katılmadı',
    REFUNDED: 'İade',
  }
  return labels[status] ?? status
}

function paymentStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: 'Bekliyor',
    PROCESSING: 'İşleniyor',
    COMPLETED: 'Tamamlandı',
    FAILED: 'Başarısız',
    REFUNDED: 'İade',
    PARTIALLY_REFUNDED: 'Kısmi iade',
  }
  return labels[status] ?? status
}
