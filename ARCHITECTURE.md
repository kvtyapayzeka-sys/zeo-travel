# ZEO TRAVEL TURİZM ACENTASI - MİMARİ DOKÜMANTASYON

## 📋 İÇİNDEKİLER
1. [Proje Özeti](#proje-özeti)
2. [Teknik Stack](#teknik-stack)
3. [Veritabanı Şeması](#veritabanı-şeması)
4. [API Mimarisi](#api-mimarisi)
5. [Villa Entegrasyonu](#villa-entegrasyonu)
6. [Ödeme Sistemleri](#ödeme-sistemleri)
7. [Admin Paneli](#admin-paneli)
8. [Proje Klasör Yapısı](#proje-klasör-yapısı)
9. [Güvenlik & Performans](#güvenlik-performans)
10. [Deployment Stratejisi](#deployment-stratejisi)

---

## 🎯 PROJE ÖZETİ

**Zeo Travel**, Türkiye pazarına yönelik modern bir turizm acentası platformu. Platform, çoklu tur türlerini yönetebilmeli, mevcut villa kiralama sitesiyle entegre çalışabilmeli ve gelecekte ölçeklenebilir olmalı.

### Temel İş Gereksinimleri
- ✅ Çoklu tur türleri (Tekne, Parasailing, ATV, Safari, Yamaç Paraşütü, At Turu, vb.)
- ✅ Dinamik tur ekleme/çıkarma (Admin tarafından)
- ✅ Tarih bazlı rezervasyon sistemi (Kapasite yönetimi)
- ✅ İlk faz: Havale/EFT, İkinci faz: Sanal POS
- ✅ Villa kiralama sitesi ile güvenli entegrasyon
- ✅ Türkçe/İngilizce çoklu dil desteği

---

## 🛠️ TEKNİK STACK

### **UYARI: İtiraz ve Öneri**
Erdal abi, burada senin için **en iyi** değil, **en uygun** stack'i seçeceğim. Çünkü bu proje için aşırı kompleks teknolojiler kullanmak, maintainability ve maliyet açısından hata olur.

### Frontend
```
Framework: Next.js 14+ (App Router)
Stil: Tailwind CSS + Shadcn UI
State Management: Zustand (Redux'a göre daha hafif)
Form Yönetimi: React Hook Form + Zod
İstemci İletişimi: TanStack Query (React Query)
Tarih İşlemleri: date-fns (moment.js'den hafif)
Çoklu Dil: next-intl
```

**Neden Next.js?**
- ✅ SEO optimizasyonu (SSR/SSG) - Turizm siteleri için kritik
- ✅ Image optimization (tur fotoğrafları için önemli)
- ✅ API routes (Backend'siz başlayıp sonra mikro servisleştirebilirsin)
- ✅ File-based routing (Hızlı geliştirme)
- ✅ Vercel deploy (Türkiye CDN desteği)

**Neden Shadcn UI?**
- ✅ Tamamen özelleştirilebilir (Avant-garde tasarım için)
- ✅ Accessibility built-in (WCAG uyumlu)
- ✅ Kopyala-yapıştır mantığı (Vendor lock-in yok)

### Backend
```
Framework: Node.js + Express.js / VEYA Nest.js (daha kurumsal yaklaşım için)
ORM: Prisma (TypeScript native, migration yönetimi mükemmel)
Doğrulama: Zod (Frontend ile aynı şemalar kullanılabilir)
Authentication: NextAuth.js (OAuth + credential support)
Background Jobs: BullMQ + Redis (Email, bildirimler için)
```

**İtirazım Var:**
Eğer proje 1-2 yıl içinde çok büyüyecekse (10+ tur türü, 1000+ günlük rezervasyon), **Nest.js + GraphQL** tercih et. Ama küçük başlayıp büyümek istiyorsan, **Next.js API Routes + Express.js** yeterli.

**Öneri:** Başlangıç için Next.js API Routes ile başla, ihtiyaç olursa Nest.js'e geç.

### Database
```
Primary DB: PostgreSQL 15+
Cache Layer: Redis (Session, rate limiting, API cache)
Search Engine: PostgreSQL Full-Text Search (ilk faz) → Elasticsearch (opsiyonel, büyüyünce)
File Storage: AWS S3 / Cloudflare R2 (Türkiye'den hızlı)
```

**Neden PostgreSQL?**
- ✅ JSON support (Esnek tur özellikleri için)
- ✅ Full-text search (Türkçe arama için pg_trgm extension)
- ✅ JSONB indexing (Performanslı sorgular)
- ✅ Transactional integrity (Ödeme sistemleri için kritik)
- ❌ MongoDB değil çünkü: İlişkisel veri ağırlıklı (turlar-rezervasyonlar-kullanıcılar)

### Hosting & DevOps
```
Frontend: Vercel (Next.js için optimize, Türkiye CDN var)
Backend API: Railway / Render / DigitalOcean App Platform
Database: Supabase (PostgreSQL managed) / Railway
Redis: Upstash (Serverless Redis, Türkiye'den düşük latency)
CI/CD: GitHub Actions
Monitoring: Sentry + Vercel Analytics
```

**Türkiye Özel Not:**
- ✅ Vercel'in İstanbul CDN'i var (hız için kritik)
- ✅ Cloudflare R2 Türkiye'den hızlı
- ⚠️ AWS'yi tercih edersen: eu-central-1 (Frankfurt) seç, Istanbul'dan 40-50ms latency

---

## 🗄️ VERİTABANI ŞEMASI

### Prisma Schema Tasarımı

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// KULLANICI YÖNETİMİ
// ============================================

enum UserRole {
  CUSTOMER
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

model User {
  id            String       @id @default(cuid())
  email         String       @unique
  phone         String?      @unique
  passwordHash  String?      // OAuth kullanıcılar için null olabilir
  firstName     String
  lastName      String
  role          UserRole     @default(CUSTOMER)
  status        UserStatus   @default(ACTIVE)
  emailVerified DateTime?
  phoneVerified DateTime?
  
  // OAuth fields
  oauthProvider String?      // google, facebook, etc.
  oauthId       String?
  
  // İlişkiler
  reservations  Reservation[]
  payments      Payment[]
  reviews       Review[]
  
  // Metadata
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  lastLoginAt   DateTime?
  
  @@index([email])
  @@index([phone])
  @@map("users")
}

// ============================================
// TUR YÖNETİMİ
// ============================================

enum TourStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

model TourCategory {
  id          String   @id @default(cuid())
  name        String   @unique // "Su Sporları", "Kara Sporları", etc.
  nameEn      String   // İngilizce adı
  slug        String   @unique
  description String?
  icon        String?  // Icon URL veya emoji
  sortOrder   Int      @default(0)
  tours       Tour[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("tour_categories")
}

model Tour {
  id             String      @id @default(cuid())
  categoryId     String
  category       TourCategory @relation(fields: [categoryId], references: [id])
  
  // Temel bilgiler
  title          String
  titleEn        String
  slug           String      @unique
  description    String      @db.Text
  descriptionEn  String      @db.Text
  
  // Fiyatlandırma
  priceAdult     Decimal     @db.Decimal(10, 2)
  priceChild     Decimal     @db.Decimal(10, 2)
  priceInfant    Decimal?    @db.Decimal(10, 2)
  currency       String      @default("TRY")
  
  // Süre ve kapasite
  duration       Int         // Dakika cinsinden
  maxCapacity    Int         // Günlük maksimum kişi sayısı
  minParticipants Int        @default(1)
  
  // Özellikler (JSON)
  features       Json        // ["Öğle yemeği dahil", "Fotoğraf çekimi", etc.]
  included       Json        // Dahil olanlar
  excluded       Json        // Dahil olmayanlar
  whatToBring    Json?       // Yanınızda getirmeniz gerekenler
  
  // Medya
  images         String[]    // Image URLs array
  videoUrl       String?
  
  // Zaman yönetimi
  availableDays  Int[]       // [0,1,2,3,4,5,6] (0=Pazar, 6=Cumartesi)
  startTimes     String[]    // ["09:00", "14:00"] gibi
  
  // Durum
  status         TourStatus  @default(ACTIVE)
  isHighlighted  Boolean     @default(false)
  sortOrder      Int         @default(0)
  
  // İlişkiler
  reservations   Reservation[]
  reviews        Review[]
  availability   TourAvailability[]
  
  // Metadata
  viewCount      Int         @default(0)
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
  createdBy      String?     // Admin user ID
  
  @@index([slug])
  @@index([categoryId])
  @@index([status])
  @@map("tours")
}

// Günlük kapasite yönetimi
model TourAvailability {
  id              String   @id @default(cuid())
  tourId          String
  tour            Tour     @relation(fields: [tourId], references: [id], onDelete: Cascade)
  
  date            DateTime @db.Date
  timeSlot        String   // "09:00", "14:00" gibi
  availableSpots  Int      // Kalan kapasite
  totalSpots      Int      // Toplam kapasite (tour.maxCapacity'den kopyalanır)
  
  // Özel durumlar
  isBlocked       Boolean  @default(false) // Admin tarafından manuel bloke
  blockReason     String?
  priceOverride   Decimal? @db.Decimal(10, 2) // Özel günlerde fiyat değişikliği
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@unique([tourId, date, timeSlot])
  @@index([tourId, date])
  @@map("tour_availability")
}

// ============================================
// REZERVASYON SİSTEMİ
// ============================================

enum ReservationStatus {
  PENDING           // Ödeme bekliyor
  CONFIRMED         // Ödeme alındı, onaylandı
  CANCELLED         // İptal edildi
  COMPLETED         // Tur tamamlandı
  NO_SHOW           // Gelmedi
  REFUNDED          // İade yapıldı
}

model Reservation {
  id                String              @id @default(cuid())
  reservationNumber String              @unique // ZEO-2024-001234 gibi
  
  // İlişkiler
  userId            String?
  user              User?               @relation(fields: [userId], references: [id])
  tourId            String
  tour              Tour                @relation(fields: [tourId], references: [id])
  
  // Tarih ve zaman
  tourDate          DateTime            @db.Date
  timeSlot          String
  
  // Katılımcı bilgileri
  adultCount        Int
  childCount        Int                 @default(0)
  infantCount       Int                 @default(0)
  totalParticipants Int
  
  // Fiyatlandırma
  pricePerAdult     Decimal             @db.Decimal(10, 2)
  pricePerChild     Decimal             @db.Decimal(10, 2)
  pricePerInfant    Decimal             @db.Decimal(10, 2)
  subtotal          Decimal             @db.Decimal(10, 2)
  discountAmount    Decimal             @default(0) @db.Decimal(10, 2)
  totalAmount       Decimal             @db.Decimal(10, 2)
  currency          String              @default("TRY")
  
  // İletişim bilgileri (kullanıcı kayıtlı değilse)
  guestEmail        String?
  guestPhone        String?
  guestFirstName    String?
  guestLastName     String?
  
  // Özel talepler
  specialRequests   String?             @db.Text
  pickupLocation    String?             // Otel transferi için
  
  // Durum
  status            ReservationStatus   @default(PENDING)
  
  // İlişkiler
  payments          Payment[]
  
  // Villa entegrasyon bilgisi
  villaReservationId String?            // Villa sisteminden gelen referans
  referralSource     String?            // "villa", "direct", "social_media"
  
  // Metadata
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  confirmedAt       DateTime?
  cancelledAt       DateTime?
  cancellationReason String?
  
  @@index([userId])
  @@index([tourId])
  @@index([reservationNumber])
  @@index([tourDate])
  @@index([status])
  @@map("reservations")
}

// ============================================
// ÖDEME SİSTEMİ
// ============================================

enum PaymentMethod {
  BANK_TRANSFER     // Havale/EFT
  CREDIT_CARD       // Kredi kartı (sanal POS)
  IYZICO           // İyzico entegrasyonu
  PAYTR            // PayTR entegrasyonu
  CASH             // Nakit (ofiste)
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

model Payment {
  id                String        @id @default(cuid())
  reservationId     String
  reservation       Reservation   @relation(fields: [reservationId], references: [id])
  userId            String?
  user              User?         @relation(fields: [userId], references: [id])
  
  // Ödeme detayları
  amount            Decimal       @db.Decimal(10, 2)
  currency          String        @default("TRY")
  method            PaymentMethod
  status            PaymentStatus @default(PENDING)
  
  // Havale için
  transferReference String?       // Dekont numarası
  transferProof     String?       // Dekont görsel URL
  
  // Sanal POS için
  transactionId     String?       // Banka işlem ID
  cardLastFour      String?       // Son 4 hane
  cardBrand         String?       // VISA, MASTERCARD
  installment       Int           @default(1)
  
  // Gateway bilgileri
  gatewayResponse   Json?         // İyzico/PayTR response
  
  // Metadata
  paidAt            DateTime?
  refundedAt        DateTime?
  refundAmount      Decimal?      @db.Decimal(10, 2)
  refundReason      String?
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  
  @@index([reservationId])
  @@index([userId])
  @@index([status])
  @@map("payments")
}

// ============================================
// DEĞERLENDIRME SİSTEMİ
// ============================================

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}

model Review {
  id            String       @id @default(cuid())
  tourId        String
  tour          Tour         @relation(fields: [tourId], references: [id])
  userId        String
  user          User         @relation(fields: [userId], references: [id])
  
  rating        Int          // 1-5 yıldız
  title         String?
  comment       String       @db.Text
  
  status        ReviewStatus @default(PENDING)
  
  // Faydalılık
  helpfulCount  Int          @default(0)
  
  // Admin moderasyonu
  adminComment  String?
  reviewedBy    String?      // Admin user ID
  reviewedAt    DateTime?
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  @@index([tourId])
  @@index([userId])
  @@index([status])
  @@map("reviews")
}

// ============================================
// ENTEGRASYON SİSTEMİ (Villa)
// ============================================

model IntegrationToken {
  id            String   @id @default(cuid())
  name          String   // "Villa Kiralama Sitesi"
  token         String   @unique // Güvenli random token
  secret        String   // HMAC secret
  
  // İzinler
  canCreateReservation Boolean @default(true)
  canCheckAvailability Boolean @default(true)
  
  // Rate limiting
  requestsPerHour Int    @default(1000)
  
  // Metadata
  isActive      Boolean  @default(true)
  lastUsedAt    DateTime?
  createdAt     DateTime @default(now())
  createdBy     String   // Admin user ID
  
  @@map("integration_tokens")
}

// ============================================
// AYARLAR VE KONFİGÜRASYON
// ============================================

model SiteConfig {
  key           String   @id
  value         Json
  description   String?
  updatedAt     DateTime @updatedAt
  updatedBy     String?  // Admin user ID
  
  @@map("site_config")
}

// Örnek config keys:
// - "general.site_name"
// - "general.contact_email"
// - "payment.bank_accounts" (havale için banka bilgileri)
// - "payment.iyzico_enabled"
// - "booking.advance_days" (kaç gün önceden rezervasyon alınır)
// - "booking.cancellation_hours" (kaç saat öncesine kadar iptal edilebilir)
```

### Veritabanı İndeksleme Stratejisi

```sql
-- Sık kullanılan sorgular için ek indeksler
CREATE INDEX idx_tours_status_highlighted ON tours(status, is_highlighted);
CREATE INDEX idx_reservations_date_status ON reservations(tour_date, status);
CREATE INDEX idx_tour_availability_date ON tour_availability(date) WHERE is_blocked = false;

-- Full-text search için (Türkçe)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_tours_title_trgm ON tours USING gin(title gin_trgm_ops);
CREATE INDEX idx_tours_description_trgm ON tours USING gin(description gin_trgm_ops);

-- JSON alanları için
CREATE INDEX idx_tours_features ON tours USING gin(features);
```

---

## 🔌 API MİMARİSİ

### REST API Yapısı

**Temel Prensip:** RESTful, resource-based, versiyonlanmış API.

#### API Versiyonlama
```
Base URL: https://api.zeotravel.com/v1
```

#### Endpoint Yapısı

```typescript
// ============================================
// PUBLIC API (Authentication gerekmez)
// ============================================

// Turlar
GET    /tours                        // Tüm turları listele (filtreleme, pagination)
GET    /tours/:slug                  // Tek tur detayı
GET    /tours/:slug/availability     // Tur için müsaitlik durumu
GET    /tours/categories             // Tur kategorileri

// Yorumlar
GET    /tours/:slug/reviews          // Tur yorumları

// Rezervasyon (Guest için)
POST   /reservations                 // Yeni rezervasyon oluştur
GET    /reservations/:number         // Rezervasyon detayı (email doğrulaması ile)

// ============================================
// AUTHENTICATED API (NextAuth JWT gerekir)
// ============================================

// Kullanıcı
GET    /me                           // Kullanıcı profili
PATCH  /me                           // Profil güncelle
GET    /me/reservations              // Kullanıcının rezervasyonları
GET    /me/reservations/:id          // Rezervasyon detayı

// Rezervasyon işlemleri
POST   /reservations/:id/cancel      // Rezervasyon iptali
POST   /reservations/:id/modify      // Rezervasyon değiştirme

// Yorum
POST   /tours/:slug/reviews          // Yorum yaz (sadece tura katılanlar)

// ============================================
// ADMIN API (Admin role gerekir)
// ============================================

// Tur yönetimi
POST   /admin/tours                  // Yeni tur ekle
PATCH  /admin/tours/:id              // Tur güncelle
DELETE /admin/tours/:id              // Tur sil
POST   /admin/tours/:id/availability // Müsaitlik güncelle

// Rezervasyon yönetimi
GET    /admin/reservations           // Tüm rezervasyonlar
PATCH  /admin/reservations/:id       // Rezervasyon güncelle
POST   /admin/reservations/:id/confirm // Manuel onay

// Ödeme yönetimi
GET    /admin/payments               // Tüm ödemeler
POST   /admin/payments/:id/approve   // Havale onayı

// İstatistikler
GET    /admin/stats/dashboard        // Dashboard verileri
GET    /admin/stats/revenue          // Gelir raporu
GET    /admin/stats/popular-tours    // Popüler turlar

// ============================================
// INTEGRATION API (Token gerekir)
// ============================================

// Villa sitesi için özel endpoint'ler
POST   /integration/check-availability  // Toplu müsaitlik kontrolü
POST   /integration/create-reservation  // HMAC imzalı rezervasyon
GET    /integration/reservation/:id     // Rezervasyon durumu
```

#### Request/Response Formatları

**Standard Response Format:**
```typescript
// Başarılı
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}

// Hata
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Geçersiz tarih formatı",
    "details": {
      "field": "tourDate",
      "issue": "Date must be in future"
    }
  }
}
```

**Tour Listesi Response Örneği:**
```typescript
GET /tours?category=water-sports&date=2024-08-15&limit=10

{
  "success": true,
  "data": [
    {
      "id": "tour_abc123",
      "slug": "tekne-turu-kemer",
      "title": "Kemer Tekne Turu",
      "titleEn": "Kemer Boat Tour",
      "category": {
        "name": "Su Sporları",
        "slug": "water-sports"
      },
      "priceAdult": 500,
      "priceChild": 300,
      "currency": "TRY",
      "duration": 480,
      "images": ["url1", "url2"],
      "rating": 4.8,
      "reviewCount": 234,
      "availability": {
        "date": "2024-08-15",
        "timeSlots": [
          {
            "time": "09:00",
            "availableSpots": 15,
            "totalSpots": 50
          }
        ]
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

**Rezervasyon Oluşturma:**
```typescript
POST /reservations

// Request
{
  "tourId": "tour_abc123",
  "tourDate": "2024-08-20",
  "timeSlot": "09:00",
  "adultCount": 2,
  "childCount": 1,
  "customerInfo": {
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "email": "ahmet@example.com",
    "phone": "+905551234567"
  },
  "specialRequests": "Otel transferi gerekiyor",
  "pickupLocation": "Grand Park Lara Hotel",
  "source": "direct" // veya "villa", "social"
}

// Response
{
  "success": true,
  "data": {
    "reservationId": "res_xyz789",
    "reservationNumber": "ZEO-2024-001234",
    "status": "PENDING",
    "totalAmount": 1300,
    "currency": "TRY",
    "paymentInstructions": {
      "method": "BANK_TRANSFER",
      "bankAccounts": [
        {
          "bankName": "Garanti BBVA",
          "iban": "TR00 0000 0000 0000 0000 0000 00",
          "accountHolder": "Zeo Travel Turizm Ltd. Şti.",
          "reference": "ZEO-2024-001234"
        }
      ],
      "deadline": "2024-08-18T23:59:59Z"
    }
  }
}
```

### GraphQL Alternatiifi (Öneri)

**İtirazım:** REST yeterli abi, ama eğer frontend'de çok kompleks data fetching ihtiyacı olursa (örneğin, tek bir sayfada 5-6 farklı endpoint çağrısı yapıyorsan), GraphQL'e geç. 

**GraphQL kullan eğer:**
- ✅ Mobile app geliştirmeyi planlıyorsan (bandwidth tasarrufu)
- ✅ Over-fetching/under-fetching problemin varsa
- ✅ Real-time updates gerekiyorsa (subscriptions)

**Kullanma eğer:**
- ❌ Basit CRUD operasyonları yetiyorsa
- ❌ Caching stratejin net değilse (GraphQL caching zor)
- ❌ Takımda GraphQL bilgisi yoksa

**Öneri:** REST ile başla, ihtiyaç olursa GraphQL'e geç.

---

## 🔗 VILLA ENTEGRASYONU

### Güvenli Entegrasyon Yöntemi

**Senin önerebileceğin basit yöntem:** "Link ile parametre gönder"
```
https://travel.zeotravel.com/tours/tekne-turu?from=villa&villa_booking=VL-12345
```

**Benim itirazım:** Bu güvensiz abi. Kullanıcı URL'yi değiştirirse, villa referansını kaybedersin. Ayrıca komisyon takibi, güvenlik, ve entegre rezervasyon sistemi kuramıyorsun.

### Doğru Yaklaşım: OAuth 2.0 + Signed Tokens

#### Senaryo 1: Tek Yönlü Entegrasyon (Villa → Travel)

**Akış:**
1. Villa sitesinde "Turlar" butonu
2. Kullanıcı tıkladığında, Villa backend'i Travel API'ye istek atar
3. Travel API, kısa süreli bir `integration_session` token oluşturur
4. Villa sitesi kullanıcıyı Travel'a redirect eder (token ile)
5. Travel sitesi token'ı validate eder ve kullanıcıyı tanır

**Implementasyon:**

```typescript
// ============================================
// VILLA SİTESİ (Backend)
// ============================================

// Kullanıcı "Turlar" butonuna bastığında
async function redirectToTravelSite(userId: string, villaBookingId?: string) {
  const integrationToken = process.env.TRAVEL_INTEGRATION_TOKEN;
  const integrationSecret = process.env.TRAVEL_INTEGRATION_SECRET;
  
  const payload = {
    userId: userId,
    villaBookingId: villaBookingId,
    timestamp: Date.now(),
    expiresIn: 300 // 5 dakika
  };
  
  // HMAC imza oluştur
  const signature = crypto
    .createHmac('sha256', integrationSecret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  // Travel API'ye session oluşturma isteği
  const response = await fetch('https://api.zeotravel.com/v1/integration/create-session', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${integrationToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      payload,
      signature
    })
  });
  
  const { sessionToken } = await response.json();
  
  // Kullanıcıyı redirect et
  const redirectUrl = `https://zeotravel.com/auth/villa-signin?session=${sessionToken}`;
  return redirectUrl;
}

// ============================================
// TRAVEL SİTESİ (Backend API)
// ============================================

// Integration session oluşturma endpoint'i
app.post('/integration/create-session', authenticateIntegrationToken, async (req, res) => {
  const { payload, signature } = req.body;
  const secret = req.integration.secret; // Middleware'den gelen secret
  
  // İmzayı doğrula
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Timestamp kontrolü (replay attack önleme)
  if (Date.now() - payload.timestamp > 60000) { // 1 dakika
    return res.status(401).json({ error: 'Token expired' });
  }
  
  // Kısa süreli session token oluştur (Redis'te sakla)
  const sessionToken = generateSecureToken();
  await redis.setex(`integration_session:${sessionToken}`, 300, JSON.stringify(payload));
  
  res.json({ sessionToken });
});

// Travel sitesinde kullanıcı otomatik giriş
app.get('/auth/villa-signin', async (req, res) => {
  const { session } = req.query;
  
  // Session'ı Redis'ten al
  const sessionData = await redis.get(`integration_session:${session}`);
  if (!sessionData) {
    return res.redirect('/error?code=invalid_session');
  }
  
  const { userId, villaBookingId } = JSON.parse(sessionData);
  
  // Kullanıcıyı sistemde bul veya oluştur
  let user = await findUserByVillaId(userId);
  if (!user) {
    user = await createUserFromVilla(userId);
  }
  
  // NextAuth session oluştur
  const token = await createAuthToken(user.id);
  
  // Session'ı sil (tek kullanımlık)
  await redis.del(`integration_session:${session}`);
  
  // Cookie set et ve redirect
  res.cookie('auth-token', token, { httpOnly: true, secure: true });
  res.redirect(villaBookingId 
    ? `/tours?highlight=villa-packages&ref=${villaBookingId}`
    : '/tours'
  );
});
```

#### Senaryo 2: Çift Yönlü Entegrasyon (Villa ↔ Travel)

Eğer Travel'dan yapılan rezervasyonu Villa sitesinde de göstermek istiyorsan:

**Webhook Sistemi:**
```typescript
// Travel sitesi rezervasyon oluştuğunda webhook gönderir
async function sendReservationWebhook(reservation: Reservation) {
  if (!reservation.villaReservationId) return;
  
  const payload = {
    event: 'reservation.created',
    data: {
      travelReservationId: reservation.id,
      villaReservationId: reservation.villaReservationId,
      tourName: reservation.tour.title,
      totalAmount: reservation.totalAmount,
      status: reservation.status
    },
    timestamp: Date.now()
  };
  
  const signature = createHmacSignature(payload, WEBHOOK_SECRET);
  
  await fetch('https://villa.example.com/webhooks/travel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': signature
    },
    body: JSON.stringify(payload)
  });
}
```

### Entegrasyon Güvenlik Checklist
- ✅ HMAC imzalama (replay attack önleme)
- ✅ Timestamp validation (eski token'ları reddet)
- ✅ Rate limiting (DDoS önleme)
- ✅ Token rotation (her 90 günde bir yenile)
- ✅ IP whitelist (sadece villa sunucusundan gelen istekleri kabul et)
- ✅ HTTPS zorunlu
- ✅ Webhook retry mekanizması (3 deneme, exponential backoff)

---

## 💳 ÖDEME SİSTEMLERİ

### Faz 1: Havale/EFT Sistemi

**Akış:**
1. Kullanıcı rezervasyon yapar
2. Sistem rezervasyonu `PENDING` statüsünde oluşturur
3. Banka hesap bilgileri ve referans numarası gösterilir
4. Kullanıcı havale yapar ve dekont yükler (opsiyonel)
5. Admin manuel olarak ödemeleri onaylar
6. Ödeme onaylandığında rezervasyon `CONFIRMED` olur

**Implementasyon:**

```typescript
// Banka hesap bilgilerini config'den al
const bankAccounts = await prisma.siteConfig.findUnique({
  where: { key: 'payment.bank_accounts' }
});

// Email gönder
await sendReservationEmail({
  to: reservation.user.email,
  subject: 'Rezervasyon Onayı Bekleniyor',
  template: 'reservation-pending',
  data: {
    reservationNumber: reservation.reservationNumber,
    totalAmount: reservation.totalAmount,
    bankAccounts: bankAccounts.value,
    deadline: addDays(new Date(), 3) // 3 gün içinde ödeme
  }
});

// Otomatik iptal job'ı kur (3 gün sonra ödenmediyse iptal et)
await scheduleJob('cancel-unpaid-reservation', {
  reservationId: reservation.id,
  runAt: addDays(new Date(), 3)
});
```

**Admin Panel:**
- Bekleyen ödemeleri listele
- Dekont görüntüle (yüklendiyse)
- Tek tıkla onaylama/reddetme
- Manuel ödeme ekleme

### Faz 2: Sanal POS Entegrasyonu

**Türkiye'de Popüler Ödeme Gateway'leri:**

| Provider | Komisyon | Kurulum | 3D Secure | Taksit | Öneri |
|----------|----------|---------|-----------|--------|-------|
| **İyzico** | %2.49 + 0.25₺ | Kolay | ✅ | ✅ | **ÖNERİYORUM** |
| **PayTR** | %2.90 | Çok Kolay | ✅ | ✅ | Alternatif |
| **Stripe** | %2.9 + 1₺ | Orta | ✅ | ❌ | Yabancı müşteriler için |

**İtirazım:** PayTR'nin dokümantasyonu berbat abi, İyzico'nun API'si çok daha olgun. Ayrıca İyzico'nun dashboard'u ve raporlama araçları çok iyi.

**İyzico Entegrasyonu:**

```typescript
// İyzico SDK kurulumu
npm install iyzipay

// Backend API
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://api.iyzipay.com' 
    : 'https://sandbox-api.iyzipay.com'
});

// Ödeme başlatma
app.post('/payments/create', async (req, res) => {
  const { reservationId, cardDetails } = req.body;
  
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { tour: true, user: true }
  });
  
  const paymentRequest = {
    locale: 'tr',
    conversationId: reservation.reservationNumber,
    price: reservation.totalAmount.toString(),
    paidPrice: reservation.totalAmount.toString(),
    currency: 'TRY',
    installment: '1',
    basketId: reservation.id,
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    
    // Kart bilgileri
    paymentCard: {
      cardHolderName: cardDetails.holderName,
      cardNumber: cardDetails.number,
      expireMonth: cardDetails.expireMonth,
      expireYear: cardDetails.expireYear,
      cvc: cardDetails.cvc,
      registerCard: '0'
    },
    
    // Alıcı bilgileri
    buyer: {
      id: reservation.userId,
      name: reservation.user.firstName,
      surname: reservation.user.lastName,
      email: reservation.user.email,
      identityNumber: '00000000000', // TCKN (opsiyonel)
      registrationAddress: 'Antalya, Turkey',
      city: 'Antalya',
      country: 'Turkey',
      ip: req.ip
    },
    
    // Fatura adresi
    billingAddress: {
      contactName: reservation.user.firstName + ' ' + reservation.user.lastName,
      city: 'Antalya',
      country: 'Turkey',
      address: 'Antalya, Turkey'
    },
    
    // Sepet içeriği
    basketItems: [
      {
        id: reservation.tourId,
        name: reservation.tour.title,
        category1: 'Tour',
        itemType: 'PHYSICAL',
        price: reservation.totalAmount.toString()
      }
    ]
  };
  
  try {
    const result = await iyzipay.payment.create(paymentRequest);
    
    if (result.status === 'success') {
      // Payment kaydı oluştur
      await prisma.payment.create({
        data: {
          reservationId: reservation.id,
          userId: reservation.userId,
          amount: reservation.totalAmount,
          method: 'IYZICO',
          status: 'COMPLETED',
          transactionId: result.paymentId,
          cardLastFour: cardDetails.number.slice(-4),
          cardBrand: result.cardType,
          gatewayResponse: result,
          paidAt: new Date()
        }
      });
      
      // Rezervasyonu onayla
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date()
        }
      });
      
      // Email gönder
      await sendReservationConfirmationEmail(reservation);
      
      res.json({ success: true, paymentId: result.paymentId });
    } else {
      res.status(400).json({ 
        success: false, 
        error: result.errorMessage 
      });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, error: 'Ödeme işlemi başarısız' });
  }
});
```

**3D Secure Akışı:**
```typescript
// 3D Secure için callback endpoint
app.post('/payments/3d-callback', async (req, res) => {
  const { conversationId, status, paymentId } = req.body;
  
  if (status === 'success') {
    // Ödemeyi tamamla (yukarıdaki akış)
    res.redirect(`/reservations/${conversationId}/success`);
  } else {
    res.redirect(`/reservations/${conversationId}/failed`);
  }
});
```

### Ödeme Güvenliği
- ✅ PCI DSS compliance (İyzico hallediyor)
- ✅ Kart bilgilerini asla saklamayın
- ✅ SSL/TLS zorunlu
- ✅ Rate limiting (kart deneme saldırılarına karşı)
- ✅ Fraud detection (İyzico'nun built-in sistemi var)
- ✅ İade politikası (tur tarihinden 24 saat öncesine kadar)

---

## 👨‍💼 ADMİN PANELİ

### Admin Panel Gereksinimleri

**Role Tabanlı Erişim:**
- **ADMIN:** Tüm işlemler
- **SUPER_ADMIN:** Kullanıcı yönetimi, config değiştirme

### Dashboard Bileşenleri

#### 1. Genel Dashboard
```typescript
// Gösterilecek metrикler
- Bugünkü rezervasyonlar (sayı + toplam gelir)
- Bekleyen ödemeler (sayı + toplam tutar)
- Bu ayki toplam gelir
- Popüler turlar (son 30 gün)
- Doluluk oranı (grafik)
- Son yorumlar (onay bekleyenler)
```

#### 2. Tur Yönetimi
- Tüm turları listele (tablo view)
- Yeni tur ekle (form)
- Tur düzenle (rich text editor)
- Toplu fotoğraf yükleme (drag & drop)
- Kategoriler yönetimi
- Müsaitlik takvimi (calendar view)
- Fiyat değişiklikleri (history)

#### 3. Rezervasyon Yönetimi
- Tüm rezervasyonları listele
  - Filtreler: Tarih aralığı, durum, tur, kullanıcı
  - Arama: Rezervasyon numarası, email, telefon
- Rezervasyon detayı
  - Müşteri bilgileri
  - Ödeme durumu
  - Özel talepler
  - İletişim geçmişi
- Toplu işlemler
  - Excel export
  - Toplu email gönderme
  - İptal / Onaylama

#### 4. Ödeme Yönetimi
- Bekleyen ödemeler
  - Dekont görüntüleme
  - Hızlı onay/red
- Tamamlanan ödemeler
- İade işlemleri
- Ödeme raporları
  - Günlük/Haftalık/Aylık
  - Ödeme yöntemi bazında
  - Excel export

#### 5. Kullanıcı Yönetimi
- Tüm kullanıcıları listele
- Kullanıcı detayı (rezervasyon geçmişi)
- Kullanıcı engelleme/aktifleştirme
- Admin kullanıcı ekleme

#### 6. İçerik Yönetimi
- Yorum moderasyonu
- Site ayarları
  - Genel bilgiler
  - Banka hesapları
  - Email şablonları
  - Sosyal medya linkleri

#### 7. Raporlar & Analizler
- Gelir raporları
- Tur bazlı performans
- Müşteri analizleri
- Kaynak analizi (villa, direct, social)

### Admin Panel Tech Stack

**Öneri:** Ayrı bir admin projesi kurma, Next.js içinde `/admin` route'u altında kur.

```typescript
// Klasör yapısı
app/
├── (public)/          // Public sayfalar
│   ├── page.tsx       // Homepage
│   ├── tours/
│   └── ...
├── (admin)/           // Admin sayfalar
│   ├── layout.tsx     // Admin layout (sidebar, nav)
│   ├── dashboard/
│   ├── tours/
│   ├── reservations/
│   └── ...
└── api/               // API routes
```

**UI Component Library:**
- Shadcn UI + Radix UI (zaten kullanacaksın)
- TanStack Table (powerful data tables)
- Recharts (grafikler)
- React Hook Form (formlar)

---

## 📁 PROJE KLASÖR YAPISI

```
zeo-travel/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts              # Initial data seeding
│
├── public/
│   ├── images/
│   ├── icons/
│   └── locales/             # Çoklu dil JSON dosyaları
│
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── (public)/        # Public route group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── tours/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── reservation/
│   │   │   └── profile/
│   │   │
│   │   ├── (admin)/         # Admin route group
│   │   │   ├── layout.tsx   # Admin layout
│   │   │   ├── dashboard/
│   │   │   ├── tours/
│   │   │   ├── reservations/
│   │   │   └── settings/
│   │   │
│   │   ├── api/             # API routes
│   │   │   ├── tours/
│   │   │   ├── reservations/
│   │   │   ├── payments/
│   │   │   ├── integration/
│   │   │   └── admin/
│   │   │
│   │   └── auth/            # NextAuth pages
│   │
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── layouts/
│   │   ├── tours/
│   │   ├── reservations/
│   │   └── admin/
│   │
│   ├── lib/
│   │   ├── prisma.ts        # Prisma client
│   │   ├── auth.ts          # NextAuth config
│   │   ├── redis.ts         # Redis client
│   │   ├── email.ts         # Email service
│   │   ├── payment/
│   │   │   ├── iyzico.ts
│   │   │   └── paytr.ts
│   │   └── utils.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useTours.ts
│   │   ├── useReservation.ts
│   │   └── useAuth.ts
│   │
│   ├── services/            # Business logic
│   │   ├── tour.service.ts
│   │   ├── reservation.service.ts
│   │   ├── payment.service.ts
│   │   └── integration.service.ts
│   │
│   ├── types/               # TypeScript types
│   │   ├── tour.types.ts
│   │   ├── reservation.types.ts
│   │   └── api.types.ts
│   │
│   ├── validation/          # Zod schemas
│   │   ├── tour.schema.ts
│   │   └── reservation.schema.ts
│   │
│   └── middleware.ts        # Next.js middleware (auth check)
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
│   ├── seed-tours.ts        # Sample data oluştur
│   └── migrate-prod.sh
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔒 GÜVENLİK & PERFORMANS

### Güvenlik Önlemleri

#### 1. Authentication & Authorization
```typescript
// Middleware (src/middleware.ts)
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN' || token?.role === 'SUPER_ADMIN';
      }
      if (req.nextUrl.pathname.startsWith('/profile')) {
        return !!token;
      }
      return true;
    }
  }
});

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/api/admin/:path*']
};
```

#### 2. Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
});

// API endpoints için
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 saniyede 10 istek
  analytics: true
});

