import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { PublicCategory, PublicTour } from '@/types/public.types'

const tourInclude = {
  category: {
    select: {
      id: true,
      name: true,
      nameEn: true,
      slug: true,
    },
  },
} satisfies Prisma.TourInclude

type TourRecord = Prisma.TourGetPayload<{ include: typeof tourInclude }>

function toStringArray(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item): item is string => typeof item === 'string')
}

function toPublicTour(
  tour: TourRecord,
  reviews?: { average: number | null; count: number }
): PublicTour {
  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    titleEn: tour.titleEn,
    description: tour.description,
    descriptionEn: tour.descriptionEn,
    category: tour.category,
    priceAdult: Number(tour.priceAdult),
    priceChild: Number(tour.priceChild),
    priceInfant: Number(tour.priceInfant ?? 0),
    currency: tour.currency,
    duration: tour.duration,
    maxCapacity: tour.maxCapacity,
    minParticipants: tour.minParticipants,
    images: tour.images,
    features: toStringArray(tour.features),
    included: toStringArray(tour.included),
    excluded: toStringArray(tour.excluded),
    whatToBring: toStringArray(tour.whatToBring),
    availableDays: tour.availableDays,
    startTimes: tour.startTimes,
    rating: reviews?.average ?? null,
    reviewCount: reviews?.count ?? 0,
    isHighlighted: tour.isHighlighted,
    updatedAt: tour.updatedAt.toISOString(),
  }
}

export async function getPublicTours(): Promise<PublicTour[]> {
  const [tours, reviewStats] = await Promise.all([
    prisma.tour.findMany({
      where: { status: 'ACTIVE' },
      include: tourInclude,
      orderBy: [
        { isHighlighted: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    }),
    prisma.review.groupBy({
      by: ['tourId'],
      where: { status: 'APPROVED' },
      _avg: { rating: true },
      _count: { _all: true },
    }),
  ])

  const reviewsByTour = new Map(
    reviewStats.map((review) => [
      review.tourId,
      {
        average: review._avg.rating,
        count: review._count._all,
      },
    ])
  )

  return tours.map((tour) => toPublicTour(tour, reviewsByTour.get(tour.id)))
}

export async function getHighlightedPublicTours(): Promise<PublicTour[]> {
  const tours = await getPublicTours()
  return tours.filter((tour) => tour.isHighlighted)
}

export async function getPublicTourBySlug(
  slug: string
): Promise<PublicTour | null> {
  const tour = await prisma.tour.findFirst({
    where: {
      slug,
      status: 'ACTIVE',
    },
    include: tourInclude,
  })

  if (!tour) {
    return null
  }

  const reviewStats = await prisma.review.aggregate({
    where: {
      tourId: tour.id,
      status: 'APPROVED',
    },
    _avg: { rating: true },
    _count: { _all: true },
  })

  return toPublicTour(tour, {
    average: reviewStats._avg.rating,
    count: reviewStats._count._all,
  })
}

export async function getPublicCategories(): Promise<PublicCategory[]> {
  const categories = await prisma.tourCategory.findMany({
    include: {
      tours: {
        where: { status: 'ACTIVE' },
        select: { images: true },
        orderBy: [{ isHighlighted: 'desc' }, { sortOrder: 'asc' }],
        take: 1,
      },
      _count: {
        select: {
          tours: {
            where: { status: 'ACTIVE' },
          },
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  })

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    nameEn: category.nameEn,
    slug: category.slug,
    description: category.description ?? '',
    icon: category.icon,
    tourCount: category._count.tours,
    image: category.tours[0]?.images[0] ?? null,
    updatedAt: category.updatedAt.toISOString(),
  }))
}
