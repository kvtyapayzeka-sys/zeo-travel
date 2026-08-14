import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateCategorySchema } from '@/lib/validation/category.schema'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user.role)) return unauthorized()

    const data = updateCategorySchema.parse(await request.json())
    const category = await prisma.tourCategory.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({ success: true, data: category })
  } catch (error: any) {
    return handleError(error)
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user.role)) return unauthorized()

    const category = await prisma.tourCategory.findUnique({
      where: { id: params.id },
      select: { _count: { select: { tours: true } } },
    })

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'CATEGORY_NOT_FOUND', message: 'Category not found' },
        },
        { status: 404 }
      )
    }

    if (category._count.tours > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CATEGORY_IN_USE',
            message: 'Categories with tours cannot be deleted',
          },
        },
        { status: 409 }
      )
    }

    await prisma.tourCategory.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, data: { id: params.id } })
  } catch (error: any) {
    return handleError(error)
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

function handleError(error: any) {
  if (error.name === 'ZodError') {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid category data',
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
          code: 'CATEGORY_ALREADY_EXISTS',
          message: 'Category name or slug already exists',
        },
      },
      { status: 409 }
    )
  }

  if (error.code === 'P2025') {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'CATEGORY_NOT_FOUND', message: 'Category not found' },
      },
      { status: 404 }
    )
  }

  console.error('Admin category operation error:', error)
  return NextResponse.json(
    {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Category operation failed' },
    },
    { status: 500 }
  )
}
