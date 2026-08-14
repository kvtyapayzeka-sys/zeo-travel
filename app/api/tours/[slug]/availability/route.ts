import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'
import { addDays, format } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const searchParams = request.nextUrl.searchParams
    const dateParam = searchParams.get('date')
    const daysParam = searchParams.get('days') || '30'

    // Find tour
    const tour = await prisma.tour.findFirst({
      where: { slug, status: 'ACTIVE' },
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

    // Date range
    const parsedDays = Number.parseInt(daysParam, 10)
    if (
      !Number.isFinite(parsedDays) ||
      parsedDays < 1 ||
      (dateParam !== null && !/^\d{4}-\d{2}-\d{2}$/.test(dateParam))
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid date range',
          },
        },
        { status: 400 }
      )
    }

    const now = new Date()
    const startDate = dateParam
      ? new Date(`${dateParam}T00:00:00.000Z`)
      : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    const days = Math.min(parsedDays, 90) // Max 90 days
    const endDate = addDays(startDate, days)

    // Get availability
    const availability = await prisma.tourAvailability.findMany({
      where: {
        tourId: tour.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
        isBlocked: false,
      },
      orderBy: [
        { date: 'asc' },
        { timeSlot: 'asc' },
      ],
    })

    // Group by date
    const availabilityByDate: Record<
      string,
      Array<{
        time: string
        availableSpots: number
        totalSpots: number
        isAvailable: boolean
        priceOverride?: number
      }>
    > = {}

    availability.forEach((slot) => {
      const dateStr = format(slot.date, 'yyyy-MM-dd')
      
      if (!availabilityByDate[dateStr]) {
        availabilityByDate[dateStr] = []
      }

      availabilityByDate[dateStr].push({
        time: slot.timeSlot,
        availableSpots: slot.availableSpots,
        totalSpots: slot.totalSpots,
        isAvailable: slot.availableSpots > 0,
        priceOverride: slot.priceOverride ? Number(slot.priceOverride) : undefined,
      })
    })

    const response: ApiResponse = {
      success: true,
      data: {
        tourId: tour.id,
        tourName: tour.title,
        availability: Object.entries(availabilityByDate).map(([date, slots]) => ({
          date,
          slots,
          hasAvailability: slots.some(s => s.isAvailable),
        })),
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/tours/[slug]/availability error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching availability',
        },
      },
      { status: 500 }
    )
  }
}
