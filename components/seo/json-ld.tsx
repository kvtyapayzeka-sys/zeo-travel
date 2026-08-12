import type { Tour } from '@/lib/mock-data'

interface OrganizationSchemaProps {
  name: string
  url: string
  logo?: string
  description?: string
}

export function OrganizationSchema({ name, url, logo, description }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Antalya',
      addressLocality: 'Antalya',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-555-123-4567',
      contactType: 'Customer Service',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English'],
    },
    sameAs: [
      'https://facebook.com/zeotravel',
      'https://instagram.com/zeotravel',
      'https://twitter.com/zeotravel',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface TourSchemaProps {
  tour: Tour
  url: string
}

export function TourSchema({ tour, url }: TourSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    image: tour.images,
    url,
    offers: {
      '@type': 'Offer',
      price: tour.priceAdult,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    touristType: 'https://schema.org/Adult',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: 1,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: tour.title,
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