// Ödeme endpoints için daha sıkı
export const paymentLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '60 s'), // 1 dakikada 3 istek
  analytics: true
});
```

#### 3. Input Validation
```typescript
// validation/reservation.schema.ts
import { z } from 'zod';

export const createReservationSchema = z.object({
  tourId: z.string().cuid(),
  tourDate: z.string().datetime().refine((date) => {
    return new Date(date) > new Date(); // Gelecek tarih olmalı
  }, 'Tour date must be in the future'),
  timeSlot: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  adultCount: z.number().int().min(1).max(50),
  childCount: z.number().int().min(0).max(50),
  infantCount: z.number().int().min(0).max(10),
  customerInfo: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^\+90[0-9]{10}$/) // Türkiye telefon formatı
  }),
  specialRequests: z.string().max(500).optional()
});

// API route'da kullan
app.post('/api/reservations', async (req, res) => {
  try {
    const validated = createReservationSchema.parse(req.body);
    // ... işlem devam eder
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      error: error.errors 
    });
  }
});
```

#### 4. SQL Injection Önleme
- ✅ Prisma ORM kullan (parametrized queries)
- ❌ Raw SQL kullanma (mecbur kalırsan `prisma.$queryRaw` + parametreler)

#### 5. XSS Önleme
```typescript
// React otomatik escape ediyor, ama rich text için:
import DOMPurify from 'isomorphic-dompurify';

