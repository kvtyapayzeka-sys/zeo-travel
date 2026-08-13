'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TourCard } from '@/components/home/tour-card'
import { getTours, getCategories } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Grid3x3, List, SlidersHorizontal, X } from 'lucide-react'

interface FilterPanelProps {
  categories: ReturnType<typeof getCategories>
  totalCount: number
  selectedCategory: string
  setSelectedCategory: (v: string) => void
  priceRange: [number, number]
  setPriceRange: (v: [number, number]) => void
  sortBy: string
  setSortBy: (v: string) => void
  onClear: () => void
}

function FilterPanel({
  categories,
  totalCount,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClear,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
          Kategori
        </h3>
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition hover:bg-zeo-ink/5">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-4 w-4 accent-zeo-coral"
            />
            <span className="text-[14px] text-zeo-ink">Tümü</span>
            <span className="ml-auto text-[12px] text-zeo-ink/40">({totalCount})</span>
          </label>
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition hover:bg-zeo-ink/5"
            >
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={selectedCategory === category.slug}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-4 w-4 accent-zeo-coral"
              />
              <span className="text-[14px] text-zeo-ink">{category.name}</span>
              <span className="ml-auto text-[12px] text-zeo-ink/40">({category.tourCount})</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
          Fiyat Aralığı
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-zeo-coral"
          />
          <div className="flex items-center justify-between text-[13px] text-zeo-ink/60">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-zeo-ink">
          Sıralama
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border-2 border-zeo-ink/20 bg-white px-4 py-3 text-[14px] text-zeo-ink focus:border-zeo-coral focus:outline-none"
        >
          <option value="popular">Popülerlik</option>
          <option value="price-low">Fiyat (Düşük-Yüksek)</option>
          <option value="price-high">Fiyat (Yüksek-Düşük)</option>
        </select>
      </div>

      <Button variant="outline" className="w-full" onClick={onClear}>
        Filtreleri Temizle
      </Button>
    </div>
  )
}

export default function ToursPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState<string>('popular')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const tours = getTours()
  const categories = getCategories()

  const filteredTours = tours
    .filter((tour) => {
      if (selectedCategory !== 'all' && tour.category.slug !== selectedCategory) {
        return false
      }
      if (tour.priceAdult < priceRange[0] || tour.priceAdult > priceRange[1]) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.priceAdult - b.priceAdult
      if (sortBy === 'price-high') return b.priceAdult - a.priceAdult
      return Number(b.isHighlighted) - Number(a.isHighlighted)
    })

  function clearFilters() {
    setSelectedCategory('all')
    setPriceRange([0, 5000])
    setSortBy('popular')
  }

  return (
    <div className="bg-zeo-sand py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-bricolage text-4xl font-extrabold uppercase leading-none text-zeo-ink lg:text-5xl">
            Tüm Turlar
          </h1>
          <p className="mt-3 text-[14px] text-zeo-ink/60">
            {filteredTours.length} tur bulundu
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar - Filters (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 border-2 border-zeo-ink bg-white p-6">
              <FilterPanel
                categories={categories}
                totalCount={tours.length}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClear={clearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Izgara görünümü"
                  onClick={() => setViewMode('grid')}
                  className={`flex h-10 w-10 items-center justify-center border-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'border-zeo-ink bg-zeo-ink text-white'
                      : 'border-zeo-ink/20 text-zeo-ink hover:border-zeo-ink'
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Liste görünümü"
                  onClick={() => setViewMode('list')}
                  className={`flex h-10 w-10 items-center justify-center border-2 transition-colors ${
                    viewMode === 'list'
                      ? 'border-zeo-ink bg-zeo-ink text-white'
                      : 'border-zeo-ink/20 text-zeo-ink hover:border-zeo-ink'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
            </div>

            {/* Tours Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTours.map((tour) => (
                  <a
                    key={tour.id}
                    href={`/turlar/${tour.slug}`}
                    className="group flex gap-4 border-2 border-zeo-ink bg-white p-4 transition-shadow hover:shadow-[6px_6px_0_0_#0a1420]"
                  >
                    <img
                      src={tour.images[0]}
                      alt={tour.title}
                      className="h-32 w-48 shrink-0 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">{tour.category.name}</p>
                      <h3 className="mt-1 text-[16px] font-bold text-zeo-ink">
                        {tour.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] text-zeo-ink/60">
                        {tour.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bricolage text-lg font-extrabold text-zeo-coral">
                          {formatPrice(tour.priceAdult)}
                          <span className="ml-1 text-[12px] font-normal text-zeo-ink/50">/ kişi</span>
                        </span>
                        <Button size="sm">İncele</Button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {filteredTours.length === 0 && (
              <div className="border-2 border-dashed border-zeo-ink/20 py-16 text-center">
                <p className="mb-4 text-[15px] text-zeo-ink/60">
                  Aradığınız kriterlere uygun tur bulunamadı
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-zeo-ink/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto border-t-2 border-zeo-ink bg-zeo-sand p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[16px] font-bold uppercase tracking-[0.06em] text-zeo-ink">Filtrele</h2>
              <button
                type="button"
                aria-label="Kapat"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center border-2 border-zeo-ink/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FilterPanel
              categories={categories}
              totalCount={tours.length}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={clearFilters}
            />
            <Button className="mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
              Sonuçları Gör ({filteredTours.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
