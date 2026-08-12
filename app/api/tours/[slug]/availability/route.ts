import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'
import { addDays, format, startOfDay } from 'date-fns'

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
    const tour = await prisma.tour.findUnique({
      where: { slug },
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
    const startDate = dateParam ? new Date(dateParam) : startOfDay(new Date())
    const days = Math.min(parseInt(daysParam), 90) // Max 90 days
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
    const availabilityByDate: Record<string, any[]> = {}

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