function TourDescription({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
  
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

#### 6. CSRF Önleme
- ✅ NextAuth.js CSRF token'ları otomatik ekliyor
- ✅ SameSite cookies kullan

#### 7. Secrets Yönetimi
```bash
# .env.example (commit edilir)
DATABASE_URL=
NEXTAUTH_SECRET=
IYZICO_API_KEY=
IYZICO_SECRET_KEY=

# .env.local (commit EDİLMEZ!)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="super-secret-key"
IYZICO_API_KEY="real-api-key"
IYZICO_SECRET_KEY="real-secret"
```

**Production'da:**
- Vercel/Railway: Environment variables UI'dan ekle
- Secrets rotation: Her 90 günde bir değiştir

---

### Performans Optimizasyonları

#### 1. Database Optimizasyonu

**Connection Pooling:**
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection pool settings (DATABASE_URL'de)
// postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20
```

**Caching Strategy:**
```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({ /* config */ });

// Tour listesini cache'le (5 dakika)
export async function getCachedTours(category?: string) {
  const cacheKey = `tours:${category || 'all'}`;
  
  const cached = await redis.get(cacheKey);
  if (cached) return cached;
  
  const tours = await prisma.tour.findMany({
    where: category ? { category: { slug: category } } : undefined,
    include: { category: true }
  });
  
  await redis.setex(cacheKey, 300, JSON.stringify(tours)); // 5 dakika TTL
  return tours;
}

// Cache invalidation
export async function invalidateTourCache() {
  const keys = await redis.keys('tours:*');
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
```

**Database Indeksleme:**
```sql
-- Kritik indeksler (yukarıda belirtildi)
-- Query performance monitoring
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Slow query'leri bul
SELECT query, calls, mean_exec_time, max_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

#### 2. Frontend Optimizasyonu

**Image Optimization:**
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.zeotravel.com', 's3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};

// Component'te kullan
import Image from 'next/image';

<Image
  src={tour.images[0]}
  alt={tour.title}
  width={800}
  height={600}
  priority={false} // Above the fold değilse false
  placeholder="blur"
  blurDataURL={tour.blurHash} // BlurHash kullan
/>
```

**Code Splitting:**
```typescript
// Lazy loading
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSkeleton />,
  ssr: false // Admin paneli SSR'e ihtiyaç yok
});

// Route bazlı splitting (Next.js otomatik yapıyor)
```

**Bundle Analyzer:**
```bash
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

# Çalıştır
ANALYZE=true npm run build
```

#### 3. API Optimizasyonu

**Pagination:**
```typescript
// API endpoint
app.get('/api/tours', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  
  const [tours, total] = await Promise.all([
    prisma.tour.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    }),
    prisma.tour.count()
  ]);
  
  res.json({
    data: tours,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});
