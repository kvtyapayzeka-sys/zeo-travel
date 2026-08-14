import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'
import { sendReservationConfirmedEmail } from '@/lib/email'
import { approvePaymentSchema } from '@/lib/validation/payment.schema'

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
    const { transactionId } = approvePaymentSchema.parse(body)

    // Update payment and reservation in transaction
    const result = await prisma.$transaction(async (tx) => {
      const existingPayment = await tx.payment.findUnique({
        where: { id: params.id },
        select: { status: true, reservationId: true },
      })

      if (!existingPayment) {
        throw new Error('PAYMENT_NOT_FOUND')
      }

      if (existingPayment.status !== 'PENDING') {
        throw new Error('PAYMENT_NOT_PENDING')
      }

      const payment = await tx.payment.update({
        where: { id: params.id },
        data: {
          status: 'COMPLETED',
          transactionId,
          paidAt: new Date(),
        },
      })

      const reservation = await tx.reservation.update({
        where: { id: existingPayment.reservationId },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
        },
        include: {
          tour: {
            select: { title: true },
          },
        },
      })

      return { payment, reservation }
    })

    // Send confirmation email (fire and forget)
    sendReservationConfirmedEmail(result.reservation).catch(console.error)

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

    if (
      (error instanceof Error && error.message === 'PAYMENT_NOT_FOUND') ||
      error.code === 'P2025'
    ) {
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

    if (error instanceof Error && error.message === 'PAYMENT_NOT_PENDING') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PAYMENT_ALREADY_PROCESSED',
            message: 'Payment has already been processed',
          },
        },
        { status: 409 }
      )
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid payment approval data',
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
          message: 'An error occurred while approving payment',
        },
      },
      { status: 500 }
    )
  }
}
