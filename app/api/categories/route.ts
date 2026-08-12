import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types/api.types'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.tourCategory.findMany({
      include: {
        _count: {
          select: {
            tours: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })

    const response: ApiResponse = {
      success: true,
      data: categories.map(cat => ({
        ...cat,
        tourCount: cat._count.tours,
      })),
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('GET /api/categories error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while fetching categories',
        },
      },
      { status: 500 }
    )
  }
}
