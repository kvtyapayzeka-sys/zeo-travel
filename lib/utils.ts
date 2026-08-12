import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS class merger utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate unique reservation number
 * Format: ZEO-YYYY-NNNNNN
 */
export function generateReservationNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, '0')
  return `ZEO-${year}-${random}`
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Format date to Turkish locale
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (format === 'short') {
    return d.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  })
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)

  for (let i = 0; i < length; i++) {
    token += chars[randomValues[i] % chars.length]
  }

  return token
}

/**
 * Calculate total participants
 */
export function calculateTotalParticipants(
  adults: number,
  children: number = 0,
  infants: number = 0
): number {
  return adults + children + infants
}

/**
 * Calculate reservation total amount
 */
export function calculateReservationTotal(
  adultCount: number,
  childCount: number,
  infantCount: number,
  pricePerAdult: number,
  pricePerChild: number,
  pricePerInfant: number,
  discountAmount: number = 0
): {
  subtotal: number
  total: number
} {
  const subtotal =
    adultCount * pricePerAdult +
    childCount * pricePerChild +
    infantCount * pricePerInfant

  const total = Math.max(0, subtotal - discountAmount)

  return { subtotal, total }
}
