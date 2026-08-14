import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateAvailabilitySchema } from '@/lib/validation/availability.schema'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Admin access required' },
        },
        { status: 401 }
      )
    }

    const data = updateAvailabilitySchema.parse(await request.json())
    const slot = await prisma.tourAvailability.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({
      success: true,
      data: {
        ...slot,
        priceOverride:
          slot.priceOverride === null ? null : Number(slot.priceOverride),
      },
    })
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

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AVAILABILITY_NOT_FOUND', message: 'Availability not found' },
        },
        { status: 404 }
      )
    }

    console.error('PATCH /api/admin/availability/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Availability could not be updated' },
      },
      { status: 500 }
    )
  }
}