```

**GraphQL DataLoader (eğer GraphQL kullanırsan):**
```typescript
import DataLoader from 'dataloader';

const categoryLoader = new DataLoader(async (categoryIds) => {
  const categories = await prisma.tourCategory.findMany({
    where: { id: { in: categoryIds } }
  });
  
  return categoryIds.map(id => categories.find(c => c.id === id));
});

// N+1 problem çözüldü
```

#### 4. Monitoring & Alerting

```typescript
// Sentry entegrasyonu
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // %10 transaction sample
  beforeSend(event, hint) {
    // Hassas bilgileri filtrele
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  }
});

// Custom metrics
Sentry.metrics.increment('reservation.created', 1, {
  tags: { tour: tourId }
});
```

**Performance Metrikleri:**
- API Response Time: < 200ms (p95)
- Database Query Time: < 50ms (p95)
- Frontend LCP: < 2.5s
- Frontend FID: < 100ms
- Frontend CLS: < 0.1

---

## 🚀 DEPLOYMENT STRATEJİSİ

### Ortam Yapısı

```
Development → Staging → Production
```

#### Development
- Local (Docker Compose)
- PostgreSQL + Redis container
- Hot reload
- Seeded data

#### Staging
- Vercel Preview Deployment (her PR için otomatik)
- Supabase staging database
- Upstash Redis
- Test ödeme gateway (sandbox)

#### Production
- Vercel Production
- Supabase production (veya Railway)
- Upstash Redis
- Cloudflare R2
- Real payment gateway

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Prisma migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build
        run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Staging
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Production
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Run database migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Notify Sentry
        run: |
          curl -X POST https://sentry.io/api/0/organizations/.../releases/ \
            -H "Authorization: Bearer ${{ secrets.SENTRY_TOKEN }}" \
            -d '{"version": "${{ github.sha }}"}'
```

