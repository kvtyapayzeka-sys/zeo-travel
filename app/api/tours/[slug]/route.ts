import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    const tour = await prisma.tour.findUnique({
      where: { slug },
      include: {
        category: true,
        availability: {
          where: {
            date: {
              gte: new Date(),
            },
            isBlocked: false,
          },
          orderBy: {
            date: 'asc',
          },
          take: 30, // Next 30 days
        },
        reviews: {
          where: {
            status: 'APPROVED',
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            reviews: true,
            reservations: true,
          },
        },
      },
    })

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOUR_NOT_FOUND',
            message: 'Tour not found',
          },
        },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = await prisma.review.aggregate({
      where: {
        tourId: tour.id,
        status: 'APPROVED',
      },
      _avg: {
        rating: true,
      },
    })

    // Increment view count (fire and forget)
    prisma.tour.update({
      where: { id: tour.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    }).catch(console.error)

    const response: ApiResponse = {
      success: true,
      data: {
        ...tour,
        averageRating: avgRating._avg.rating || 0,
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/tours/[slug] error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching tour details',
        },
      },
      { status: 500 }
    )
  }
}
