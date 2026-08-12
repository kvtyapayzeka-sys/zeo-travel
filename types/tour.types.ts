import { Tour, TourCategory, TourStatus, TourAvailability } from '@prisma/client'

export type TourWithCategory = Tour & {
  category: TourCategory
}

export type TourWithDetails = Tour & {
  category: TourCategory
  availability: TourAvailability[]
  _count?: {
    reviews: number
    reservations: number
  }
  averageRating?: number
}

export type TourListItem = Pick<
  Tour,
  | 'id'
  | 'slug'
  | 'title'
  | 'titleEn'
  | 'description'
  | 'priceAdult'
  | 'priceChild'
  | 'currency'
  | 'duration'
  | 'images'
  | 'status'
  | 'isHighlighted'
> & {
  category: Pick<TourCategory, 'id' | 'name' | 'nameEn' | 'slug'>
  reviewCount?: number
  averageRating?: number
}

export interface TourFilters {
  category?: string
  date?: string
  minPrice?: number
  maxPrice?: number
  participants?: number
  search?: string
  status?: TourStatus
}

export interface TourAvailabilityQuery {
  tourId: string
  date: Date
  timeSlot?: string
}

export interface TourAvailabilityResponse {
  date: string
  timeSlots: {
    time: string
    availableSpots: number
    totalSpots: number
    isAvailable: boolean
    priceOverride?: number
  }[]
}
