import type { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import { TourForm } from '@/components/admin/tour-form'
import { prisma } from '@/lib/prisma'

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const [tour, categories] = await Promise.all([
    prisma.tour.findUnique({ where: { id: params.id } }),
    prisma.tourCategory.findMany({
      select: { id: true, name: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ])

  if (!tour) notFound()

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">Katalog</p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none">
          Turu düzenle
        </h1>
        <p className="mt-3 text-sm text-zeo-ink/55">{tour.title}</p>
      </header>
      <TourForm
        categories={categories}
        tour={{
          id: tour.id,
          categoryId: tour.categoryId,
          title: tour.title,
          titleEn: tour.titleEn,
          slug: tour.slug,
          description: tour.description,
          descriptionEn: tour.descriptionEn,
          priceAdult: Number(tour.priceAdult),
          priceChild: Number(tour.priceChild),
          priceInfant: Number(tour.priceInfant ?? 0),
          currency: tour.currency,
          duration: tour.duration,
          maxCapacity: tour.maxCapacity,
          minParticipants: tour.minParticipants,
          features: stringArray(tour.features),
          included: stringArray(tour.included),
          excluded: stringArray(tour.excluded),
          whatToBring: stringArray(tour.whatToBring),
          images: tour.images,
          availableDays: tour.availableDays,
          startTimes: tour.startTimes,
          status: tour.status,
          isHighlighted: tour.isHighlighted,
          sortOrder: tour.sortOrder,
        }}
      />
    </div>
  )
}

function stringArray(value: Prisma.JsonValue | null): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}
