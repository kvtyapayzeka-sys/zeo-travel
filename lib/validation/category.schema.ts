import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  nameEn: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(500).optional(),
  icon: z.string().trim().max(200).optional(),
  sortOrder: z.number().int().min(0).default(0),
})

export const updateCategorySchema = createCategorySchema.partial()
