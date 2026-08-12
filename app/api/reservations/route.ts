import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createReservationSchema } from '@/lib/validation/reservation.schema'
import { ApiResponse } from '@/types/api.types'
import { 
  generateReservationNumber, 
  calculateReservationTotal 
} from '@/lib/utils'
import { sendReservationPendingEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validated = createReservationSchema.parse(body)

    // Get tour details
    const tour = await prisma.tour.findUnique({
      where: { id: validated.tourId },
    })

    if (!tour || tour.status !== 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOUR_NOT_FOUND',
            message: 'Tour not found or not available',
          },
        },
        { status: 404 }
      )
    }

    // Check availability
    const availability = await prisma.tourAvailability.findUnique({
      where: {
        tourId_date_timeSlot: {
          tourId: validated.tourId,
          date: new Date(validated.tourDate),
          timeSlot: validated.timeSlot,
        },
      },
    })

    const totalParticipants = validated.adultCount + validated.childCount + validated.infantCount

    if (!availability || availability.isBlocked) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOUR_UNAVAILABLE',
            message: 'This tour is not available for the selected date and time',
          },
        },
        { status: 400 }
      )
    }

    if (availability.availableSpots < totalParticipants) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INSUFFICIENT_CAPACITY',
            message: `Only ${availability.availableSpots} spots available`,
          },
        },
        { status: 400 }
      )
    }

    // Calculate prices
    const priceAdult = availability.priceOverride || tour.priceAdult
    const priceChild = tour.priceChild
    const priceInfant = tour.priceInfant || 0

    const { subtotal, total } = calculateReservationTotal(
      validated.adultCount,
      validated.childCount,
      validated.infantCount,
      Number(priceAdult),
      Number(priceChild),
      Number(priceInfant),
      0 // no discount for now
    )

    // Create reservation in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create reservation
      const reservation = await tx.reservation.create({
        data: {
          reservationNumber: generateReservationNumber(),
          tourId: validated.tourId,
          tourDate: new Date(validated.tourDate),
          timeSlot: validated.timeSlot,
          adultCount: validated.adultCount,
          childCount: validated.childCount,
          infantCount: validated.infantCount,
          totalParticipants,
          pricePerAdult: priceAdult,
          pricePerChild: priceChild,
          pricePerInfant: priceInfant,
          subtotal,
          totalAmount: total,
          currency: tour.currency,
          guestEmail: validated.customerInfo.email,
          guestPhone: validated.customerInfo.phone,
          guestFirstName: validated.customerInfo.firstName,
          guestLastName: validated.customerInfo.lastName,
          specialRequests: validated.specialRequests,
          pickupLocation: validated.pickupLocation,
          referralSource: validated.referralSource,
          villaReservationId: validated.villaReservationId,
          status: 'PENDING',
        },
        include: {
          tour: {
            select: {
              title: true,
            },
          },
        },
      })

      // Create pending payment
      await tx.payment.create({
        data: {
          reservationId: reservation.id,
          amount: total,
          currency: tour.currency,
          method: 'BANK_TRANSFER',
          status: 'PENDING',
        },
      })

      // Update availability
      await tx.tourAvailability.update({
        where: {
          id: availability.id,
        },
        data: {
          availableSpots: {
            decrement: totalParticipants,
          },
        },
      })

      return reservation
    })

    // Get bank accounts from config
    const bankConfig = await prisma.siteConfig.findUnique({
      where: { key: 'payment.bank_accounts' },
    })

    const bankAccounts = bankConfig?.value || []

    // Send email (fire and forget)
    sendReservationPendingEmail(result, bankAccounts as any).catch(console.error)

    const response: ApiResponse = {
      success: true,
      data: {
        reservationId: result.id,
        reservationNumber: result.reservationNumber,
        status: result.status,
        totalAmount: Number(result.totalAmount),
        currency: result.currency,
        paymentInstructions: {
          method: 'BANK_TRANSFER',
          bankAccounts,
          reference: result.reservationNumber,
          deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/reservations error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid reservation data',
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
          message: 'An error occurred while creating reservation',
        },
      },
      { status: 500 }
    )
  }
}
