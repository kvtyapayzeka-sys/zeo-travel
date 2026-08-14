import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAvailabilitySchema } from '@/lib/validation/availability.schema'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !isAdmin(session.user.role)) return unauthorized()

  const tourId = request.nextUrl.searchParams.get('tourId')
  if (!tourId) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'tourId is required' },
      },
      { status: 400 }
    )
  }

  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const availability = await prisma.tourAvailability.findMany({
    where: { tourId, date: { gte: today } },
    orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
    take: 500,
  })

  return NextResponse.json({
    success: true,
    data: availability.map((slot) => ({
      ...slot,
      priceOverride:
        slot.priceOverride === null ? null : Number(slot.priceOverride),
    })),
  })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user.role)) return unauthorized()

    const data = generateAvailabilitySchema.parse(await request.json())
    const tour = await prisma.tour.findUnique({ where: { id: data.tourId } })

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'TOUR_NOT_FOUND', message: 'Tour not found' },
        },
        { status: 404 }
      )
    }

    const start = new Date(`${data.dateFrom}T00:00:00.000Z`)
    const end = new Date(`${data.dateTo}T00:00:00.000Z`)
    const dayCount = Math.floor((end.getTime() - start.getTime()) / 86_400_000) + 1

    if (dayCount > 366) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATE_RANGE_TOO_LARGE',
            message: 'Date range cannot exceed 366 days',
          },
        },
        { status: 400 }
      )
    }

    const timeSlots = data.timeSlots ?? tour.startTimes
    const totalSpots = data.totalSpots ?? tour.maxCapacity
    const entries = []

    for (let offset = 0; offset < dayCount; offset++) {
      const date = new Date(start.getTime() + offset * 86_400_000)
      if (!tour.availableDays.includes(date.getUTCDay())) continue

      for (const timeSlot of timeSlots) {
        entries.push({
          tourId: tour.id,
          date,
          timeSlot,
          availableSpots: totalSpots,
          totalSpots,
        })
      }
    }

    const result = await prisma.tourAvailability.createMany({
      data: entries,
      skipDuplicates: true,
    })

    return NextResponse.json(
      {
        success: true,
        data: { created: result.count, requested: entries.length },
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid availability data',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    console.error('POST /api/admin/availability error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Availability could not be generated' },
      },
      { status: 500 }
    )
  }
}

function unauthorized() {
  return NextResponse.json(
    {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Admin access required' },
    },
    { status: 401 }
  )
}
