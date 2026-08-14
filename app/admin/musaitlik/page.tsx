import { AvailabilityManager } from '@/components/admin/availability-manager'
import { prisma } from '@/lib/prisma'

export default async function AvailabilityAdminPage({
  searchParams,
}: {
  searchParams: { tourId?: string }
}) {
  const tours = await prisma.tour.findMany({
    where: { status: { not: 'ARCHIVED' } },
    select: { id: true, title: true, maxCapacity: true },
    orderBy: [{ status: 'asc' }, { sortOrder: 'asc' }],
  })
  const selectedTourId = tours.some((tour) => tour.id === searchParams.tourId)
    ? searchParams.tourId!
    : tours[0]?.id

  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const slots = selectedTourId
    ? await prisma.tourAvailability.findMany({
        where: { tourId: selectedTourId, date: { gte: today } },
        orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
        take: 500,
      })
    : []

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">Planlama</p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none lg:text-5xl">
          Müsaitlik
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zeo-ink/55">
          Gelecek tarihleri üretin, kapasiteyi görün ve gerektiğinde slotları bloke edin.
        </p>
      </header>

      {selectedTourId ? (
        <AvailabilityManager
          tours={tours}
          selectedTourId={selectedTourId}
          slots={slots.map((slot) => ({
            id: slot.id,
            date: slot.date.toISOString(),
            timeSlot: slot.timeSlot,
            availableSpots: slot.availableSpots,
            totalSpots: slot.totalSpots,
            isBlocked: slot.isBlocked,
          }))}
        />
      ) : (
        <div className="border-2 border-dashed border-zeo-ink/20 py-16 text-center text-sm text-zeo-ink/50">
          Önce bir tur oluşturun.
        </div>
      )}
    </div>
  )
}
