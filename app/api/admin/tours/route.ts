import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createTourSchema } from '@/lib/validation/tour.schema'
import { ApiResponse } from '@/types/api.types'

export async function POST(request: NextRequest) {
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
    const validated = createTourSchema.parse(body)

    const tour = await prisma.tour.create({
      data: {
        ...validated,
        priceAdult: validated.priceAdult,
        priceChild: validated.priceChild,
        priceInfant: validated.priceInfant,
        createdBy: session.user.id,
      },
      include: {
        category: true,
      },
    })

    const response: ApiResponse = {
      success: true,
      data: tour,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/admin/tours error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid tour data',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOUR_ALREADY_EXISTS',
            message: 'A tour with this slug already exists',
          },
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while creating tour',
        },
      },
      { status: 500 }
    )
  }
}
