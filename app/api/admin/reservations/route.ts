import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { reservationQuerySchema } from '@/lib/validation/reservation.schema'
import { ApiResponse } from '@/types/api.types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Admin access required',
          },
        },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const query = {
      status: searchParams.get('status') || undefined,
      tourId: searchParams.get('tourId') || undefined,
      userId: searchParams.get('userId') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    }

    const validated = reservationQuerySchema.parse(query)

    // Build where clause
    const where: any = {}

    if (validated.status) {
      where.status = validated.status
    }

    if (validated.tourId) {
      where.tourId = validated.tourId
    }

    if (validated.userId) {
      where.userId = validated.userId
    }

    if (validated.dateFrom || validated.dateTo) {
      where.tourDate = {}
      if (validated.dateFrom) where.tourDate.gte = new Date(validated.dateFrom)
      if (validated.dateTo) where.tourDate.lte = new Date(validated.dateTo)
    }

    if (validated.search) {
      where.OR = [
        { reservationNumber: { contains: validated.search } },
        { guestEmail: { contains: validated.search, mode: 'insensitive' } },
        { guestPhone: { contains: validated.search } },
      ]
    }

    const skip = (validated.page - 1) * validated.limit
    const take = validated.limit

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        include: {
          tour: {
            select: {
              id: true,
              title: true,
              slug: true,
              images: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          payments: {
            select: {
              id: true,
              status: true,
              method: true,
              amount: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      prisma.reservation.count({ where }),
    ])

    const response: ApiResponse = {
      success: true,
      data: reservations,
      meta: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit),
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/admin/reservations error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching reservations',
        },
      },
      { status: 500 }
    )
  }
}