### Database Migration Stratejisi

```bash
# Development
npx prisma migrate dev --name add_tour_reviews

# Production (Blue-Green deployment)
# 1. Önce schema değişikliğini deploy et (backward compatible)
npx prisma migrate deploy

# 2. Application code'u deploy et
vercel --prod

# 3. Eski code'u temizle (eğer breaking change varsa)
```

**Zero-Downtime Migration:**
- ✅ Additive changes first (new columns as nullable)
- ✅ Deploy application
- ✅ Backfill data
- ✅ Make columns non-nullable
- ❌ Hiçbir zaman column drop veya rename yapma direkt

---

## 📊 PROJE ROADMAP

### Faz 1: MVP (4-6 hafta)
**Hedef:** İlk müşterileri almak

- ✅ Temel tour listesi (5-10 tur)
- ✅ Rezervasyon sistemi (guest checkout)
- ✅ Havale/EFT ödeme
- ✅ Admin panel (basit)
- ✅ Email bildirimleri
- ✅ Villa entegrasyonu (basit link)
- ✅ Türkçe/İngilizce

### Faz 2: Ödeme & Kullanıcı (2-3 hafta)
**Hedef:** Dönüşüm oranını artırmak

- ✅ İyzico entegrasyonu
- ✅ Kullanıcı hesapları (OAuth)
- ✅ Rezervasyon geçmişi
- ✅ Yorum sistemi
- ✅ Villa entegrasyonu (güvenli)

