import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateTourSchema } from '@/lib/validation/tour.schema'
import { ApiResponse } from '@/types/api.types'

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
          error: {
            code: 'UNAUTHORIZED',
            message: 'Admin access required',
          },
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = updateTourSchema.parse(body)

    const tour = await prisma.tour.update({
      where: { id: params.id },
      data: validated,
      include: {
        category: true,
      },
    })

    const response: ApiResponse = {
      success: true,
      data: tour,
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('PATCH /api/admin/tours/[id] error:', error)

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

    if (error.code === 'P2025') {
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

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while updating tour',
        },
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    // Soft delete - archive instead of delete
    await prisma.tour.update({
      where: { id: params.id },
      data: {
        status: 'ARCHIVED',
      },
    })

    const response: ApiResponse = {
      success: true,
      data: { message: 'Tour archived successfully' },
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('DELETE /api/admin/tours/[id] error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while deleting tour',
        },
      },
      { status: 500 }
    )
  }
}
