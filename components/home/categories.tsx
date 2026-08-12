import Link from 'next/link'
import { getCategories } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

export function Categories() {
  const categories = getCategories()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-zeo-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-h1 font-bold text-zeo-neutral-900 mb-4">
            Kategoriler
          </h2>
          <p className="text-body-lg text-zeo-neutral-600 max-w-2xl mx-auto">
            İlgi alanınıza göre filtreleyerek size en uygun aktiviteyi bulun
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/turlar?kategori=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-body-lg font-semibold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-caption text-white/80">
                  {category.tourCount} tur
                </p>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-zeo-primary-500 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
