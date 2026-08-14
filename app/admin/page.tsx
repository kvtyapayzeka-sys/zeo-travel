import Link from 'next/link'
import { startOfMonth } from 'date-fns'
import { ArrowUpRight, CalendarClock, CircleDollarSign, Map, Users } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate, formatPrice } from '@/lib/utils'

export default async function AdminDashboardPage() {
  const monthStart = startOfMonth(new Date())
  const [
    pendingReservations,
    pendingPayments,
    activeTours,
    monthRevenue,
    recentReservations,
  ] = await Promise.all([
    prisma.reservation.count({ where: { status: 'PENDING' } }),
    prisma.payment.count({ where: { status: 'PENDING' } }),
    prisma.tour.count({ where: { status: 'ACTIVE' } }),
    prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: monthStart },
      },
      _sum: { amount: true },
    }),
    prisma.reservation.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: {
        tour: { select: { title: true } },
        payments: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: { status: true },
        },
      },
    }),
  ])

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">
            Operasyon özeti
          </p>
          <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none lg:text-5xl">
            Dashboard
          </h1>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 border-2 border-zeo-ink px-4 py-2 text-sm font-bold hover:bg-zeo-ink hover:text-white"
        >
          Siteyi aç <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Bekleyen rezervasyon"
          value={String(pendingReservations)}
          icon={CalendarClock}
        />
        <StatCard
          label="Bekleyen ödeme"
          value={String(pendingPayments)}
          icon={CircleDollarSign}
        />
        <StatCard label="Aktif tur" value={String(activeTours)} icon={Map} />
        <StatCard
          label="Bu ay tahsilat"
          value={formatPrice(Number(monthRevenue._sum.amount ?? 0))}
          icon={Users}
        />
      </section>

      <section className="mt-8 border-2 border-zeo-ink bg-white">
        <div className="flex items-center justify-between border-b-2 border-zeo-ink px-5 py-4">
          <h2 className="font-bricolage text-xl font-extrabold uppercase">
            Son rezervasyonlar
          </h2>
          <Link
            href="/admin/rezervasyonlar"
            className="text-xs font-bold uppercase tracking-[0.08em] text-zeo-coral"
          >
            Tümünü gör
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-zeo-ink/5 text-xs uppercase tracking-[0.06em] text-zeo-ink/55">
              <tr>
                <th className="px-5 py-3">Numara</th>
                <th className="px-5 py-3">Tur</th>
                <th className="px-5 py-3">Misafir</th>
                <th className="px-5 py-3">Tur tarihi</th>
                <th className="px-5 py-3">Tutar</th>
                <th className="px-5 py-3">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((reservation) => (
                <tr key={reservation.id} className="border-t border-zeo-ink/10">
                  <td className="px-5 py-4 font-mono text-xs font-semibold">
                    {reservation.reservationNumber}
                  </td>
                  <td className="px-5 py-4 font-semibold">{reservation.tour.title}</td>
                  <td className="px-5 py-4">
                    {reservation.guestFirstName} {reservation.guestLastName}
                  </td>
                  <td className="px-5 py-4">{formatDate(reservation.tourDate)}</td>
                  <td className="px-5 py-4 font-semibold">
                    {formatPrice(Number(reservation.totalAmount), reservation.currency)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
              {recentReservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-zeo-ink/50">
                    Henüz rezervasyon yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <article className="border-2 border-zeo-ink bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.07em] text-zeo-ink/50">
          {label}
        </p>
        <Icon className="h-5 w-5 text-zeo-coral" />
      </div>
      <p className="font-bricolage mt-6 text-3xl font-extrabold">{value}</p>
    </article>
  )
}

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    PENDING: 'Bekliyor',
    CONFIRMED: 'Onaylı',
    CANCELLED: 'İptal',
    COMPLETED: 'Tamamlandı',
    NO_SHOW: 'Katılmadı',
    REFUNDED: 'İade',
  }

  return (
    <span className="inline-flex border border-zeo-ink/20 bg-zeo-sand px-2 py-1 text-[11px] font-bold uppercase">
      {labels[status] ?? status}
    </span>
  )
}