### Faz 3: Optimizasyon (2-3 hafta)
**Hedef:** Performans ve UX

- ✅ Gelişmiş admin panel
- ✅ Raporlama sistemi
- ✅ Email otomasyonu (hatırlatmalar)
- ✅ SMS bildirimleri
- ✅ SEO optimizasyonu
- ✅ Performance tuning

### Faz 4: Büyüme (Ongoing)
**Hedef:** Ölçeklenme

- ✅ Mobile app
- ✅ Loyalty programı
- ✅ Dinamik fiyatlandırma
- ✅ Multi-currency
- ✅ Advanced analytics
- ✅ WhatsApp Business entegrasyonu

---

## 🎯 SONUÇ VE ÖNERİLER

### Kritik Kararlar

1. **Tech Stack:** Next.js + PostgreSQL + Prisma → **Doğru seçim**
2. **Ödeme:** Havale + İyzico → **Türkiye için en mantıklısı**
3. **Hosting:** Vercel + Supabase → **Hızlı başlangıç için ideal**
4. **Villa Entegrasyon:** HMAC signed tokens → **Güvenli ve esnek**

### Erdal Abi'ye Son Öneriler

**Ne yapmalısın:**
- ✅ MVP'yi hızlı çıkar, mükemmel olmasını bekleme
- ✅ İlk 10 tur ile başla, dinamik ekleme var zaten
- ✅ Havale ile başla, 1-2 ay sonra sanal POS ekle
- ✅ SEO'ya baştan yatırım yap (turizm sitesi için kritik)

