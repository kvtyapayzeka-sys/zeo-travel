import { Reservation, ReservationStatus, User, Tour, Payment } from '@prisma/client'

export type ReservationWithDetails = Reservation & {
  user?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'phone'>
  tour: Pick<Tour, 'id' | 'title' | 'titleEn' | 'slug' | 'images'>
  payments: Payment[]
}

export interface CreateReservationInput {
  tourId: string
  tourDate: string // ISO date string
  timeSlot: string
  adultCount: number
  childCount: number
  infantCount: number
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  specialRequests?: string
  pickupLocation?: string
  referralSource?: string
  villaReservationId?: string
}

export interface ReservationSummary {
  id: string
  reservationNumber: string
  status: ReservationStatus
  tourDate: string
  timeSlot: string
  tourName: string
  totalAmount: number
  currency: string
  paymentStatus: 'pending' | 'completed' | 'failed'
}

export interface ReservationPaymentInstructions {
  method: 'BANK_TRANSFER'
  bankAccounts: BankAccount[]
  reference: string
  deadline: string
}

export interface BankAccount {
  bankName: string
  iban: string
  accountHolder: string
  accountNumber?: string
}
