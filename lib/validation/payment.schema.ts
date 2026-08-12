import { z } from 'zod'

export const createPaymentSchema = z.object({
  reservationId: z.string().cuid('Invalid reservation ID'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('TRY'),
  method: z.enum(['BANK_TRANSFER', 'CREDIT_CARD', 'IYZICO', 'PAYTR', 'CASH']),
  
  // For bank transfer
  transferReference: z.string().optional(),
  transferProof: z.string().url('Invalid proof URL').optional(),
})

export const approvePaymentSchema = z.object({
  transactionId: z.string().optional(),
  notes: z.string().max(500).optional(),
})

export const refundPaymentSchema = z.object({
  amount: z.number().positive('Refund amount must be positive'),
  reason: z.string().min(10, 'Please provide a refund reason (min 10 characters)').max(500),
})

export const paymentQuerySchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED']).optional(),
  method: z.enum(['BANK_TRANSFER', 'CREDIT_CARD', 'IYZICO', 'PAYTR', 'CASH']).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type ApprovePaymentInput = z.infer<typeof approvePaymentSchema>
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>
export type PaymentQuery = z.infer<typeof paymentQuerySchema>
