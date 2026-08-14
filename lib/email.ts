/**
 * Email Service
 * 
 * Provider seçilene kadar gönderim yapmaz.
 * MailerSend veya Amazon SES adapter'ı daha sonra bağlanacak.
 */

import { Reservation, Payment, User } from '@prisma/client'
import { formatDate, formatPrice } from './utils'

interface EmailOptions {
  to: string
  subject: string
  template: EmailTemplate
  data: any
}

type EmailTemplate = 
  | 'reservation-pending'
  | 'reservation-confirmed'
  | 'reservation-cancelled'
  | 'payment-reminder'
  | 'review-request'

// Disabled adapter: intentionally does not log PII or template payloads.
async function sendEmail(options: EmailOptions): Promise<void> {
  console.info(`[email:disabled] ${options.template}`)
}

/**
 * Rezervasyon oluşturulduğunda - Havale bilgileri
 */
export async function sendReservationPendingEmail(
  reservation: Reservation & { tour: { title: string } },
  bankAccounts: any[]
): Promise<void> {
  const subject = `Rezervasyon Onayı Bekleniyor - ${reservation.reservationNumber}`
  
  await sendEmail({
    to: reservation.guestEmail || '',
    subject,
    template: 'reservation-pending',
    data: {
      reservationNumber: reservation.reservationNumber,
      tourName: reservation.tour.title,
      tourDate: formatDate(reservation.tourDate),
      timeSlot: reservation.timeSlot,
      totalAmount: formatPrice(Number(reservation.totalAmount), reservation.currency),
      adultCount: reservation.adultCount,
      childCount: reservation.childCount,
      infantCount: reservation.infantCount,
      bankAccounts: bankAccounts.map(acc => ({
        bankName: acc.bankName,
        iban: acc.iban,
        accountHolder: acc.accountHolder,
      })),
    },
  })
}

/**
 * Ödeme onaylandığında - Rezervasyon confirmed
 */
export async function sendReservationConfirmedEmail(
  reservation: Reservation & { tour: { title: string } }
): Promise<void> {
  const subject = `Rezervasyonunuz Onaylandı - ${reservation.reservationNumber}`
  
  await sendEmail({
    to: reservation.guestEmail || '',
    subject,
    template: 'reservation-confirmed',
    data: {
      reservationNumber: reservation.reservationNumber,
      tourName: reservation.tour.title,
      tourDate: formatDate(reservation.tourDate),
      timeSlot: reservation.timeSlot,
      totalAmount: formatPrice(Number(reservation.totalAmount), reservation.currency),
      adultCount: reservation.adultCount,
      childCount: reservation.childCount,
      infantCount: reservation.infantCount,
      pickupLocation: reservation.pickupLocation,
      specialRequests: reservation.specialRequests,
    },
  })
}

/**
 * Rezervasyon iptal edildiğinde
 */
export async function sendReservationCancelledEmail(
  reservation: Reservation & { tour: { title: string } },
  reason?: string
): Promise<void> {
  const subject = `Rezervasyonunuz İptal Edildi - ${reservation.reservationNumber}`
  
  await sendEmail({
    to: reservation.guestEmail || '',
    subject,
    template: 'reservation-cancelled',
    data: {
      reservationNumber: reservation.reservationNumber,
      tourName: reservation.tour.title,
      tourDate: formatDate(reservation.tourDate),
      reason: reason || 'Müşteri talebi',
    },
  })
}

/**
 * Ödeme hatırlatma (3 gün içinde ödeme yapılmazsa)
 */
export async function sendPaymentReminderEmail(
  reservation: Reservation & { tour: { title: string } },
  bankAccounts: any[]
): Promise<void> {
  const subject = `Ödeme Hatırlatma - ${reservation.reservationNumber}`
  
  await sendEmail({
    to: reservation.guestEmail || '',
    subject,
    template: 'payment-reminder',
    data: {
      reservationNumber: reservation.reservationNumber,
      tourName: reservation.tour.title,
      totalAmount: formatPrice(Number(reservation.totalAmount), reservation.currency),
      bankAccounts,
      hoursRemaining: 24, // TODO: Calculate actual hours
    },
  })
}

/**
 * Tur tamamlandıktan sonra yorum talebi
 */
export async function sendReviewRequestEmail(
  reservation: Reservation & { tour: { title: string; slug: string } }
): Promise<void> {
  const subject = `${reservation.tour.title} turunu nasıl buldunuz?`
  
  await sendEmail({
    to: reservation.guestEmail || '',
    subject,
    template: 'review-request',
    data: {
      tourName: reservation.tour.title,
      tourSlug: reservation.tour.slug,
      reservationNumber: reservation.reservationNumber,
      reviewLink: `${process.env.NEXTAUTH_URL}/tours/${reservation.tour.slug}/review?ref=${reservation.reservationNumber}`,
    },
  })
}

/**
 * Admin bildirim email'i
 */
export async function sendAdminNotification(
  subject: string,
  message: string,
  data?: any
): Promise<void> {
  // TODO: Get admin email from config
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@zeotravel.com'
  
  console.log('\n========== ADMIN NOTIFICATION ==========')
  console.log('To:', adminEmail)
  console.log('Subject:', subject)
  console.log('Message:', message)
  console.log('Data:', JSON.stringify(data, null, 2))
  console.log('========================================\n')
}
