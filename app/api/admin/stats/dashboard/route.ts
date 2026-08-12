import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'
import { startOfDay, startOfMonth, endOfMonth, subMonths } from 'date-fns'

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

    const today = startOfDay(new Date())
    const thisMonth = startOfMonth(new Date())
    const lastMonth = subMonths(thisMonth, 1)

    // Parallel queries for dashboard stats
    const [
      todayReservations,
      todayRevenue,
      thisMonthRevenue,
      pendingPayments,
      pendingReservations,
      confirmedReservations,
      popularTours,
      recentReviews,
    ] = await Promise.all([
      // Today's reservations
      prisma.reservation.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),

      // Today's revenue
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED',
          paidAt: {
            gte: today,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      // This month's revenue
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED',
          paidAt: {
            gte: thisMonth,
            lte: endOfMonth(new Date()),
          },
        },
        _sum: {
          amount: true,
        },
      }),

      // Pending payments count
      prisma.payment.count({
        where: {
          status: 'PENDING',
        },
      }),

      // Pending reservations
      prisma.reservation.count({
        where: {
          status: 'PENDING',
        },
      }),

      // Confirmed reservations for today
      prisma.reservation.count({
        where: {
          status: 'CONFIRMED',
          tourDate: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Popular tours (most bookings this month)
      prisma.tour.findMany({
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          images: true,
          _count: {
            select: {
              reservations: {
                where: {
                  createdAt: {
                    gte: thisMonth,
                  },
                  status: {
                    in: ['PENDING', 'CONFIRMED', 'COMPLETED'],
                  },
                },
              },
            },
          },
        },
        orderBy: {
          reservations: {
            _count: 'desc',
          },
        },
      }),

      // Recent pending reviews
      prisma.review.findMany({
        where: {
          status: 'PENDING',
        },
        take: 5,
        include: {
          tour: {
            select: {
              title: true,
              slug: true,
            },
          },
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
      }),
    ])

    const response: ApiResponse = {
      success: true,
      data: {
        today: {
          reservations: todayReservations,
          revenue: Number(todayRevenue._sum.amount || 0),
          confirmedReservations,
        },
        thisMonth: {
          revenue: Number(thisMonthRevenue._sum.amount || 0),
        },
        pending: {
          payments: pendingPayments,
          reservations: pendingReservations,
        },
        popularTours: popularTours.map(tour => ({
          ...tour,
          bookingsCount: tour._count.reservations,
        })),
        recentReviews,
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/admin/stats/dashboard error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching dashboard stats',
        },
      },
      { status: 500 }
    )
  }
}
