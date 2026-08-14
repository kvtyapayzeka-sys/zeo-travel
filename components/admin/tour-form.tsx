'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface CategoryOption {
  id: string
  name: string
}

interface EditableTour {
  id: string
  categoryId: string
  title: string
  titleEn: string
  slug: string
  description: string
  descriptionEn: string
  priceAdult: number
  priceChild: number
  priceInfant: number
  currency: string
  duration: number
  maxCapacity: number
  minParticipants: number
  features: string[]
  included: string[]
  excluded: string[]
  whatToBring: string[]
  images: string[]
  availableDays: number[]
  startTimes: string[]
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  isHighlighted: boolean
  sortOrder: number
}

const dayOptions = [
  { value: 1, label: 'Pzt' },
  { value: 2, label: 'Sal' },
  { value: 3, label: 'Çar' },
  { value: 4, label: 'Per' },
  { value: 5, label: 'Cum' },
  { value: 6, label: 'Cmt' },
  { value: 0, label: 'Paz' },
]

export function TourForm({
  categories,
  tour,
}: {
  categories: CategoryOption[]
  tour?: EditableTour
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      categoryId: String(formData.get('categoryId')),
      title: String(formData.get('title')),
      titleEn: String(formData.get('titleEn')),
      slug: String(formData.get('slug')),
      description: String(formData.get('description')),
      descriptionEn: String(formData.get('descriptionEn')),
      priceAdult: Number(formData.get('priceAdult')),
      priceChild: Number(formData.get('priceChild')),
      priceInfant: Number(formData.get('priceInfant') || 0),
      currency: String(formData.get('currency') || 'TRY'),
      duration: Number(formData.get('duration')),
      maxCapacity: Number(formData.get('maxCapacity')),
      minParticipants: Number(formData.get('minParticipants')),
      features: lines(formData.get('features')),
      included: lines(formData.get('included')),
      excluded: lines(formData.get('excluded')),
      whatToBring: lines(formData.get('whatToBring')),
      images: lines(formData.get('images')),
      availableDays: formData.getAll('availableDays').map(Number),
      startTimes: String(formData.get('startTimes'))
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      status: String(formData.get('status')),
      isHighlighted: formData.get('isHighlighted') === 'on',
      sortOrder: Number(formData.get('sortOrder') || 0),
    }

    try {
      const response = await fetch(
        tour ? `/api/admin/tours/${tour.id}` : '/api/admin/tours',
        {
          method: tour ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Tur kaydedilemedi')
      }

      router.push('/admin/turlar')
      router.refresh()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Tur kaydedilemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section title="Temel bilgiler">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Türkçe başlık" name="title" defaultValue={tour?.title} required />
          <Field label="İngilizce başlık" name="titleEn" defaultValue={tour?.titleEn} required />
          <Field label="Slug" name="slug" defaultValue={tour?.slug} required />
          <label>
            <Label>Kategori</Label>
            <select name="categoryId" required defaultValue={tour?.categoryId ?? ''} className={inputClassName}>
              <option value="" disabled>Kategori seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <TextArea label="Türkçe açıklama" name="description" defaultValue={tour?.description} required />
          <TextArea label="İngilizce açıklama" name="descriptionEn" defaultValue={tour?.descriptionEn} required />
        </div>
      </Section>

      <Section title="Fiyat ve kapasite">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Yetişkin fiyatı" name="priceAdult" type="number" min="0.01" step="0.01" defaultValue={tour?.priceAdult} required />
          <Field label="Çocuk fiyatı" name="priceChild" type="number" min="0" step="0.01" defaultValue={tour?.priceChild ?? 0} required />
          <Field label="Bebek fiyatı" name="priceInfant" type="number" min="0" step="0.01" defaultValue={tour?.priceInfant ?? 0} />
          <Field label="Para birimi" name="currency" defaultValue={tour?.currency ?? 'TRY'} required />
          <Field label="Süre (dakika)" name="duration" type="number" min="1" defaultValue={tour?.duration} required />
          <Field label="Maksimum kapasite" name="maxCapacity" type="number" min="1" defaultValue={tour?.maxCapacity} required />
          <Field label="Minimum katılımcı" name="minParticipants" type="number" min="1" defaultValue={tour?.minParticipants ?? 1} required />
          <Field label="Sıralama" name="sortOrder" type="number" min="0" defaultValue={tour?.sortOrder ?? 0} required />
        </div>
      </Section>

      <Section title="Program">
        <div>
          <Label>Aktif günler</Label>
          <div className="flex flex-wrap gap-2">
            {dayOptions.map((day) => (
              <label key={day.value} className="flex cursor-pointer items-center gap-2 border-2 border-zeo-ink/15 bg-white px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day.value}
                  defaultChecked={tour?.availableDays.includes(day.value) ?? true}
                  className="accent-zeo-coral"
                />
                {day.label}
              </label>
            ))}
          </div>
        </div>
        <Field
          label="Başlangıç saatleri (virgülle)"
          name="startTimes"
          placeholder="09:00, 14:00"
          defaultValue={tour?.startTimes.join(', ') ?? '09:00'}
          required
        />
      </Section>

      <Section title="İçerik ve medya">
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea label="Özellikler (satır satır)" name="features" defaultValue={tour?.features.join('\n')} required />
          <TextArea label="Dahil olanlar (satır satır)" name="included" defaultValue={tour?.included.join('\n')} required />
          <TextArea label="Dahil olmayanlar (satır satır)" name="excluded" defaultValue={tour?.excluded.join('\n')} />
          <TextArea label="Yanında getir (satır satır)" name="whatToBring" defaultValue={tour?.whatToBring.join('\n')} />
          <div className="md:col-span-2">
            <TextArea label="Görsel URL’leri (satır satır)" name="images" defaultValue={tour?.images.join('\n')} required />
          </div>
        </div>
      </Section>

      <Section title="Yayın">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <Label>Durum</Label>
            <select name="status" defaultValue={tour?.status ?? 'ACTIVE'} className={inputClassName}>
              <option value="ACTIVE">Aktif</option>
              <option value="INACTIVE">Pasif</option>
              <option value="ARCHIVED">Arşiv</option>
            </select>
          </label>
          <label className="flex items-center gap-3 border-2 border-zeo-ink/15 bg-white px-4 py-3 text-sm font-semibold">
            <input type="checkbox" name="isHighlighted" defaultChecked={tour?.isHighlighted} className="accent-zeo-coral" />
            Ana sayfada öne çıkar
          </label>
        </div>
      </Section>

      {error && (
        <p role="alert" className="border border-zeo-error bg-red-50 p-4 text-sm text-zeo-error">{error}</p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/turlar')}>
          Vazgeç
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor…' : 'Turu kaydet'}
        </Button>
      </div>
    </form>
  )
}

const inputClassName =
  'w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral'

function lines(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-2 border-zeo-ink bg-white p-5 sm:p-6">
      <h2 className="font-bricolage mb-5 text-xl font-extrabold uppercase">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-xs font-bold uppercase tracking-[0.06em]">{children}</span>
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
  min,
  step,
  placeholder,
}: {
  label: string
  name: string
  defaultValue?: string | number
  type?: string
  required?: boolean
  min?: string
  step?: string
  placeholder?: string
}) {
  return (
    <label>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        step={step}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputClassName}
      />
    </label>
  )
}

function TextArea({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string
  name: string
  defaultValue?: string
  required?: boolean
}) {
  return (
    <label>
      <Label>{label}</Label>
      <textarea
        name={name}
        required={required}
        rows={5}
        defaultValue={defaultValue}
        className={inputClassName}
      />
    </label>
  )
}
