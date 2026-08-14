import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { TourArchiveButton } from '@/components/admin/tour-archive-button'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export default async function ToursAdminPage() {
  const tours = await prisma.tour.findMany({
    include: {
      category: { select: { name: true } },
      _count: { select: { reservations: true, availability: true } },
    },
    orderBy: [{ status: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">Katalog</p>
          <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none lg:text-5xl">
            Turlar
          </h1>
        </div>
        <Button asChild>
          <Link href="/admin/turlar/yeni"><Plus className="mr-2 h-4 w-4" /> Yeni tur</Link>
        </Button>
      </header>

      <div className="mt-8 overflow-x-auto border-2 border-zeo-ink bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-zeo-ink text-xs uppercase tracking-[0.06em] text-white/65">
            <tr>
              <th className="px-5 py-3">Tur</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Fiyat</th>
              <th className="px-5 py-3">Kapasite</th>
              <th className="px-5 py-3">Rezervasyon</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-t border-zeo-ink/10">
                <td className="px-5 py-4">
                  <p className="font-semibold">{tour.title}</p>
                  <p className="font-mono text-[11px] text-zeo-ink/40">{tour.slug}</p>
                </td>
                <td className="px-5 py-4">{tour.category.name}</td>
                <td className="px-5 py-4 font-semibold">
                  {formatPrice(Number(tour.priceAdult), tour.currency)}
                </td>
                <td className="px-5 py-4">{tour.maxCapacity}</td>
                <td className="px-5 py-4">{tour._count.reservations}</td>
                <td className="px-5 py-4">
                  <span className="border border-zeo-ink/20 bg-zeo-sand px-2 py-1 text-[11px] font-bold uppercase">
                    {tourStatusLabel(tour.status)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/turlar/${tour.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Düzenle</span>
                      </Link>
                    </Button>
                    {tour.status !== 'ARCHIVED' && (
                      <TourArchiveButton tourId={tour.id} title={tour.title} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function tourStatusLabel(status: string) {
  return { ACTIVE: 'Aktif', INACTIVE: 'Pasif', ARCHIVED: 'Arşiv' }[status] ?? status
}
