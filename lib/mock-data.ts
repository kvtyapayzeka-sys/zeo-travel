export interface Tour {
  id: string
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: {
    id: string
    name: string
    slug: string
  }
  priceAdult: number
  priceChild: number
  currency: string
  duration: number // minutes
  maxCapacity: number
  images: string[]
  features: string[]
  included: string[]
  excluded: string[]
  rating: number
  reviewCount: number
  isHighlighted: boolean
}

export interface Category {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string
  icon: string
  tourCount: number
  image: string
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tekne Turları',
    nameEn: 'Boat Tours',
    slug: 'tekne-turlari',
    description: 'Turkuaz sularda unutulmaz bir gün',
    icon: '⛵',
    tourCount: 24,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'ATV Safari',
    nameEn: 'ATV Safari',
    slug: 'atv-safari',
    description: 'Adrenalin dolu off-road macera',
    icon: '🏍️',
    tourCount: 12,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'Yamaç Paraşütü',
    nameEn: 'Paragliding',
    slug: 'yamac-parasutu',
    description: 'Gökyüzünde özgürce uçun',
    icon: '🪂',
    tourCount: 8,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    name: 'Dalış',
    nameEn: 'Diving',
    slug: 'dalis',
    description: 'Deniz altı dünyasını keşfedin',
    icon: '🤿',
    tourCount: 15,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    name: 'At Turu',
    nameEn: 'Horse Riding',
    slug: 'at-turu',
    description: 'Doğada huzurlu bir yolculuk',
    icon: '🐴',
    tourCount: 6,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    name: 'Jeep Safari',
    nameEn: 'Jeep Safari',
    slug: 'jeep-safari',
    description: 'Toros Dağları\'nda macera',
    icon: '🚙',
    tourCount: 18,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop'
  },
]