**Ne yapmamalısın:**
- ❌ Mikroservis mimarisi kurma (henüz erken)
- ❌ Kendi ödeme sistemi kurma (İyzico kullan)
- ❌ Her özelliği ilk günden ekleme (iteratif git)
- ❌ Mobile app ile başlama (PWA yeterli ilk başta)

### Maliyet Tahmini (Aylık)

| Hizmet | Maliyet |
|--------|---------|
| Vercel (Pro) | $20 |
| Supabase (Pro) | $25 |
| Upstash Redis | $10 |
| Cloudflare R2 | $5 |
| Sentry | $26 |
| Domain + SSL | $2 |
| **Toplam** | **~$90/ay** |

**İyzico komisyonu:** Rezervasyon başına %2.49 + 0.25₺

### İletişim ve Destek

Erdal abi, bu dokümantasyon senin başlangıç pusulan. Eğer herhangi bir noktada itirazın varsa veya farklı bir yaklaşım istiyorsan, tartışalım. Ben buradayım!

**Şimdi ne yapmalısın?**
1. Bu dokümantasyonu oku ve kafana takılan yerleri not et
2. Mevcut villa sitesinin teknik detaylarını paylaş (tech stack, hosting)
3. Proje için bir GitHub repository oluştur
4. `package.json` ve initial setup'ı başlatalım

**Başlamaya hazır mısın?** 🚀

---

*Son güncelleme: 12 Ağustos 2026*
*Versiyon: 1.0*
*Hazırlayan: Çopur (Senior Frontend Architect)*
