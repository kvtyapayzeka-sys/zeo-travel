'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface TourOption {
  id: string
  title: string
  maxCapacity: number
}

interface Slot {
  id: string
  date: string
  timeSlot: string
  availableSpots: number
  totalSpots: number
  isBlocked: boolean
}

export function AvailabilityManager({
  tours,
  selectedTourId,
  slots,
}: {
  tours: TourOption[]
  selectedTourId: string
  slots: Slot[]
}) {
  const router = useRouter()
  const selectedTour = tours.find((tour) => tour.id === selectedTourId)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function generateSlots(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTourId,
          dateFrom: String(formData.get('dateFrom')),
          dateTo: String(formData.get('dateTo')),
          totalSpots: Number(formData.get('totalSpots')),
        }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Müsaitlik üretilemedi')
      }
      setMessage(`${payload.data.created} yeni slot oluşturuldu.`)
      router.refresh()
    } catch (generateError) {
      setError(generateError instanceof Error ? generateError.message : 'Müsaitlik üretilemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function toggleSlot(slot: Slot) {
    setError(null)
    setMessage(null)
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/availability/${slot.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isBlocked: !slot.isBlocked,
          blockReason: slot.isBlocked ? null : 'Admin tarafından bloke edildi',
        }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Slot güncellenemedi')
      }
      router.refresh()
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Slot güncellenemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  const tomorrow = dateOffset(1)
  const nextMonth = dateOffset(30)

  return (
    <>
      <div className="grid gap-5 border-2 border-zeo-ink bg-white p-5 lg:grid-cols-[280px_1fr]">
        <label>
          <span className="mb-2 block text-xs font-bold uppercase">Tur</span>
          <select
            value={selectedTourId}
            onChange={(event) =>
              router.push(`/admin/musaitlik?tourId=${event.target.value}`)
            }
            className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral"
          >
            {tours.map((tour) => (
              <option key={tour.id} value={tour.id}>{tour.title}</option>
            ))}
          </select>
        </label>

        <form onSubmit={generateSlots} className="grid gap-3 sm:grid-cols-4">
          <AdminDate label="Başlangıç" name="dateFrom" defaultValue={tomorrow} />
          <AdminDate label="Bitiş" name="dateTo" defaultValue={nextMonth} />
          <label>
            <span className="mb-2 block text-xs font-bold uppercase">Kapasite</span>
            <input
              type="number"
              name="totalSpots"
              min={1}
              required
              defaultValue={selectedTour?.maxCapacity ?? 1}
              className="w-full border-2 border-zeo-ink/20 px-4 py-3 text-sm outline-none focus:border-zeo-coral"
            />
          </label>
          <Button type="submit" className="self-end" disabled={isSubmitting}>
            Slot üret
          </Button>
        </form>
      </div>

      {message && <p className="mt-4 border border-zeo-success bg-green-50 p-3 text-sm text-green-800">{message}</p>}
      {error && <p className="mt-4 border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">{error}</p>}

      <div className="mt-6 overflow-x-auto border-2 border-zeo-ink bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zeo-ink text-xs uppercase tracking-[0.06em] text-white/65">
            <tr>
              <th className="px-5 py-3">Tarih</th>
              <th className="px-5 py-3">Saat</th>
              <th className="px-5 py-3">Kalan / Toplam</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} className="border-t border-zeo-ink/10">
                <td className="px-5 py-4">{formatSlotDate(slot.date)}</td>
                <td className="px-5 py-4 font-mono">{slot.timeSlot}</td>
                <td className="px-5 py-4">{slot.availableSpots} / {slot.totalSpots}</td>
                <td className="px-5 py-4">
                  <span className="border border-zeo-ink/20 bg-zeo-sand px-2 py-1 text-[11px] font-bold uppercase">
                    {slot.isBlocked ? 'Bloke' : slot.availableSpots > 0 ? 'Açık' : 'Dolu'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={() => toggleSlot(slot)}
                  >
                    {slot.isBlocked ? 'Aç' : 'Bloke et'}
                  </Button>
                </td>
              </tr>
            ))}
            {slots.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-zeo-ink/50">Gelecek slot bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

function AdminDate({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-bold uppercase">{label}</span>
      <input
        type="date"
        name={name}
        required
        defaultValue={defaultValue}
        className="w-full border-2 border-zeo-ink/20 px-4 py-3 text-sm outline-none focus:border-zeo-coral"
      />
    </label>
  )
}

function dateOffset(days: number) {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function formatSlotDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}
