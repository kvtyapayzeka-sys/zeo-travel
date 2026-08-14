'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TourArchiveButton({ tourId, title }: { tourId: string; title: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function archiveTour() {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/tours/${tourId}`, { method: 'DELETE' })
      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Tur arşivlenemedi')
      }
      setOpen(false)
      router.refresh()
    } catch (archiveError) {
      setError(archiveError instanceof Error ? archiveError.message : 'Tur arşivlenemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          <Archive className="h-4 w-4" />
          <span className="sr-only">Arşivle</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zeo-ink/65" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border-2 border-zeo-ink bg-zeo-sand p-6">
          <Dialog.Title className="font-bricolage text-2xl font-extrabold uppercase">
            Turu arşivle
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm text-zeo-ink/60">
            “{title}” public listelerden kaldırılacak. Geçmiş rezervasyonlar korunur.
          </Dialog.Description>
          {error && <p className="mt-4 text-sm text-zeo-error">{error}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild><Button variant="outline">Vazgeç</Button></Dialog.Close>
            <Button onClick={archiveTour} disabled={isSubmitting}>
              {isSubmitting ? 'Arşivleniyor…' : 'Arşivle'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
