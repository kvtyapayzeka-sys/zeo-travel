import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'

export async function GET(
  request: NextRequest,
  { params }: { params: { number: string } }
) {
  try {
    const reservationNumber = params.number
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    // Verify email for security
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Email verification is required',
          },
        },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.findUnique({
      where: { reservationNumber },
      include: {
        tour: {
          select: {
            id: true,
            title: true,
            titleEn: true,
            slug: true,
            images: true,
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RESERVATION_NOT_FOUND',
            message: 'Reservation not found',
          },
        },
        { status: 404 }
      )
    }

    // Verify email matches
    if (reservation.guestEmail !== email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Email does not match reservation',
          },
        },
        { status: 401 }
      )
    }

    const response: ApiResponse = {
      success: true,
      data: {
        ...reservation,
        totalAmount: Number(reservation.totalAmount),
        pricePerAdult: Number(reservation.pricePerAdult),
        pricePerChild: Number(reservation.pricePerChild),
        pricePerInfant: Number(reservation.pricePerInfant),
        subtotal: Number(reservation.subtotal),
        discountAmount: Number(reservation.discountAmount),
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/reservations/[number] error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching reservation',
        },
      },
      { status: 500 }
    )
  }
}
