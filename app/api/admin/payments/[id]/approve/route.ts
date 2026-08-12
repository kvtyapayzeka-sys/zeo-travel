import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'
import { sendReservationConfirmedEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json()
    const { transactionId, notes } = body

    // Update payment and reservation in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update payment
      const payment = await tx.payment.update({
        where: { id: params.id },
        data: {
          status: 'COMPLETED',
          transactionId: transactionId,
          paidAt: new Date(),
        },
        include: {
          reservation: {
            include: {
              tour: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      })

      // Update reservation status
      const reservation = await tx.reservation.update({
        where: { id: payment.reservationId },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
        },
      })

      return { payment, reservation: payment.reservation }
    })

    // Send confirmation email (fire and forget)
    sendReservationConfirmedEmail(result.reservation as any).catch(console.error)

    const response: ApiResponse = {
      success: true,
      data: {
        payment: result.payment,
        reservation: result.reservation,
      },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('POST /api/admin/payments/[id]/approve error:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PAYMENT_NOT_FOUND',
            message: 'Payment not found',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while approving payment',
        },
      },
      { status: 500 }
    )
  }
}
