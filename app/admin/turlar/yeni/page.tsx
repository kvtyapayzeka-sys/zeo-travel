import { TourForm } from '@/components/admin/tour-form'
import { prisma } from '@/lib/prisma'

export default async function NewTourPage() {
  const categories = await prisma.tourCategory.findMany({
    select: { id: true, name: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">Katalog</p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none">
          Yeni tur
        </h1>
      </header>
      <TourForm categories={categories} />
    </div>
  )
}
