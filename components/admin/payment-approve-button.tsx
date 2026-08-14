'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function PaymentApproveButton({
  paymentId,
  reservationNumber,
}: {
  paymentId: string
  reservationNumber: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function approvePayment() {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: transactionId.trim() || undefined,
        }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Ödeme onaylanamadı')
      }

      setOpen(false)
      router.refresh()
    } catch (approveError) {
      setError(
        approveError instanceof Error ? approveError.message : 'Ödeme onaylanamadı'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm">Ödemeyi onayla</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zeo-ink/65" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border-2 border-zeo-ink bg-zeo-sand p-6 shadow-[8px_8px_0_0_#ff5a3d]">
          <Dialog.Title className="font-bricolage text-2xl font-extrabold uppercase text-zeo-ink">
            Havale onayı
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-zeo-ink/60">
            {reservationNumber} numaralı rezervasyonun ödemesi tamamlandı olarak
            işaretlenecek ve rezervasyon onaylanacak.
          </Dialog.Description>
          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.06em]">
              Banka işlem referansı (opsiyonel)
            </span>
            <input
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
              maxLength={100}
              className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral"
            />
          </label>
          {error && (
            <p role="alert" className="mt-4 border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outline" disabled={isSubmitting}>Vazgeç</Button>
            </Dialog.Close>
            <Button onClick={approvePayment} disabled={isSubmitting}>
              {isSubmitting ? 'Onaylanıyor…' : 'Onayı tamamla'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
