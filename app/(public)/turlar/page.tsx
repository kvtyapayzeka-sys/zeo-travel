'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TourCard } from '@/components/home/tour-card'
import { getTours, getCategories } from '@/lib/mock-data'
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react'

export default function ToursPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState<string>('popular')

  const tours = getTours()
  const categories = getCategories()

  // Filter logic (would be moved to API in production)
  const filteredTours = tours.filter((tour) => {
    if (selectedCategory !== 'all' && tour.category.slug !== selectedCategory) {
      return false
    }
    if (tour.priceAdult < priceRange[0] || tour.priceAdult > priceRange[1]) {
      return false
    }
    return true
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-zeo-neutral-900 mb-2">
            Tüm Turlar
          </h1>
          <p className="text-body-lg text-zeo-neutral-600">
            {filteredTours.length} tur bulundu
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar - Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-white rounded-2xl p-6 shadow-lg border border-zeo-neutral-200">
              <div>
                <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">
                  Kategori
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-zeo-neutral-50 p-2 rounded-lg transition">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-5 h-5 accent-zeo-primary-500"
                    />
                    <span className="text-body">Tümü</span>
                    <span className="ml-auto text-caption text-zeo-neutral-500">
                      ({tours.length})
                    </span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-zeo-neutral-50 p-2 rounded-lg transition"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.slug}
                        checked={selectedCategory === category.slug}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-5 h-5 accent-zeo-primary-500"
                      />
                      <span className="text-body">{category.name}</span>
                      <span className="ml-auto text-caption text-zeo-neutral-500">
                        ({category.tourCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">
                  Fiyat Aralığı
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-zeo-primary-500"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border border-zeo-neutral-300 rounded text-body-sm"
                      placeholder="Min"
                    />
                    <span className="text-zeo-neutral-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 px-2 py-1 border border-zeo-neutral-300 rounded text-body-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">
                  Sıralama
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
                >
                  <option value="popular">Popülerlik</option>
                  <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                  <option value="rating">Puan</option>
                </select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 5000])
                  setSortBy('popular')
                }}
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="lg:hidden"
                size="sm"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
            </div>

            {/* Tours Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-lg border border-zeo-neutral-200 hover:shadow-xl transition"
                  >
                    <img
                      src={tour.images[0]}
                      alt={tour.title}
                      className="w-48 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-h4 text-zeo-neutral-900 mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-body-sm text-zeo-neutral-600 line-clamp-2 mb-4">
                        {tour.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-h3 font-bold text-zeo-primary-600">
                            ₺{tour.priceAdult}
                          </span>
                          <span className="text-body-sm text-zeo-neutral-600 ml-2">
                            / kişi
                          </span>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/turlar/${tour.slug}`}>İncele →</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredTours.length === 0 && (
              <div className="text-center py-16">
                <p className="text-body-lg text-zeo-neutral-600 mb-4">
                  Aradığınız kriterlere uygun tur bulunamadı
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all')
                    setPriceRange([0, 5000])
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
