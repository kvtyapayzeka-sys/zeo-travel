import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tourQuerySchema } from '@/lib/validation/tour.schema'
import { ApiResponse } from '@/types/api.types'
import type { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      category: searchParams.get('category') || undefined,
      date: searchParams.get('date') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      participants: searchParams.get('participants') || undefined,
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    }

    // Validate query params
    const validated = tourQuerySchema.parse(query)

    // Build where clause
    const where: Prisma.TourWhereInput = {
      status: validated.status || 'ACTIVE',
    }

    if (validated.category) {
      where.category = {
        slug: validated.category,
      }
    }

    if (validated.search) {
      where.OR = [
        { title: { contains: validated.search, mode: 'insensitive' } },
        { titleEn: { contains: validated.search, mode: 'insensitive' } },
        { description: { contains: validated.search, mode: 'insensitive' } },
      ]
    }

    if (validated.minPrice || validated.maxPrice) {
      where.priceAdult = {
        ...(validated.minPrice ? { gte: validated.minPrice } : {}),
        ...(validated.maxPrice ? { lte: validated.maxPrice } : {}),
      }
    }

    if (validated.participants) {
      where.maxCapacity = { gte: validated.participants }
    }

    if (validated.date) {
      const requestedDate = new Date(validated.date)
      const date = new Date(
        Date.UTC(
          requestedDate.getUTCFullYear(),
          requestedDate.getUTCMonth(),
          requestedDate.getUTCDate()
        )
      )

      where.availability = {
        some: {
          date,
          isBlocked: false,
          availableSpots: { gte: validated.participants ?? 1 },
        },
      }
    }

    // Pagination
    const skip = (validated.page - 1) * validated.limit
    const take = validated.limit

    // Fetch tours with count
    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              nameEn: true,
              slug: true,
            },
          },
        },
        orderBy: [
          { isHighlighted: 'desc' },
          { sortOrder: 'asc' },
          { createdAt: 'desc' },
        ],
        skip,
        take,
      }),
      prisma.tour.count({ where }),
    ])

    const reviewStats = tours.length
      ? await prisma.review.groupBy({
          by: ['tourId'],
          where: {
            tourId: { in: tours.map((tour) => tour.id) },
            status: 'APPROVED',
          },
          _avg: { rating: true },
          _count: { _all: true },
        })
      : []
    const reviewsByTour = new Map(
      reviewStats.map((review) => [
        review.tourId,
        {
          rating: review._avg.rating,
          count: review._count._all,
        },
      ])
    )
    const toursWithRatings = tours.map((tour) => {
      const reviews = reviewsByTour.get(tour.id)

      return {
        ...tour,
        priceAdult: Number(tour.priceAdult),
        priceChild: Number(tour.priceChild),
        priceInfant: Number(tour.priceInfant ?? 0),
        rating: reviews?.rating ?? null,
        reviewCount: reviews?.count ?? 0,
      }
    })

    const response: ApiResponse = {
      success: true,
      data: toursWithRatings,
      meta: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit),
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/tours error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid query parameters',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching tours',
        },
      },
      { status: 500 }
    )
  }
}
