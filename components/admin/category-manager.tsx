'use client'

import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminCategory {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string | null
  icon: string | null
  sortOrder: number
  tourCount: number
}

export function CategoryManager({ categories }: { categories: AdminCategory[] }) {
  const router = useRouter()
  const [editing, setEditing] = useState<AdminCategory | null>(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function openCreate() {
    setEditing(null)
    setError(null)
    setOpen(true)
  }

  function openEdit(category: AdminCategory) {
    setEditing(category)
    setError(null)
    setOpen(true)
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: String(formData.get('name') ?? ''),
      nameEn: String(formData.get('nameEn') ?? ''),
      slug: String(formData.get('slug') ?? ''),
      description: String(formData.get('description') ?? '') || undefined,
      icon: String(formData.get('icon') ?? '') || undefined,
      sortOrder: Number(formData.get('sortOrder') ?? 0),
    }

    try {
      const response = await fetch(
        editing ? `/api/admin/categories/${editing.id}` : '/api/admin/categories',
        {
          method: editing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Kategori kaydedilemedi')
      }

      setOpen(false)
      router.refresh()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Kategori kaydedilemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteCategory(category: AdminCategory) {
    if (category.tourCount > 0) return

    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'DELETE',
      })
      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? 'Kategori silinemedi')
      }
      router.refresh()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Kategori silinemedi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Yeni kategori
        </Button>
      </div>

      {error && !open && (
        <p role="alert" className="mt-4 border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">
          {error}
        </p>
      )}

      <div className="mt-5 overflow-x-auto border-2 border-zeo-ink bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zeo-ink text-xs uppercase tracking-[0.06em] text-white/65">
            <tr>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Tur</th>
              <th className="px-5 py-3">Sıra</th>
              <th className="px-5 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-zeo-ink/10">
                <td className="px-5 py-4">
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-xs text-zeo-ink/45">{category.nameEn}</p>
                </td>
                <td className="px-5 py-4 font-mono text-xs">{category.slug}</td>
                <td className="px-5 py-4">{category.tourCount}</td>
                <td className="px-5 py-4">{category.sortOrder}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(category)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Düzenle</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={category.tourCount > 0 || isSubmitting}
                      onClick={() => deleteCategory(category)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Sil</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-zeo-ink/65" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border-2 border-zeo-ink bg-zeo-sand p-6 shadow-[8px_8px_0_0_#ff5a3d]">
            <Dialog.Title className="font-bricolage text-2xl font-extrabold uppercase">
              {editing ? 'Kategoriyi düzenle' : 'Yeni kategori'}
            </Dialog.Title>
            <form onSubmit={saveCategory} className="mt-6 grid gap-4 sm:grid-cols-2">
              <AdminField label="Türkçe ad" name="name" defaultValue={editing?.name} required />
              <AdminField label="İngilizce ad" name="nameEn" defaultValue={editing?.nameEn} required />
              <AdminField label="Slug" name="slug" defaultValue={editing?.slug} required />
              <AdminField label="İkon / kısa değer" name="icon" defaultValue={editing?.icon ?? ''} />
              <AdminField label="Sıra" name="sortOrder" type="number" defaultValue={String(editing?.sortOrder ?? 0)} required />
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs font-bold uppercase">Açıklama</span>
                <textarea
                  name="description"
                  maxLength={500}
                  rows={3}
                  defaultValue={editing?.description ?? ''}
                  className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral"
                />
              </label>
              {error && (
                <p role="alert" className="sm:col-span-2 border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-3 sm:col-span-2">
                <Dialog.Close asChild>
                  <Button type="button" variant="outline">Vazgeç</Button>
                </Dialog.Close>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Kaydediliyor…' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

function AdminField({
  label,
  name,
  defaultValue,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  defaultValue?: string
  type?: string
  required?: boolean
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-bold uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-sm outline-none focus:border-zeo-coral"
      />
    </label>
  )
}
