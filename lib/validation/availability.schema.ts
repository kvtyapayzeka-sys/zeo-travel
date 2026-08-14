import { z } from 'zod'

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const timeString = z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)

export const generateAvailabilitySchema = z
  .object({
    tourId: z.string().cuid(),
    dateFrom: dateString,
    dateTo: dateString,
    timeSlots: z.array(timeString).min(1).optional(),
    totalSpots: z.number().int().positive().optional(),
  })
  .refine((data) => data.dateTo >= data.dateFrom, {
    path: ['dateTo'],
    message: 'End date must be after start date',
  })

export const updateAvailabilitySchema = z.object({
  isBlocked: z.boolean().optional(),
  blockReason: z.string().trim().max(300).nullable().optional(),
  availableSpots: z.number().int().nonnegative().optional(),
  totalSpots: z.number().int().positive().optional(),
  priceOverride: z.number().positive().nullable().optional(),
})
