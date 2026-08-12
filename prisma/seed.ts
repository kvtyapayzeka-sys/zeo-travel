import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { addDays } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create Super Admin User
  console.log('Creating super admin user...')
  const adminPassword = await hash('Admin123!', 10)
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@zeotravel.com' },
    update: {},
    create: {
      email: 'admin@zeotravel.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'Zeo Travel',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  })
  console.log('✓ Super admin created:', superAdmin.email)

  // 2. Create Tour Categories
  console.log('\nCreating tour categories...')
  const categories = [
    {
      name: 'Su Sporları',
      nameEn: 'Water Sports',
      slug: 'su-sporlari',
      description: 'Denizde yapılan heyecan verici aktiviteler',
      icon: '🌊',
      sortOrder: 1,
    },
    {
      name: 'Kara Sporları',
      nameEn: 'Land Sports',
      slug: 'kara-sporlari',
      description: 'Karada yapılan macera dolu aktiviteler',
      icon: '🏔️',
      sortOrder: 2,
    },
    {
      name: 'Hava Sporları',
      nameEn: 'Air Sports',
      slug: 'hava-sporlari',
      description: 'Havada yapılan adrenalin dolu aktiviteler',
      icon: '🪂',
      sortOrder: 3,
    },
    {
      name: 'Tekne Turları',
      nameEn: 'Boat Tours',
      slug: 'tekne-turlari',
      description: 'Akdeniz\'de unutulmaz tekne gezileri',
      icon: '⛵',
      sortOrder: 4,
    },
  ]

  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.tourCategory.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
    )
  )
  console.log('✓ Categories created:', createdCategories.length)

  // 3. Create Sample Tours
  console.log('\nCreating sample tours...')
  const tours = [
    {
      categoryId: createdCategories[3].id, // Tekne Turları
      title: 'Kemer Tekne Turu - Günlük Gezi',
      titleEn: 'Kemer Boat Tour - Full Day',
      slug: 'kemer-tekne-turu',
      description:
        'Akdeniz\'in turkuaz sularında unutulmaz bir gün geçirin. Öğle yemeği, içecekler ve yüzme molaları dahil. Phaselis antik kentini ziyaret edin, koyları keşfedin.',
      descriptionEn:
        'Spend an unforgettable day in the turquoise waters of the Mediterranean. Includes lunch, drinks and swimming breaks. Visit the ancient city of Phaselis and explore the bays.',
      priceAdult: 500,
      priceChild: 300,
      priceInfant: 0,
      currency: 'TRY',
      duration: 480, // 8 hours
      maxCapacity: 50,
      minParticipants: 1,
      features: ['Öğle yemeği dahil', 'Sınırsız içecek', 'Yüzme molaları', 'Müzik ve eğlence', 'Deneyimli kaptan'],
      included: ['Otel transferi', 'Öğle yemeği', 'Soft içecekler', 'Sigorta', 'Rehber'],
      excluded: ['Alkollü içecekler', 'Fotoğraf hizmetleri', 'Ekstra aktiviteler'],
      whatToBring: ['Güneş kremi', 'Mayo', 'Havlu', 'Güneş gözlüğü'],
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      ],
      availableDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
      startTimes: ['09:00'],
      status: 'ACTIVE',
      isHighlighted: true,
      sortOrder: 1,
      createdBy: superAdmin.id,
    },
    {
      categoryId: createdCategories[0].id, // Su Sporları
      title: 'Parasailing Antalya',
      titleEn: 'Parasailing Antalya',
      slug: 'parasailing-antalya',
      description:
        'Antalya kıyılarında eşsiz bir deneyim! 50 metre yükseklikten Akdeniz\'in muhteşem manzarasını izleyin. Profesyonel ekip eşliğinde güvenli ve heyecanlı bir uçuş.',
      descriptionEn:
        'A unique experience on the Antalya coast! Watch the magnificent view of the Mediterranean from a height of 50 meters. Safe and exciting flight with professional team.',
      priceAdult: 400,
      priceChild: 400,
      priceInfant: 0,
      currency: 'TRY',
      duration: 30,
      maxCapacity: 20,
      minParticipants: 1,
      features: ['Profesyonel ekip', 'Güvenlik ekipmanları', '10-12 dakika uçuş', 'Fotoğraf çekimi'],
      included: ['Can yeleği', 'Tüm ekipman', 'Sigorta', 'Kısa eğitim'],
      excluded: ['Otel transferi', 'Fotoğraflar', 'Video çekimi'],
      whatToBring: ['Rahat kıyafet', 'Güneş gözlüğü'],
      images: [
        'https://images.unsplash.com/photo-1559291001-693fb9166cba?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      ],
      availableDays: [0, 1, 2, 3, 4, 5, 6], // Every day
      startTimes: ['10:00', '14:00', '16:00'],
      status: 'ACTIVE',
      isHighlighted: true,
      sortOrder: 2,
      createdBy: superAdmin.id,
    },
    {
      categoryId: createdCategories[1].id, // Kara Sporları
      title: 'ATV Safari Turu',
      titleEn: 'ATV Safari Tour',
      slug: 'atv-safari-turu',
      description:
        'Toros Dağları\'nda adrenalin dolu ATV safari turu! Dağ yolları, ormanlık alanlar ve köyler arasından geçerek unutulmaz bir macera yaşayın. Eğitim ve ekipman dahil.',
      descriptionEn:
        'Adrenaline-filled ATV safari tour in the Taurus Mountains! Experience an unforgettable adventure through mountain roads, forests and villages. Training and equipment included.',
      priceAdult: 350,
      priceChild: 250,
      priceInfant: 0,
      currency: 'TRY',
      duration: 120, // 2 hours
      maxCapacity: 30,
      minParticipants: 1,
      features: ['Profesyonel rehber', 'Toz maskesi', 'Kask', 'Kısa eğitim', 'Mola'],
      included: ['ATV kiralama', 'Kask ve ekipman', 'Sigorta', 'Rehber eşliği'],
      excluded: ['Otel transferi (ek ücret)', 'Fotoğraflar', 'İçecekler'],
      whatToBring: ['Rahat ve kirlenebilecek kıyafet', 'Spor ayakkabı', 'Güneş gözlüğü'],
      images: [
        'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      ],
      availableDays: [0, 1, 2, 3, 4, 5, 6],
      startTimes: ['09:00', '14:00'],
      status: 'ACTIVE',
      isHighlighted: false,
      sortOrder: 3,
      createdBy: superAdmin.id,
    },
    {
      categoryId: createdCategories[2].id, // Hava Sporları
      title: 'Yamaç Paraşütü - Alanya',
      titleEn: 'Paragliding - Alanya',
      slug: 'yamac-parasutu-alanya',
      description:
        '2000 metre yükseklikten Alanya ve Akdeniz\'in kuş bakışı manzarası! Deneyimli pilotlarla tandem uçuş. 20-25 dakikalık unutulmaz bir deneyim.',
      descriptionEn:
        'Bird\'s eye view of Alanya and the Mediterranean from 2000 meters! Tandem flight with experienced pilots. An unforgettable 20-25 minute experience.',
      priceAdult: 800,
      priceChild: 800,
      priceInfant: 0,
      currency: 'TRY',
      duration: 180, // 3 hours (including transport)
      maxCapacity: 10,
      minParticipants: 1,
      features: ['Deneyimli pilot', 'Fotoğraf çekimi', '20-25 dk uçuş', 'Sigorta', 'Sertifika'],
      included: ['Otel transferi', 'Tüm ekipman', 'Sigorta', 'Fotoğraf ve video'],
      excluded: ['Kişisel harcamalar'],
      whatToBring: ['Spor ayakkabı', 'Rüzgarlık', 'Güneş gözlüğü'],
      images: [
        'https://images.unsplash.com/photo-1570708301634-956e7e347f7f?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      ],
      availableDays: [0, 1, 2, 3, 4, 5, 6],
      startTimes: ['10:00', '13:00'],
      status: 'ACTIVE',
      isHighlighted: true,
      sortOrder: 4,
      createdBy: superAdmin.id,
    },
  ]

  const createdTours = await Promise.all(
    tours.map((tour) =>
      prisma.tour.upsert({
        where: { slug: tour.slug },
        update: tour,
        create: tour,
      })
    )
  )
  console.log('✓ Tours created:', createdTours.length)

  // 4. Create Tour Availability (next 30 days)
  console.log('\nCreating tour availability...')
  const today = new Date()
  
  for (const tour of createdTours) {
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i)
      const dayOfWeek = date.getDay()
      
      // Check if tour is available on this day
      if (tour.availableDays.includes(dayOfWeek)) {
        for (const timeSlot of tour.startTimes) {
          await prisma.tourAvailability.create({
            data: {
              tourId: tour.id,
              date,
              timeSlot,
              availableSpots: tour.maxCapacity,
              totalSpots: tour.maxCapacity,
              isBlocked: false,
            },
          })
        }
      }
    }
  }
  console.log('✓ Tour availability created for next 30 days')

  // 5. Create Site Config - Bank Accounts
  console.log('\nCreating site config...')
  await prisma.siteConfig.upsert({
    where: { key: 'payment.bank_accounts' },
    update: {},
    create: {
      key: 'payment.bank_accounts',
      value: [
        {
          bankName: 'Garanti BBVA',
          iban: 'TR00 0000 0000 0000 0000 0000 00',
          accountHolder: 'Zeo Travel Turizm Ltd. Şti.',
          accountNumber: '1234567',
        },
        {
          bankName: 'İş Bankası',
          iban: 'TR11 1111 1111 1111 1111 1111 11',
          accountHolder: 'Zeo Travel Turizm Ltd. Şti.',
          accountNumber: '7654321',
        },
      ],
      description: 'Havale/EFT için banka hesap bilgileri',
      updatedBy: superAdmin.id,
    },
  })

  await prisma.siteConfig.upsert({
    where: { key: 'general.site_name' },
    update: {},
    create: {
      key: 'general.site_name',
      value: 'Zeo Travel',
      description: 'Site adı',
    },
  })

  await prisma.siteConfig.upsert({
    where: { key: 'general.contact_email' },
    update: {},
    create: {
      key: 'general.contact_email',
      value: 'info@zeotravel.com',
      description: 'İletişim email adresi',
    },
  })
  console.log('✓ Site config created')

  console.log('\n✅ Seed completed successfully!')
  console.log('\n📝 Login credentials:')
  console.log('Email: admin@zeotravel.com')
  console.log('Password: Admin123!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
