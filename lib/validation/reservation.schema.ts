import { z } from 'zod'

export const createReservationSchema = z.object({
  tourId: z.string().cuid('Invalid tour ID'),
  tourDate: z.string().datetime('Invalid date format'),
  timeSlot: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  
  adultCount: z.number().int().min(1, 'At least 1 adult is required').max(50),
  childCount: z.number().int().min(0).max(50).default(0),
  infantCount: z.number().int().min(0).max(10).default(0),
  
  customerInfo: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  }),
  
  specialRequests: z.string().max(500, 'Special requests must not exceed 500 characters').optional(),
  pickupLocation: z.string().max(200).optional(),
  referralSource: z.enum(['direct', 'villa', 'social_media', 'other']).optional(),
  villaReservationId: z.string().optional(),
}).refine(
  (data) => {
    const date = new Date(data.tourDate)
    const now = new Date()
    return date > now
  },
  {
    message: 'Tour date must be in the future',
    path: ['tourDate'],
  }
)

export const updateReservationSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW', 'REFUNDED']),
  specialRequests: z.string().max(500).optional(),
  pickupLocation: z.string().max(200).optional(),
  cancellationReason: z.string().max(500).optional(),
})

export const cancelReservationSchema = z.object({
  reason: z.string().min(10, 'Please provide a cancellation reason (min 10 characters)').max(500),
})

export const reservationQuerySchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW', 'REFUNDED']).optional(),
  tourId: z.string().cuid().optional(),
  userId: z.string().cuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().optional(), // Search by reservation number, email, phone
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const reservationNumberSchema = z.object({
  number: z.string().regex(/^ZEO-\d{4}-\d{6}$/, 'Invalid reservation number format'),
  email: z.string().email('Email is required for verification'),
})

export type CreateReservationInput = z.infer<typeof createReservationSchema>
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>
export type CancelReservationInput = z.infer<typeof cancelReservationSchema>
export type ReservationQuery = z.infer<typeof reservationQuerySchema>
export type ReservationNumberQuery = z.infer<typeof reservationNumberSchema>
