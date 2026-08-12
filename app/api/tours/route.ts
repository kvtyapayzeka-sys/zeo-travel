import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tourQuerySchema } from '@/lib/validation/tour.schema'
import { ApiResponse } from '@/types/api.types'

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
    const where: any = {
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
      where.priceAdult = {}
      if (validated.minPrice) where.priceAdult.gte = validated.minPrice
      if (validated.maxPrice) where.priceAdult.lte = validated.maxPrice
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
          _count: {
            select: {
              reviews: true,
              reservations: true,
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

    // Calculate average ratings
    const toursWithRatings = await Promise.all(
      tours.map(async (tour) => {
        const avgRating = await prisma.review.aggregate({
          where: {
            tourId: tour.id,
            status: 'APPROVED',
          },
          _avg: {
            rating: true,
          },
        })

        return {
          ...tour,
          averageRating: avgRating._avg.rating || 0,
          reviewCount: tour._count.reviews,
        }
      })
    )

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
