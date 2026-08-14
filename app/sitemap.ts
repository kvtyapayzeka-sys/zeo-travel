import { MetadataRoute } from 'next'
import { getPublicCategories, getPublicTours } from '@/lib/data/public'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zeotravel.com'
  
  const [tours, categories] = await Promise.all([
    getPublicTours(),
    getPublicCategories(),
  ])

  const tourUrls = tours.map((tour) => ({
    url: `${baseUrl}/turlar/${tour.slug}`,
    lastModified: new Date(tour.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/turlar?kategori=${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/turlar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...tourUrls,
    ...categoryUrls,
  ]
}
