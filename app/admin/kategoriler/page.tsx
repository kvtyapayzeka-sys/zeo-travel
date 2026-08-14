import { CategoryManager } from '@/components/admin/category-manager'
import { prisma } from '@/lib/prisma'

export default async function CategoriesAdminPage() {
  const categories = await prisma.tourCategory.findMany({
    include: { _count: { select: { tours: true } } },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-zeo-coral">
          Katalog
        </p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none lg:text-5xl">
          Kategoriler
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zeo-ink/55">
          Tur sınıflandırmasını ve public keşif sırasını yönetin.
        </p>
      </header>

      <CategoryManager
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          nameEn: category.nameEn,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          sortOrder: category.sortOrder,
          tourCount: category._count.tours,
        }))}
      />
    </div>
  )
}