export const tours: Tour[] = [
  {
    id: '1',
    slug: 'kemer-tekne-turu',
    title: 'Kemer Tekne Turu - 3 Koy',
    titleEn: 'Kemer Boat Tour - 3 Bays',
    description: 'Kemer\'in en güzel 3 koyunu gezerek, tertemiz sularda yüzme ve şnorkelle deniz altı dünyasını görme fırsatı. Öğle yemeği dahil, tam gün aktivite.',
    descriptionEn: 'Visit the 3 most beautiful bays of Kemer, swimming in crystal clear waters and snorkeling. Lunch included, full day activity.',
    category: {
      id: '1',
      name: 'Tekne Turları',
      slug: 'tekne-turlari'
    },
    priceAdult: 2499,
    priceChild: 1499,
    currency: 'TRY',
    duration: 480, // 8 hours
    maxCapacity: 50,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&h=800&fit=crop',
    ],
    features: ['Öğle Yemeği', 'Transferler', 'Sigorta', 'Ekipman'],
    included: ['Otel transferi', 'Açık büfe öğle yemeği', 'İçecekler (alkolsüz)', 'Şnorkel ekipmanları', 'Sigorta'],
    excluded: ['Alkollü içecekler', 'Fotoğraf servisi', 'Kişisel harcamalar'],
    rating: 4.8,
    reviewCount: 234,
    isHighlighted: true,
  },
  {
    id: '2',
    slug: 'alanya-paragliding',
    title: 'Alanya Yamaç Paraşütü',
    titleEn: 'Alanya Paragliding',
    description: 'Alanya\'nın nefes kesen manzarasını 800 metre yükseklikten yamaç paraşütü ile keşfedin. Profesyonel pilot eşliğinde güvenli ve unutulmaz bir deneyim.',
    descriptionEn: 'Discover the breathtaking views of Alanya from 800 meters with paragliding. Safe and unforgettable experience with professional pilot.',
    category: {
      id: '3',
      name: 'Yamaç Paraşütü',
      slug: 'yamac-parasutu'
    },
    priceAdult: 3500,
    priceChild: 3500,
    currency: 'TRY',
    duration: 180, // 3 hours
    maxCapacity: 20,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    ],
    features: ['Profesyonel Pilot', 'Video Çekimi', 'Sigorta', 'Transfer'],
    included: ['Otel transferi', 'Tam ekipman', 'Profesyonel pilot', 'Uçuş sigortası', 'Video çekimi (opsiyonel)'],
    excluded: ['Fotoğraf ve video paketi (350₺)', 'Kişisel harcamalar'],
    rating: 4.9,
    reviewCount: 456,
    isHighlighted: true,
  },
  {
    id: '3',
    slug: 'antalya-atv-safari',
    title: 'Antalya ATV Safari Turu',
    titleEn: 'Antalya ATV Safari Tour',
    description: 'Toros Dağları eteklerinde off-road ATV macerası. Çamur banyosu, nehir geçişi ve muhteşem manzaralar. Eğitim ve ekipman dahil.',
    descriptionEn: 'Off-road ATV adventure at the foothills of Taurus Mountains. Mud bath, river crossing and stunning views. Training and equipment included.',
    category: {
      id: '2',
      name: 'ATV Safari',
      slug: 'atv-safari'
    },
    priceAdult: 1899,
    priceChild: 1299,
    currency: 'TRY',
    duration: 240, // 4 hours
    maxCapacity: 30,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop',
    ],
    features: ['Tam Ekipman', 'Eğitim', 'Rehber', 'Sigorta'],
    included: ['Otel transferi', 'ATV ekipmanları (kask, gözlük)', 'Eğitim', 'Profesyonel rehber', 'Sigorta'],
    excluded: ['İçecekler', 'Fotoğraf servisi', 'Ekstra aktiviteler'],
    rating: 4.7,
    reviewCount: 189,
    isHighlighted: true,
  },
  {
    id: '4',
    slug: 'side-dalis-turu',
    title: 'Side Dalış Turu - 2 Dalış',
    titleEn: 'Side Diving Tour - 2 Dives',
    description: 'Side\'nin berrak sularında 2 farklı noktada dalış yapma fırsatı. Başlangıç seviyesi için uygundur. PADI sertifikalı eğitmenler eşliğinde.',
    descriptionEn: 'Diving opportunity at 2 different points in the clear waters of Side. Suitable for beginners. With PADI certified instructors.',
    category: {
      id: '4',
      name: 'Dalış',
      slug: 'dalis'
    },
    priceAdult: 2799,
    priceChild: 0, // Not suitable for children
    currency: 'TRY',
    duration: 360, // 6 hours
    maxCapacity: 15,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=800&fit=crop',
    ],
    features: ['PADI Sertifikalı', '2 Dalış', 'Ekipman', 'Öğle Yemeği'],
    included: ['Otel transferi', 'Tüm dalış ekipmanları', 'PADI sertifikalı eğitmen', 'Öğle yemeği', 'Sigorta'],
    excluded: ['Fotoğraf ve video çekimi', 'Alkollü içecekler'],
    rating: 4.9,
    reviewCount: 98,
    isHighlighted: false,
  },
  {
    id: '5',
    slug: 'belek-at-safari',
    title: 'Belek At Safari Turu',
    titleEn: 'Belek Horse Riding Safari',
    description: 'Belek\'in eşsiz doğasında at sırtında keyifli bir yolculuk. Deniz kenarı ve orman içi rotalarda 2 saatlik tur. Tüm seviyeler için uygundur.',
    descriptionEn: 'Relaxing horse riding journey in the unique nature of Belek. 2-hour tour on seaside and forest trails. Suitable for all levels.',
    category: {
      id: '5',
      name: 'At Turu',
      slug: 'at-turu'
    },
    priceAdult: 1599,
    priceChild: 1199,
    currency: 'TRY',
    duration: 120, // 2 hours
    maxCapacity: 12,
    images: [
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    ],
    features: ['Eğitimli Atlar', 'Rehber', 'Ekipman', 'İçecek'],
    included: ['Otel transferi', 'At ekipmanları', 'Profesyonel rehber', 'İçecek molası', 'Sigorta'],
    excluded: ['Fotoğraf servisi', 'Kişisel harcamalar'],
    rating: 4.6,
    reviewCount: 67,
    isHighlighted: false,
  },
  {
    id: '6',
    slug: 'manavgat-jeep-safari',
    title: 'Manavgat Jeep Safari - Toros Dağları',
    titleEn: 'Manavgat Jeep Safari - Taurus Mountains',
    description: 'Toros Dağları\'nda Jeep Safari ile macera dolu bir gün. Yerel köyler, Manavgat Şelalesi ve muhteşem manzaralar. Öğle yemeği dahil.',
    descriptionEn: 'Adventure-filled day with Jeep Safari in Taurus Mountains. Local villages, Manavgat Waterfall and stunning views. Lunch included.',
    category: {
      id: '6',
      name: 'Jeep Safari',
      slug: 'jeep-safari'
    },
    priceAdult: 1999,
    priceChild: 1299,
    currency: 'TRY',
    duration: 420, // 7 hours
    maxCapacity: 40,
    images: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    ],
    features: ['Off-Road', 'Öğle Yemeği', 'Şelale Ziyareti', 'Köy Turu'],
    included: ['Otel transferi', 'Jeep Safari', 'Öğle yemeği', 'Rehber', 'Sigorta'],
    excluded: ['İçecekler (restoranda)', 'Fotoğraf servisi', 'Manavgat Şelalesi giriş ücreti (10₺)'],
    rating: 4.7,
    reviewCount: 145,
    isHighlighted: true,
  },
]

export function getTours(): Tour[] {
  return tours
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(tour => tour.slug === slug)
}

export function getToursByCategory(categorySlug: string): Tour[] {
  return tours.filter(tour => tour.category.slug === categorySlug)
}

export function getHighlightedTours(): Tour[] {
  return tours.filter(tour => tour.isHighlighted)
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug)
}
