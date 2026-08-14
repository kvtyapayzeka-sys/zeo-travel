import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createCategorySchema } from '@/lib/validation/category.schema'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !isAdmin(session.user.role)) {
    return unauthorized()
  }

  const categories = await prisma.tourCategory.findMany({
    include: { _count: { select: { tours: true } } },
    orderBy: { sortOrder: 'asc' },
  })

  return NextResponse.json({
    success: true,
    data: categories.map((category) => ({
      ...category,
      tourCount: category._count.tours,
    })),
  })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user.role)) {
      return unauthorized()
    }

    const data = createCategorySchema.parse(await request.json())
    const category = await prisma.tourCategory.create({ data })

    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error: any) {
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

    console.error('POST /api/admin/categories error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Category could not be created',
        },
      },
      { status: 500 }
    )
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
