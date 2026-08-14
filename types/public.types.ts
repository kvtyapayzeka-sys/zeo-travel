export interface PublicTour {
  id: string
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: {
    id: string
    name: string
    nameEn: string
    slug: string
  }
  priceAdult: number
  priceChild: number
  priceInfant: number
  currency: string
  duration: number
  maxCapacity: number
  minParticipants: number
  images: string[]
  features: string[]
  included: string[]
  excluded: string[]
  whatToBring: string[]
  availableDays: number[]
  startTimes: string[]
  rating: number | null
  reviewCount: number
  isHighlighted: boolean
  updatedAt: string
}

export interface PublicCategory {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string
  icon: string | null
  tourCount: number
  image: string | null
  updatedAt: string
}
