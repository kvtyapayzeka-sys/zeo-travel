import { z } from 'zod'

export const createTourSchema = z.object({
  categoryId: z.string().cuid('Invalid category ID'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  titleEn: z.string().min(3, 'English title must be at least 3 characters').max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  descriptionEn: z.string().min(50, 'English description must be at least 50 characters'),
  
  priceAdult: z.number().positive('Adult price must be positive'),
  priceChild: z.number().nonnegative('Child price cannot be negative'),
  priceInfant: z.number().nonnegative('Infant price cannot be negative').optional(),
  currency: z.string().default('TRY'),
  
  duration: z.number().int().positive('Duration must be positive (in minutes)'),
  maxCapacity: z.number().int().positive('Max capacity must be positive'),
  minParticipants: z.number().int().positive('Min participants must be positive').default(1),
  
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  included: z.array(z.string()).min(1, 'At least one included item is required'),
  excluded: z.array(z.string()),
  whatToBring: z.array(z.string()).optional(),
  
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  videoUrl: z.string().url('Invalid video URL').optional(),
  
  availableDays: z.array(z.number().int().min(0).max(6)).min(1, 'At least one available day is required'),
  startTimes: z.array(z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)')).min(1),
  
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
  isHighlighted: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
})

export const updateTourSchema = createTourSchema.partial()

export const tourQuerySchema = z.object({
  category: z.string().optional(),
  date: z.string().datetime().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  participants: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const tourAvailabilityQuerySchema = z.object({
  tourId: z.string().cuid(),
  date: z.string().datetime(),
  timeSlot: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).optional(),
})

export type CreateTourInput = z.infer<typeof createTourSchema>
export type UpdateTourInput = z.infer<typeof updateTourSchema>
export type TourQuery = z.infer<typeof tourQuerySchema>
export type TourAvailabilityQuery = z.infer<typeof tourAvailabilityQuerySchema>
