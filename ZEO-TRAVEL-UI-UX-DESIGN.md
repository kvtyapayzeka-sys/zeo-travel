# ZEO TRAVEL TURİZM ACENTASI - UI/UX TASARIM DOKÜMANI

**Proje:** Zeo Travel Web Arayüzü  
**Tasarım Felsefesi:** Intentional Minimalism + Avant-Garde  
**Tarih:** 12 Ağustos 2026  
**Tasarımcı:** Çopur

---

## 📋 İÇİNDEKİLER

1. [Tasarım Felsefesi ve Stratejik Yaklaşım](#tasarim-felsefesi)
2. [Renk Paleti ve Marka Kimliği](#renk-paleti)
3. [Tipografi Sistemi](#tipografi)
4. [Ana Sayfa Tasarımı](#ana-sayfa)
5. [Tur Listeleme Sayfası](#tur-listeleme)
6. [Tur Detay Sayfası](#tur-detay)
7. [Rezervasyon Flow](#rezervasyon-flow)
8. [Komponent Kütüphanesi](#komponent-kutuphanesi)
9. [Animasyon ve Micro-Interactions](#animasyonlar)
10. [Responsive Tasarım Stratejisi](#responsive-tasarim)
11. [Kullanıcı Akış Diyagramları](#kullanici-akislari)
12. [Teknik Implementation Notları](#teknik-notlar)

---

## 🎨 TASARIM FELSEFESİ VE STRATEJİK YAKLAŞIM {#tasarim-felsefesi}

### Temel İlkeler

**1. INTENTIONAL MINIMALISM (Bilinçli Minimalizm)**
- Her element bir **fonksiyonel amaç** veya **duygusal etki** yaratmalı
- Dekoratif elementler yasak değil, ama her biri **görsel hiyerarşiyi güçlendirmeli**
- Whitespace = Premium algısı ve mental clarity

**2. ANTI-GENERIC (Şablon Karşıtı)**
- Bootstrap/Material Design klişelerinden kaçınılacak
- Asimetrik layout'lar, beklenmedik grid yapıları
- Özel tasarlanmış komponentler (standart kart yapıları değil)

**3. AVANT-GARDE (Öncü Tasarım)**
- Cesur tipografi kombinasyonları
- Sıra dışı fotoğraf kompozisyonları
- Dinamik, flow içinde hareket hissi

**4. TRUST & PROFESSIONALISM (Güven ve Profesyonellik)**
- Minimalizm = Güven (aşırı bilgi bombardımanı = spam hissi)
- Yüksek kaliteli görseller (düşük çözünürlük yasak)
- Sertifikalar ve sosyal kanıt için subtle gösterim

### Rakip Analizi ve Farklılaşma

**Rakiplerin Yanlışları:**
- Aşırı bilgi yüklü header'lar (10+ menü itemi)
- Generic slider'lar (carousel blindness)
- Agresif pop-up'lar
- Yavaş yüklenen fotoğraf galeri sistemleri

**Bizim Farklılaşmamız:**
- Hero section'da **tek, güçlü mesaj**
- Slider yerine **curated tur showcases** (3-4 adet, editörün seçimi)
- Pop-up yerine **sticky footer CTA** veya **contextual inline CTA**
- Lazy-loading ile optimize edilmiş, fakat **progressive enhancement** ile hızlı ilk görüntü

---

## 🎨 RENK PALETİ VE MARKA KİMLİĞİ {#renk-paleti}

### Renk Stratejisi

**Psikolojik Hedef:**
- **Mavi tüplerini**: Güven, profesyonellik, deniz
- **Toprak tonları**: Macera, doğa, otantiklik
- **Accent renk**: Enerji, call-to-action

### Tailwind CSS Renk Paleti

```js
// tailwind.config.js - Custom Color Palette

module.exports = {
  theme: {
    extend: {
      colors: {
        // PRIMARY - Derin okyanus mavisi (güven + lüks)
        'zeo-primary': {
          50: '#f0f9ff',   // En açık - background accents
          100: '#e0f2fe',  // Subtle backgrounds
          200: '#b9e1fe',  // Hover states
          300: '#7cc5f7',  // Borders, icons
          400: '#36a5ee',  // Interactive elements
          500: '#0d86d9',  // Primary brand color
          600: '#0668b8',  // Hover - primary buttons
          700: '#094f95',  // Active states
          800: '#0b427a',  // Dark mode primary
          900: '#0f3866',  // Deep accents
          950: '#0a2342',  // Darkest - text on light bg
        },
        
        // SECONDARY - Sıcak terracotta (macera + enerji)
        'zeo-accent': {
          50: '#fff7ed',   // Background tints
          100: '#ffedd5',  // Subtle highlights
          200: '#fed7aa',  // Soft accents
          300: '#fdba74',  // Borders, icons
          400: '#fb923c',  // Hover states
          500: '#f97316',  // Primary accent - CTA
          600: '#ea580c',  // Hover - accent buttons
          700: '#c2410c',  // Active states
          800: '#9a3412',  // Dark accents
          900: '#7c2d12',  // Deep orange
          950: '#431407',  // Darkest orange
        },
        
        // NEUTRAL - Yumuşak gri tonları (minimal, temiz)
        'zeo-neutral': {
          50: '#fafafa',   // Background
          100: '#f5f5f5',  // Cards, sections
          200: '#e5e5e5',  // Borders
          300: '#d4d4d4',  // Disabled states
          400: '#a3a3a3',  // Placeholder text
          500: '#737373',  // Secondary text
          600: '#525252',  // Body text
          700: '#404040',  // Headings
          800: '#262626',  // Strong emphasis
          900: '#171717',  // Black (almost)
          950: '#0a0a0a',  // Pure black
        },
        
        // SEMANTIC COLORS
        'zeo-success': '#10b981',  // green-500
        'zeo-warning': '#f59e0b',  // amber-500
        'zeo-error': '#ef4444',    // red-500
        'zeo-info': '#3b82f6',     // blue-500
      },
      
      // GRADIENT PRESETS
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0d86d9 0%, #0668b8 50%, #094f95 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a2342 0%, #0f3866 100%)',
      },
    },
  },
}
```

### Renk Kullanım Kuralları

| Element | Primary Use | Accent Use | Neutral Use |
|---------|-------------|------------|-------------|
| **Backgrounds** | Hero sections, CTA | Featured cards | Main content areas |
| **Text** | Links, badges | CTA text, prices | Body text, headings |
| **Buttons** | Primary actions | Urgent CTAs | Secondary actions |
| **Borders** | Focus states | Highlights | Dividers, cards |

---

## 📝 TİPOGRAFİ SİSTEMİ {#tipografi}

### Font Stack

**PRIMARY FONT (Display/Headings):**
```css
font-family: 'Inter Variable', 'Inter', -apple-system, sans-serif;
```
- **Neden Inter?** Modern, okunaklı, variable font teknolojisi
- **Weight Range:** 300 (Light) → 700 (Bold)
- **Kullanım:** Hero başlıklar, section başlıkları, tur isimleri

**SECONDARY FONT (Body/UI):**
```css
font-family: 'Manrope', 'Inter', sans-serif;
```
- **Neden Manrope?** Geometric ama sıcak, yüksek readability
- **Weight Range:** 400 (Regular) → 600 (SemiBold)
- **Kullanım:** Paragraflar, button text, form labels

**ACCENT FONT (Optional - Special Cases):**
```css
font-family: 'Space Grotesk', monospace;
```
- **Kullanım:** Fiyatlar, sayılar, özel vurgular (sınırlı kullanım)

### Tipografi Scale (Tailwind Custom)

```js
// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      fontSize: {
        // Display (Hero, Landing)
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        
        // Headings
        'h1': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.625', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        
        // UI Elements
        'button-lg': ['1rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.01em' }],
        'button': ['0.875rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.02em' }],
      },
    },
  },
}
```

### Tipografi Hierarchy Örneği

```html
<!-- Hero Title -->
<h1 class="font-inter text-display-xl text-zeo-neutral-900">
  Antalya'nın En İyi <span class="text-zeo-primary-500">Macera</span> Turları
</h1>

<!-- Section Heading -->
<h2 class="font-inter text-h2 text-zeo-neutral-800">Popüler Turlar</h2>

<!-- Body Text -->
<p class="font-manrope text-body text-zeo-neutral-600">
  Profesyonel rehberlerimiz eşliğinde unutulmaz deneyimler yaşayın.
</p>

<!-- Price (Accent Font) -->
<span class="font-space text-h3 text-zeo-accent-600">₺2,499</span>
```

---

## 🏠 ANA SAYFA TASARIMI {#ana-sayfa}

### Bölüm Yapısı ve Layout

#### 1. HERO SECTION (Above the fold)

**Tasarım Konsepti:** Full-screen, split-layout, asymmetric

**Layout Anatomy:**
```
┌─────────────────────────────────────────────┐
│  [NAVBAR]                                   │
├───────────────────┬─────────────────────────┤
│                   │                         │
│   60% - LEFT      │   40% - RIGHT          │
│                   │                         │
│   • H1 Başlık     │   • Hero Image         │
│   • Tagline       │     (Vertical crop)    │
│   • CTA Buttons   │   • Floating Badge     │
│   • Trust Badges  │     "4.9★ 500+ Tur"   │
│                   │                         │
└───────────────────┴─────────────────────────┘
```

**Wireframe Açıklaması:**

**Sol Panel (Text Content):**
- **H1 (Display-XL):** "Antalya'da Unutulmaz Maceralar"
  - Kelime "Maceralar" farklı renk (accent)
  - Animasyon: Fade-in + slide-up (staggered)
  
- **Tagline (Body-LG):** "Tekne turlarından yamaç paraşütüne, güvenli ve profesyonel rehberlik"
  - Subtle, secondary color
  
- **CTA Group (Horizontal):**
  - Primary Button: "Turları Keşfet" (zeo-accent-500, large)
  - Secondary Button: "İletişim" (outline, neutral)
  - Gap: 16px
  
- **Trust Indicators (Inline):**
  - "✓ 10,000+ Mutlu Müşteri"
  - "✓ Lisanslı Rehberler"
  - "✓ %100 Güvenli Ödeme"
  - Font: Caption, light color

**Sağ Panel (Visual):**
- **Hero Image:** Vertical crop (600x800px ratio)
  - Örnek: Parasailing yapan kişi, dinamik açı
  - Border-radius: 24px (sadece sol üst/alt)
  - Shadow: Subtle, depth hissi
  
- **Floating Badge:**
  - Position: Absolute, bottom-left of image
  - Content: "4.9 ★★★★★ | 500+ Tur"
  - Background: White with backdrop-blur
  - Animation: Gentle float (keyframe)

**Teknik Detaylar:**
```html
<section class="relative min-h-screen bg-gradient-to-br from-zeo-neutral-50 to-zeo-primary-50">
  <div class="container mx-auto px-6 lg:px-12 pt-24 pb-16">
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <!-- Left: 60% (3 cols) -->
      <div class="lg:col-span-3 space-y-8">
        <h1 class="text-display-xl text-zeo-neutral-900 animate-fade-slide-up">
          Antalya'da Unutulmaz <span class="text-zeo-accent-500">Maceralar</span>
        </h1>
        <!-- ... rest of content -->
      </div>
      
      <!-- Right: 40% (2 cols) -->
      <div class="lg:col-span-2 relative">
        <img src="hero.jpg" class="rounded-l-3xl shadow-2xl" />
        <div class="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md rounded-2xl p-4">
          <!-- Badge content -->
        </div>
      </div>
    </div>
  </div>
</section>
```

---

#### 2. FEATURED TOURS SECTION

**Tasarım Konsepti:** Curated showcase, bento box layout

**Layout:** 3-column asymmetric grid

```
┌────────────────────────────────────────────┐
│  [SECTİON HEADER]                          │
│  "Öne Çıkan Turlar" + "Tümünü Gör" link  │
├──────────────┬──────────────┬──────────────┤
│              │              │              │
│   CARD 1     │   CARD 2     │   CARD 3     │
│   (Large)    │   (Large)    │   (Large)    │
│              │              │              │
│   • Image    │   • Image    │   • Image    │
│   • Title    │   • Title    │   • Title    │
│   • Price    │   • Price    │   • Price    │
│   • Badge    │   • Badge    │   • Badge    │
│   • CTA      │   • CTA      │   • CTA      │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Kart Tasarım Anatomisi (Anti-Generic!):**

**Standart kart YAPMA:**
```
┌─────────────┐
│   Image     │
│─────────────│
│ Title       │
│ Description │
│ [Button]    │
└─────────────┘
```

**Bizim kartımız (Bespoke):**
```
┌─────────────────────┐
│                     │
│   IMAGE (overlay)   │
│                     │
│   ┌───────────────┐ │  <- Floating card
│   │ Title         │ │
│   │ ★★★★★ 4.8     │ │
│   │ ₺2,499  [CTA] │ │
│   └───────────────┘ │
└─────────────────────┘
```

**Özellikler:**
1. **Image**: Full-bleed, subtle gradient overlay (bottom-to-top, dark)
2. **Floating Card**: Position absolute, bottom 16px, white bg, shadow-xl
3. **Badge**: "Popüler" / "Yeni" - top-right corner, accent color
4. **Hover Effect**: Image scale 1.05, floating card translate-y -8px
5. **Rating**: Stars + number (trustworthiness)

**Kod Örneği:**
```html
<div class="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer">
  <!-- Image -->
  <img src="tour.jpg" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
  
  <!-- Badge -->
  <span class="absolute top-4 right-4 bg-zeo-accent-500 text-white px-3 py-1 rounded-full text-caption font-semibold">
    Popüler
  </span>
  
  <!-- Floating Info Card -->
  <div class="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
    <h3 class="text-h4 text-zeo-neutral-900 mb-2">Tekne Turu</h3>
    <div class="flex items-center gap-2 mb-3">
      <div class="flex text-zeo-accent-500">★★★★★</div>
      <span class="text-body-sm text-zeo-neutral-600">4.8 (124 yorum)</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-h3 text-zeo-primary-600 font-space">₺2,499</span>
      <button class="bg-zeo-accent-500 text-white px-4 py-2 rounded-xl text-button hover:bg-zeo-accent-600 transition-colors">
        İncele →
      </button>
    </div>
  </div>
</div>
```

---

#### 3. CATEGORY GRID SECTION

**Tasarım Konsepti:** Visual category navigation (icon + photo hybrid)

**Layout:** 2x3 grid (mobile: 2x3, tablet: 3x2, desktop: 6x1 horizontal scroll)

```
┌──────────────────────────────────────────────────────────────┐
│  [SECTİON HEADER] "Kategoriler"                              │
├─────────┬─────────┬─────────┬─────────┬─────────┬───────────┤
│ Tekne   │ Safari  │ ATV     │ Paraşüt │ At Turu │ Dalış     │
│ [icon]  │ [icon]  │ [icon]  │ [icon]  │ [icon]  │ [icon]    │
│ 24 tur  │ 18 tur  │ 12 tur  │ 8 tur   │ 6 tur   │ 15 tur    │
└─────────┴─────────┴─────────┴─────────┴─────────┴───────────┘
```

**Kart Özellikleri:**
- Aspect ratio: 1:1 (square)
- Background: Category-specific photo (subtle, muted)
- Overlay: Gradient from transparent to dark
- Icon: Large (48x48), centered, white
- Text: Category name + tour count
- Hover: Border glow (primary color), icon bounce

**Anti-Pattern:** Generic icon listesi (boring!)
**Bizim Yaklaşımız:** Photo + Icon hybrid (memorable!)

---

#### 4. SOCIAL PROOF SECTION

**Tasarım Konsepti:** Testimonial showcase + stats

**Layout:** Split (50/50)

```
┌───────────────────────┬───────────────────────┐
│  LEFT - STATS         │  RIGHT - TESTIMONIAL  │
│                       │                       │
│  ┌─────────────────┐  │  ┌─────────────────┐ │
│  │  10,000+        │  │  │  [Avatar]       │ │
│  │  Mutlu Müşteri  │  │  │  "Harika..."    │ │
│  └─────────────────┘  │  │  - Ahmet Yılmaz │ │
│                       │  │    ★★★★★         │ │
│  ┌─────────────────┐  │  └─────────────────┘ │
│  │  4.9/5          │  │                       │
│  │  Ortalama Puan  │  │  [Pagination Dots]    │
│  └─────────────────┘  │                       │
│                       │                       │
└───────────────────────┴───────────────────────┘
```

**Stats Cards:**
- Large number (Display-LG, primary color)
- Label (Body, neutral)
- Icon (subtle, background decoration)
- Animation: Count-up on scroll into view

**Testimonial Carousel:**
- Auto-rotating (5 saniye)
- Avatar + Name + Rating
- Quote (2-3 cümle max)
- Subtle shadow, rounded card

---

#### 5. WHY CHOOSE US SECTION

**Tasarım Konsepti:** Feature grid with icons

**Layout:** 3-column grid

```
┌──────────────────────────────────────────────┐
│  [SECTİON HEADER] "Neden Bizi Seçmelisiniz?" │
├──────────────┬──────────────┬────────────────┤
│ [Icon]       │ [Icon]       │ [Icon]         │
│ Güvenli      │ Profesyonel  │ En İyi Fiyat   │
│ Ödeme        │ Rehberler    │ Garantisi      │
│              │              │                │
│ Açıklama...  │ Açıklama...  │ Açıklama...    │
└──────────────┴──────────────┴────────────────┘
```

**Özellikler:**
- Icon: Custom SVG (renkli, 64x64)
- Title: H4, bold
- Description: Body-SM, 2 satır
- Hover: Icon rotate + card lift

---

#### 6. CTA FOOTER SECTION

**Tasarım Konsepti:** Full-width banner, urgent CTA

```
┌───────────────────────────────────────────────┐
│  BG: Gradient (Primary to Accent)            │
│                                               │
│  H2: "Hemen Rezervasyon Yapın"                │
│  Subtitle: "%10 Erken Rezervasyon İndirimi"  │
│                                               │
│  [Primary Button] "Turları Görüntüle"         │
│  [Secondary Link] "WhatsApp ile İletişim"    │
│                                               │
└───────────────────────────────────────────────┘
```

---

### Ana Sayfa - Kullanıcı Journey

```
User lands → Hero impact (3 sec decision) →
Scroll to featured tours (browse) →
If interested: Click tour card → Tour detail page
If not sure: Scroll to categories → Filter by interest →
See social proof → Build trust →
CTA section → Convert
```

**KPI Metrics:**
- Hero section dwell time: >3 seconds
- Scroll depth: >70% (social proof section)
- CTR on featured tours: >15%
- Bounce rate: <40%

---

## 📋 TUR LİSTELEME SAYFASI {#tur-listeleme}

### Sayfa Yapısı

```
┌──────────────────────────────────────────────────────────┐
│  [BREADCRUMB] Ana Sayfa > Turlar > Tekne Turları        │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  SIDEBAR   │  TUR LİSTESİ                               │
│  (Filters) │                                             │
│            │  ┌──────────────────────────────────────┐  │
│  [Filter1] │  │ TUR CARD 1                           │  │
│  [Filter2] │  └──────────────────────────────────────┘  │
│  [Filter3] │                                             │
│            │  ┌──────────────────────────────────────┐  │
│  [Reset]   │  │ TUR CARD 2                           │  │
│            │  └──────────────────────────────────────┘  │
│            │                                             │
│            │  [Load More Button]                         │
│            │                                             │
└────────────┴─────────────────────────────────────────────┘
```

### Sidebar Filters (Sol Panel - 25% Width)

**Filter Kategorileri:**

1. **Fiyat Aralığı**
   - Dual range slider
   - Min/Max input fields
   - Realtime update

2. **Kategori**
   - Checkbox list
   - Tekne, ATV, Safari, vs.
   - Count badge (örn: "Tekne (24)")

3. **Tarih**
   - Date picker
   - Quick filters: "Bugün", "Yarın", "Hafta Sonu"

4. **Süre**
   - Radio buttons
   - "2-4 saat", "Yarım gün", "Tam gün"

5. **Zorluk Seviyesi**
   - Stars (1-5)
   - "Kolay", "Orta", "Zor"

6. **Sıralama**
   - Dropdown
   - "Popülerlik", "Fiyat (Düşük-Yüksek)", "Puan"

**Filter UI Komponent:**
```html
<div class="sticky top-24 space-y-6 bg-white rounded-2xl p-6 shadow-lg">
  <!-- Fiyat Aralığı -->
  <div>
    <h3 class="text-h4 mb-4">Fiyat Aralığı</h3>
    <div class="relative">
      <input type="range" min="0" max="10000" class="w-full" />
      <div class="flex justify-between mt-2">
        <input type="number" placeholder="Min" class="w-20 px-2 py-1 border rounded" />
        <input type="number" placeholder="Max" class="w-20 px-2 py-1 border rounded" />
      </div>
    </div>
  </div>
  
  <!-- Kategori -->
  <div>
    <h3 class="text-h4 mb-4">Kategori</h3>
    <div class="space-y-2">
      <label class="flex items-center gap-2 cursor-pointer hover:bg-zeo-neutral-100 p-2 rounded-lg transition">
        <input type="checkbox" class="w-5 h-5 accent-zeo-primary-500" />
        <span class="text-body">Tekne Turu</span>
        <span class="ml-auto text-caption text-zeo-neutral-500">(24)</span>
      </label>
      <!-- More checkboxes -->
    </div>
  </div>
  
  <!-- Reset Button -->
  <button class="w-full py-3 border-2 border-zeo-neutral-300 rounded-xl text-button text-zeo-neutral-700 hover:bg-zeo-neutral-100 transition">
    Filtreleri Temizle
  </button>
</div>
```

---

### Tur Kartları (Listing View - Sağ Panel 75%)

**Layout:** Grid veya List view toggle

**Grid View (Default):**
- 2 columns (tablet: 2, desktop: 3)
- Card design: Same as homepage featured tours

**List View (Alternative):**
```
┌─────────────────────────────────────────────────────────┐
│  [IMAGE]    BAŞLIK                      [★★★★★ 4.8]    │
│   300x200   Açıklama kısa...            124 yorum       │
│             • 4 saat • Kolay            ₺2,499          │
│             [İncele Button]                             │
└─────────────────────────────────────────────────────────┘
```

**List View Özellikleri:**
- Horizontal layout
- Image: 300x200px, sol
- Content: Middle (flex-grow)
- Price + CTA: Right (fixed width)
- Hover: Subtle lift + border glow

**Toggle Button (Top-right):**
```html
<div class="flex gap-2 mb-6">
  <button class="p-2 rounded-lg bg-zeo-primary-500 text-white">
    <GridIcon />
  </button>
  <button class="p-2 rounded-lg bg-zeo-neutral-200 text-zeo-neutral-600">
    <ListIcon />
  </button>
</div>
```

---

### Boş State (No Results)

```
┌─────────────────────────────────────────┐
│                                         │
│         [Empty State Icon]              │
│                                         │
│   "Aradığınız kriterlere uygun tur      │
│    bulunamadı"                          │
│                                         │
│   [Filtreleri Temizle Button]          │
│                                         │
└─────────────────────────────────────────┘
```

---

### Loading State

**Skeleton Screens:**
- Card placeholder'lar (shimmer effect)
- Filter skeleton
- Progressive loading (ilk 6 kart hızlı, sonrası lazy)

---

### Mobile Responsive Behavior

**Mobile (< 768px):**
- Sidebar → Bottom sheet (slide-up modal)
- "Filtrele" floating button (bottom-right)
- Grid: 1 column
- Sticky header: Category chips (horizontal scroll)

```
┌──────────────────────────┐
│  [Header]                │
├──────────────────────────┤
│  [Chip: Tekne] [ATV]...  │  <- Horizontal scroll
├──────────────────────────┤
│  ┌────────────────────┐  │
│  │ TUR CARD 1         │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ TUR CARD 2         │  │
│  └────────────────────┘  │
└──────────────────────────┘
   [Filtrele Button] 🔵      <- Floating, bottom-right
```

---

## 📄 TUR DETAY SAYFASI {#tur-detay}

### Sayfa Yapısı

```
┌──────────────────────────────────────────────────────────┐
│  [BREADCRUMB] Ana Sayfa > Turlar > Tekne Turu           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  GALERİ SECTION (Full-width, Hero)                      │
│  [Main Image] + [Thumbnail Grid]                        │
│                                                          │
├────────────────────────────┬─────────────────────────────┤
│                            │                             │
│  SOL PANEL (65%)           │  SAĞ PANEL (35%)           │
│                            │                             │
│  • Başlık + Rating         │  REZERVASYON CARD          │
│  • Quick Info              │  (Sticky)                   │
│  • Açıklama                │                             │
│  • Neler Dahil             │  • Tarih seçimi             │
│  • Program                 │  • Kişi sayısı              │
│  • Lokasyon Haritası       │  • Fiyat özeti              │
│  • Yorumlar                │  • [Rezervasyon Yap]        │
│                            │                             │
└────────────────────────────┴─────────────────────────────┘
```

---

### 1. Galeri Section (Hero)

**Layout:** Bento box style grid

```
┌───────────────────────────────────────────────┐
│                                               │
│           MAIN IMAGE (Large)                  │
│           (2:1 aspect ratio)                  │
│                                               │
├─────────┬─────────┬─────────┬─────────────────┤
│ Thumb 1 │ Thumb 2 │ Thumb 3 │ [+12 Fotoğraf] │
└─────────┴─────────┴─────────┴─────────────────┘
```

**Özellikler:**
- Main image: Clickable (lightbox açılır)
- Thumbnails: Hover effect (border + scale)
- "+X Fotoğraf" button: Opens full gallery modal
- Lightbox: Full-screen gallery, arrow navigation, close button

**Galeri Modal:**
```html
<!-- Full-screen overlay -->
<div class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
  <button class="absolute top-6 right-6 text-white text-4xl">&times;</button>
  <button class="absolute left-6 top-1/2 text-white text-4xl">←</button>
  <button class="absolute right-6 top-1/2 text-white text-4xl">→</button>
  
  <img src="current-image.jpg" class="max-w-5xl max-h-[90vh] object-contain" />
  
  <!-- Thumbnail strip (bottom) -->
  <div class="absolute bottom-6 flex gap-2">
    <img src="thumb1.jpg" class="w-16 h-16 rounded cursor-pointer opacity-50 hover:opacity-100" />
    <!-- More thumbnails -->
  </div>
</div>
```

---

### 2. Sol Panel - İçerik Alanı

#### A. Başlık ve Meta Bilgiler

```html
<div class="space-y-4">
  <!-- Başlık -->
  <h1 class="text-h1 text-zeo-neutral-900">
    Tekne Turu - Kemer Koyları
  </h1>
  
  <!-- Rating + Kategori Badge -->
  <div class="flex items-center gap-4 flex-wrap">
    <div class="flex items-center gap-2">
      <div class="flex text-zeo-accent-500 text-xl">★★★★★</div>
      <span class="text-body font-semibold">4.8</span>
      <span class="text-body-sm text-zeo-neutral-600">(124 yorum)</span>
    </div>
    <span class="px-3 py-1 bg-zeo-primary-100 text-zeo-primary-700 rounded-full text-caption font-semibold">
      Tekne Turu
    </span>
    <span class="px-3 py-1 bg-zeo-accent-100 text-zeo-accent-700 rounded-full text-caption font-semibold">
      Popüler
    </span>
  </div>
  
  <!-- Quick Info Grid -->
  <div class="grid grid-cols-4 gap-4 py-6 border-y border-zeo-neutral-200">
    <div class="flex items-center gap-3">
      <ClockIcon class="w-6 h-6 text-zeo-primary-500" />
      <div>
        <p class="text-caption text-zeo-neutral-500">Süre</p>
        <p class="text-body font-semibold">4 saat</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <UsersIcon class="w-6 h-6 text-zeo-primary-500" />
      <div>
        <p class="text-caption text-zeo-neutral-500">Grup</p>
        <p class="text-body font-semibold">Max 20</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <LanguageIcon class="w-6 h-6 text-zeo-primary-500" />
      <div>
        <p class="text-caption text-zeo-neutral-500">Dil</p>
        <p class="text-body font-semibold">TR, EN</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <DifficultyIcon class="w-6 h-6 text-zeo-primary-500" />
      <div>
        <p class="text-caption text-zeo-neutral-500">Zorluk</p>
        <p class="text-body font-semibold">Kolay</p>
      </div>
    </div>
  </div>
</div>
```

---

#### B. Açıklama

```html
<div class="prose prose-lg max-w-none">
  <h2 class="text-h3">Tur Hakkında</h2>
  <p class="text-body text-zeo-neutral-600 leading-relaxed">
    Kemer'in en güzel koylarını keşfederken, tertemiz sularda yüzme ve 
    şnorkelle deniz altı dünyasını görme fırsatı...
  </p>
  <!-- More paragraphs -->
</div>
```

**Accordion için "Devamını Oku" butonu:**
- Uzun açıklamalar için (>300 kelime)
- Collapsed state: 3 satır + "Devamını Oku" link
- Expanded: Full text + "Daha Az Göster"

---

#### C. Neler Dahil / Neler Dahil Değil

```html
<div class="grid md:grid-cols-2 gap-8 py-8 border-y border-zeo-neutral-200">
  <!-- Dahil -->
  <div>
    <h3 class="text-h4 mb-4 flex items-center gap-2">
      <CheckCircleIcon class="w-6 h-6 text-zeo-success" />
      Neler Dahil
    </h3>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <CheckIcon class="w-5 h-5 text-zeo-success mt-0.5" />
        <span class="text-body">Otel transfer hizmeti</span>
      </li>
      <li class="flex items-start gap-2">
        <CheckIcon class="w-5 h-5 text-zeo-success mt-0.5" />
        <span class="text-body">Öğle yemeği (açık büfe)</span>
      </li>
      <!-- More items -->
    </ul>
  </div>
  
  <!-- Dahil Değil -->
  <div>
    <h3 class="text-h4 mb-4 flex items-center gap-2">
      <XCircleIcon class="w-6 h-6 text-zeo-error" />
      Neler Dahil Değil
    </h3>
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <XIcon class="w-5 h-5 text-zeo-error mt-0.5" />
        <span class="text-body">Alkollü içecekler</span>
      </li>
      <!-- More items -->
    </ul>
  </div>
</div>
```

---

#### D. Program (Timeline)

```html
<div class="py-8">
  <h3 class="text-h3 mb-6">Program</h3>
  <div class="relative">
    <!-- Vertical timeline line -->
    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-zeo-neutral-200"></div>
    
    <!-- Timeline items -->
    <div class="space-y-8">
      <div class="relative pl-12">
        <div class="absolute left-0 w-8 h-8 bg-zeo-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
          1
        </div>
        <div>
          <p class="text-caption text-zeo-neutral-500 mb-1">09:00 - 09:30</p>
          <h4 class="text-h4 mb-2">Otel Transferi</h4>
          <p class="text-body text-zeo-neutral-600">
            Otelinizdeki konforlu araçlarımızla alınırsınız.
          </p>
        </div>
      </div>
      
      <div class="relative pl-12">
        <div class="absolute left-0 w-8 h-8 bg-zeo-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
          2
        </div>
        <div>
          <p class="text-caption text-zeo-neutral-500 mb-1">10:00 - 12:00</p>
          <h4 class="text-h4 mb-2">İlk Koy Molası</h4>
          <p class="text-body text-zeo-neutral-600">
            Tertemiz sularda yüzme ve şnorkel keyfi.
          </p>
        </div>
      </div>
      
      <!-- More timeline items -->
    </div>
  </div>
</div>
```

---

#### E. Lokasyon Haritası

```html
<div class="py-8">
  <h3 class="text-h3 mb-6">Konum</h3>
  <div class="rounded-2xl overflow-hidden shadow-lg">
    <iframe 
      src="https://maps.google.com/..." 
      class="w-full h-96"
      loading="lazy"
    ></iframe>
  </div>
  <p class="text-body text-zeo-neutral-600 mt-4">
    <LocationIcon class="inline w-5 h-5" />
    Kemer Marina, Antalya
  </p>
</div>
```

---

#### F. Yorumlar Section

```html
<div class="py-8">
  <h3 class="text-h3 mb-6">Müşteri Yorumları (124)</h3>
  
  <!-- Rating Overview -->
  <div class="flex items-center gap-8 p-6 bg-zeo-neutral-50 rounded-2xl mb-8">
    <div class="text-center">
      <p class="text-display-lg text-zeo-primary-600 font-bold">4.8</p>
      <div class="flex text-zeo-accent-500 text-xl mt-2">★★★★★</div>
      <p class="text-body-sm text-zeo-neutral-600 mt-1">124 yorum</p>
    </div>
    
    <!-- Rating Breakdown -->
    <div class="flex-1 space-y-2">
      <div class="flex items-center gap-3">
        <span class="text-body-sm w-12">5 ★</span>
        <div class="flex-1 h-2 bg-zeo-neutral-200 rounded-full overflow-hidden">
          <div class="h-full bg-zeo-accent-500" style="width: 85%"></div>
        </div>
        <span class="text-body-sm text-zeo-neutral-600 w-12">105</span>
      </div>
      <!-- More rating bars -->
    </div>
  </div>
  
  <!-- Individual Reviews -->
  <div class="space-y-6">
    <div class="border-b border-zeo-neutral-200 pb-6">
      <div class="flex items-start gap-4">
        <img src="avatar.jpg" class="w-12 h-12 rounded-full" />
        <div class="flex-1">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="text-body font-semibold">Ahmet Yılmaz</p>
              <p class="text-body-sm text-zeo-neutral-500">2 gün önce</p>
            </div>
            <div class="flex text-zeo-accent-500">★★★★★</div>
          </div>
          <p class="text-body text-zeo-neutral-700">
            Muhteşem bir deneyimdi! Rehberimiz çok ilgiliydi ve rotamız harikaydı...
          </p>
        </div>
      </div>
    </div>
    <!-- More reviews -->
  </div>
  
  <!-- Load More Button -->
  <button class="w-full mt-6 py-3 border-2 border-zeo-neutral-300 rounded-xl text-button hover:bg-zeo-neutral-50 transition">
    Daha Fazla Yorum Göster
  </button>
</div>
```

---

### 3. Sağ Panel - Rezervasyon Kartı (Sticky)

```html
<div class="sticky top-24 bg-white rounded-2xl shadow-2xl p-6 border border-zeo-neutral-200">
  <!-- Fiyat Header -->
  <div class="flex items-baseline justify-between mb-6 pb-6 border-b border-zeo-neutral-200">
    <div>
      <p class="text-caption text-zeo-neutral-500 mb-1">Kişi Başı</p>
      <p class="text-display-lg text-zeo-primary-600 font-space">₺2,499</p>
    </div>
    <span class="px-3 py-1 bg-zeo-success/10 text-zeo-success rounded-full text-caption font-semibold">
      %10 İndirim
    </span>
  </div>
  
  <!-- Tarih Seçimi -->
  <div class="mb-4">
    <label class="block text-body-sm font-semibold text-zeo-neutral-700 mb-2">
      Tarih Seçin
    </label>
    <input 
      type="date" 
      class="w-full px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none transition"
    />
  </div>
  
  <!-- Kişi Sayısı -->
  <div class="mb-4">
    <label class="block text-body-sm font-semibold text-zeo-neutral-700 mb-2">
      Kişi Sayısı
    </label>
    <div class="flex items-center gap-4">
      <button class="w-10 h-10 rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-100 transition">
        -
      </button>
      <input 
        type="number" 
        value="2" 
        class="flex-1 text-center px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
      />
      <button class="w-10 h-10 rounded-lg border-2 border-zeo-neutral-200 hover:bg-zeo-neutral-100 transition">
        +
      </button>
    </div>
  </div>
  
  <!-- Fiyat Özeti -->
  <div class="space-y-3 py-4 border-y border-zeo-neutral-200 mb-6">
    <div class="flex justify-between text-body">
      <span class="text-zeo-neutral-600">₺2,499 x 2 kişi</span>
      <span class="font-semibold">₺4,998</span>
    </div>
    <div class="flex justify-between text-body">
      <span class="text-zeo-neutral-600">Erken rezervasyon indirimi</span>
      <span class="text-zeo-success font-semibold">-₺500</span>
    </div>
    <div class="flex justify-between text-h4 pt-2">
      <span>Toplam</span>
      <span class="text-zeo-primary-600 font-space">₺4,498</span>
    </div>
  </div>
  
  <!-- CTA Button -->
  <button class="w-full py-4 bg-zeo-accent-500 text-white rounded-xl text-button-lg font-bold hover:bg-zeo-accent-600 transition-colors shadow-lg shadow-zeo-accent-500/30">
    Rezervasyon Yap →
  </button>
  
  <!-- Trust Badge -->
  <div class="flex items-center justify-center gap-2 mt-4 text-body-sm text-zeo-neutral-600">
    <ShieldCheckIcon class="w-5 h-5 text-zeo-success" />
    <span>Güvenli ödeme - Ücretsiz iptal</span>
  </div>
</div>
```

**Sticky Behavior:**
- `position: sticky; top: 96px` (header height + padding)
- Mobile'da sticky değil, bottom drawer'a dönüşür

---

### Mobile Responsive (Tur Detay)

**Mobile Layout:**
```
┌──────────────────────────┐
│  [Galeri]                │
├──────────────────────────┤
│  Başlık + Rating         │
│  Quick Info Grid         │
├──────────────────────────┤
│  [Sticky Bottom Bar]     │  <- Fiyat + "Rezervasyon" button
└──────────────────────────┘
│  Açıklama                │
│  Neler Dahil             │
│  Program                 │
│  Yorumlar                │
└──────────────────────────┘
```

**Sticky Bottom Bar (Mobile):**
```html
<div class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-zeo-neutral-200 p-4 z-40">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-caption text-zeo-neutral-500">Kişi Başı</p>
      <p class="text-h3 text-zeo-primary-600 font-space">₺2,499</p>
    </div>
    <button class="px-6 py-3 bg-zeo-accent-500 text-white rounded-xl text-button font-bold">
      Rezervasyon Yap
    </button>
  </div>
</div>
```

---

## 🎫 REZERVASYON FLOW {#rezervasyon-flow}

### Kullanıcı Journey

```
1. Tur Detay Sayfası
   ↓ [Rezervasyon Yap Button]
   
2. Rezervasyon Formu (Modal veya Dedicated Page)
   ↓ Form doldurulur
   
3. Ödeme Sayfası
   ↓ Ödeme bilgileri
   
4. Onay Sayfası
   ↓ E-posta + SMS
   
5. Hesabım / Rezervasyonlarım
```

---

### 1. Rezervasyon Formu Modal

**Layout:** Full-screen modal (mobile) / Centered modal (desktop)

```
┌────────────────────────────────────────────┐
│  ✕                  Rezervasyon Formu      │
├────────────────────────────────────────────┤
│                                            │
│  ADIM 1: TARİH VE KATILIMCI BİLGİLERİ     │
│                                            │
│  [Tarih seçimi] ────────────────────       │
│  [Saat seçimi] ─────────                   │
│  [Yetişkin sayısı] ─                       │
│  [Çocuk sayısı] ────                       │
│                                            │
│  ────────────────────────────              │
│                                            │
│  ADIM 2: İLETİŞİM BİLGİLERİ               │
│                                            │
│  [Ad Soyad] ────────────────────           │
│  [E-posta] ─────────────────────           │
│  [Telefon] ─────────────────────           │
│                                            │
│  ────────────────────────────              │
│                                            │
│  ADIM 3: EK HİZMETLER (Opsiyonel)         │
│                                            │
│  ☐ Transfer hizmeti (+₺200)               │
│  ☐ Fotoğraf paketi (+₺350)                │
│  ☐ GoPro kiralama (+₺150)                 │
│                                            │
│  ────────────────────────────              │
│                                            │
│  FİYAT ÖZETİ                               │
│  Toplam: ₺4,498                            │
│                                            │
│  [Geri]  [Ödemeye Geç →]                  │
│                                            │
└────────────────────────────────────────────┘
```

**Form Validation:**
- Realtime validation (hata mesajları instant)
- Required field indicators (*)
- Success/error states (border renkleri)

**Step Indicator (Top):**
```html
<div class="flex items-center justify-center gap-2 mb-8">
  <div class="flex items-center">
    <div class="w-8 h-8 rounded-full bg-zeo-primary-500 text-white flex items-center justify-center font-semibold">
      1
    </div>
    <span class="ml-2 text-body-sm font-semibold">Tarih</span>
  </div>
  <div class="w-12 h-0.5 bg-zeo-neutral-200"></div>
  <div class="flex items-center">
    <div class="w-8 h-8 rounded-full bg-zeo-neutral-200 text-zeo-neutral-500 flex items-center justify-center font-semibold">
      2
    </div>
    <span class="ml-2 text-body-sm text-zeo-neutral-500">Bilgiler</span>
  </div>
  <div class="w-12 h-0.5 bg-zeo-neutral-200"></div>
  <div class="flex items-center">
    <div class="w-8 h-8 rounded-full bg-zeo-neutral-200 text-zeo-neutral-500 flex items-center justify-center font-semibold">
      3
    </div>
    <span class="ml-2 text-body-sm text-zeo-neutral-500">Ödeme</span>
  </div>
</div>
```

---

### 2. Ödeme Sayfası

```
┌────────────────────────────────────────────┐
│  ÖDEME BİLGİLERİ                           │
├────────────────────────┬───────────────────┤
│                        │                   │
│  SOL (60%)             │  SAĞ (40%)        │
│                        │                   │
│  [Kredi Kartı]         │  REZERVASYON      │
│  [Banka Kartı]         │  ÖZETİ            │
│  [Havale/EFT]          │                   │
│                        │  Tur: ...         │
│  ───────────────────   │  Tarih: ...       │
│                        │  Kişi: 2          │
│  Kart Numarası         │  ───────────────  │
│  [____][____][____]    │  Toplam:          │
│                        │  ₺4,498           │
│  Son Kullanma          │                   │
│  [MM/YY]  [CVV]        │  [Ödeme Yap]      │
│                        │                   │
│  ☑ Sözleşmeyi kabul    │                   │
│                        │                   │
│  [Ödemeyi Tamamla]     │                   │
│                        │                   │
└────────────────────────┴───────────────────┘
```

**Güvenlik Elementleri:**
- SSL badge (footer)
- 3D Secure logo
- "Güvenli ödeme" badge (lock icon)

**Kart Input (Custom Design):**
```html
<!-- Card Number Input with Visa/Mastercard detection -->
<div class="relative">
  <input 
    type="text" 
    placeholder="0000 0000 0000 0000"
    class="w-full px-4 py-3 pl-12 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500"
  />
  <CreditCardIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zeo-neutral-400" />
  <!-- Auto-detected card logo (Visa/Mastercard) appears on right -->
</div>
```

---

### 3. Onay Sayfası (Success State)

```
┌────────────────────────────────────────────┐
│                                            │
│         [Success Animation Icon]           │
│                                            │
│      Rezervasyonunuz Alındı!               │
│                                            │
│  Rezervasyon numaranız: #ZEO-2024-1234    │
│                                            │
│  E-posta adresinize onay gönderildi.      │
│                                            │
│  ──────────────────────────────            │
│                                            │
│  REZERVASYON DETAYLARI                     │
│                                            │
│  Tur: Tekne Turu - Kemer Koyları          │
│  Tarih: 15 Ağustos 2024, Çarşamba         │
│  Saat: 09:00                               │
│  Kişi: 2 Yetişkin                          │
│  Toplam: ₺4,498                            │
│                                            │
│  [Rezervasyonlarımı Görüntüle]             │
│  [Ana Sayfaya Dön]                         │
│                                            │
└────────────────────────────────────────────┘
```

**Success Animation:**
- Checkmark icon (animated, scale + fade-in)
- Confetti effect (subtle, 2 saniye)
- Auto-scroll to top

---

### Error States

**Ödeme Hatası:**
```
┌────────────────────────────────────────────┐
│  [Error Icon]                              │
│                                            │
│  Ödeme İşlemi Başarısız                    │
│                                            │
│  Kartınızdan ödeme alınamadı. Lütfen       │
│  kart bilgilerinizi kontrol edip tekrar    │
│  deneyin.                                  │
│                                            │
│  [Tekrar Dene]  [Farklı Yöntem]           │
└────────────────────────────────────────────┘
```

---

## 🧩 KOMPONENT KÜTÜPHANESİ {#komponent-kutuphanesi}

### Temel Komponentler

#### 1. Button Varyantları

```html
<!-- Primary Button -->
<button class="px-6 py-3 bg-zeo-accent-500 text-white rounded-xl text-button font-semibold hover:bg-zeo-accent-600 active:scale-95 transition-all duration-200 shadow-lg shadow-zeo-accent-500/30">
  Rezervasyon Yap
</button>

<!-- Secondary Button -->
<button class="px-6 py-3 bg-transparent border-2 border-zeo-neutral-300 text-zeo-neutral-700 rounded-xl text-button font-semibold hover:bg-zeo-neutral-100 active:scale-95 transition-all">
  İptal
</button>

<!-- Outline Button -->
<button class="px-6 py-3 bg-transparent border-2 border-zeo-primary-500 text-zeo-primary-600 rounded-xl text-button font-semibold hover:bg-zeo-primary-50 transition-all">
  Daha Fazla
</button>

<!-- Icon Button -->
<button class="w-10 h-10 flex items-center justify-center rounded-lg bg-zeo-neutral-100 hover:bg-zeo-neutral-200 transition">
  <HeartIcon class="w-5 h-5" />
</button>

<!-- Floating Action Button -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-zeo-accent-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform">
  <ChatIcon class="w-6 h-6 mx-auto" />
</button>
```

---

#### 2. Input Fields

```html
<!-- Text Input -->
<div class="space-y-2">
  <label class="text-body-sm font-semibold text-zeo-neutral-700">
    Ad Soyad *
  </label>
  <input 
    type="text" 
    placeholder="Adınızı girin"
    class="w-full px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none transition placeholder:text-zeo-neutral-400"
  />
  <p class="text-body-sm text-zeo-error">Bu alan zorunludur</p>
</div>

<!-- Search Input (with icon) -->
<div class="relative">
  <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zeo-neutral-400" />
  <input 
    type="search" 
    placeholder="Tur ara..."
    class="w-full pl-12 pr-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none"
  />
</div>

<!-- Select/Dropdown -->
<select class="w-full px-4 py-3 border-2 border-zeo-neutral-200 rounded-xl focus:border-zeo-primary-500 focus:outline-none appearance-none bg-white cursor-pointer">
  <option>Kategori Seçin</option>
  <option>Tekne Turu</option>
  <option>Safari Turu</option>
</select>
```

---

#### 3. Card Komponentleri

**Tour Card (Featured):**
```html
<div class="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer">
  <img src="tour.jpg" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
  
  <span class="absolute top-4 right-4 bg-zeo-accent-500 text-white px-3 py-1 rounded-full text-caption font-semibold">
    Popüler
  </span>
  
  <div class="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
    <h3 class="text-h4 text-zeo-neutral-900 mb-2">Tekne Turu</h3>
    <div class="flex items-center gap-2 mb-3">
      <div class="flex text-zeo-accent-500">★★★★★</div>
      <span class="text-body-sm text-zeo-neutral-600">4.8 (124)</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-h3 text-zeo-primary-600 font-space">₺2,499</span>
      <button class="bg-zeo-accent-500 text-white px-4 py-2 rounded-xl text-button hover:bg-zeo-accent-600">
        İncele →
      </button>
    </div>
  </div>
</div>
```

**Info Card (Stats):**
```html
<div class="bg-white rounded-2xl p-6 shadow-lg border border-zeo-neutral-100 hover:shadow-xl transition-shadow">
  <div class="w-12 h-12 bg-zeo-primary-100 rounded-xl flex items-center justify-center mb-4">
    <UsersIcon class="w-6 h-6 text-zeo-primary-600" />
  </div>
  <p class="text-display-lg text-zeo-neutral-900 font-bold mb-2">10,000+</p>
  <p class="text-body text-zeo-neutral-600">Mutlu Müşteri</p>
</div>
```

---

#### 4. Badge Komponentleri

```html
<!-- Status Badge -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-zeo-success/10 text-zeo-success rounded-full text-caption font-semibold">
  <CheckIcon class="w-4 h-4" />
  Onaylandı
</span>

<!-- Category Badge -->
<span class="px-3 py-1 bg-zeo-primary-100 text-zeo-primary-700 rounded-full text-caption font-semibold">
  Tekne Turu
</span>

<!-- Count Badge -->
<span class="w-6 h-6 bg-zeo-accent-500 text-white rounded-full text-caption font-bold flex items-center justify-center">
  3
</span>
```

---

#### 5. Modal/Dialog

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <!-- Modal -->
  <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-zeo-neutral-200">
      <h2 class="text-h3">Modal Başlık</h2>
      <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zeo-neutral-100 transition">
        <XIcon class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Body -->
    <div class="p-6">
      <!-- Content here -->
    </div>
    
    <!-- Footer (optional) -->
    <div class="flex items-center justify-end gap-3 p-6 border-t border-zeo-neutral-200">
      <button class="px-6 py-3 border-2 border-zeo-neutral-300 rounded-xl">İptal</button>
      <button class="px-6 py-3 bg-zeo-accent-500 text-white rounded-xl">Onayla</button>
    </div>
  </div>
</div>
```

---

#### 6. Alert/Notification

```html
<!-- Success Alert -->
<div class="flex items-start gap-3 p-4 bg-zeo-success/10 border-l-4 border-zeo-success rounded-lg">
  <CheckCircleIcon class="w-6 h-6 text-zeo-success flex-shrink-0" />
  <div class="flex-1">
    <p class="text-body font-semibold text-zeo-success">Başarılı!</p>
    <p class="text-body-sm text-zeo-neutral-700">Rezervasyonunuz oluşturuldu.</p>
  </div>
  <button class="text-zeo-neutral-500 hover:text-zeo-neutral-700">
    <XIcon class="w-5 h-5" />
  </button>
</div>

<!-- Error Alert -->
<div class="flex items-start gap-3 p-4 bg-zeo-error/10 border-l-4 border-zeo-error rounded-lg">
  <AlertCircleIcon class="w-6 h-6 text-zeo-error flex-shrink-0" />
  <div class="flex-1">
    <p class="text-body font-semibold text-zeo-error">Hata!</p>
    <p class="text-body-sm text-zeo-neutral-700">Bir sorun oluştu.</p>
  </div>
</div>
```

---

#### 7. Loading States

```html
<!-- Spinner -->
<div class="w-8 h-8 border-4 border-zeo-neutral-200 border-t-zeo-primary-500 rounded-full animate-spin"></div>

<!-- Skeleton Card -->
<div class="animate-pulse space-y-4">
  <div class="h-48 bg-zeo-neutral-200 rounded-2xl"></div>
  <div class="h-4 bg-zeo-neutral-200 rounded w-3/4"></div>
  <div class="h-4 bg-zeo-neutral-200 rounded w-1/2"></div>
</div>

<!-- Progress Bar -->
<div class="w-full h-2 bg-zeo-neutral-200 rounded-full overflow-hidden">
  <div class="h-full bg-zeo-primary-500 rounded-full transition-all duration-300" style="width: 60%"></div>
</div>
```

---

## ✨ ANIMASYON VE MICRO-INTERACTIONS {#animasyonlar}

### Animasyon Felsefesi

**İlkeler:**
1. **Purposeful**: Her animasyon bir amaca hizmet etmeli (feedback, guidance, delight)
2. **Subtle**: Abartısız, doğal hissetmeli
3. **Fast**: 200-400ms arası (kullanıcıyı bekletmeyen)
4. **Consistent**: Tüm sitede tutarlı easing curves

### Easing Functions (Tailwind Config)

```js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',        // Default smooth
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',  // Playful
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',   // Overshoot
      },
    },
  },
}
```

---

### Kullanım Örnekleri

#### 1. Button Hover/Click

```html
<!-- Hover: Scale + Shadow -->
<button class="... hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200">
  Tıkla
</button>
```

**Davranış:**
- Hover: Hafif büyür (scale 1.05), shadow artar
- Click: Hafif küçülür (scale 0.95), feedback hissi

---

#### 2. Card Hover

```html
<div class="group ...">
  <img class="... group-hover:scale-110 transition-transform duration-500" />
  <div class="... group-hover:-translate-y-2 transition-transform duration-300">
    <!-- Card content -->
  </div>
</div>
```

**Davranış:**
- Image: Yavaş zoom (500ms)
- Floating card: Yukarı kayar (-translate-y-2, 300ms)
- Parallax effect hissi

---

#### 3. Page Load Animations (Staggered Fade-in)

```css
@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-up {
  animation: fade-slide-up 0.6s ease-out forwards;
}

/* Stagger delay for child elements */
.stagger-children > * {
  animation: fade-slide-up 0.6s ease-out forwards;
  opacity: 0;
}

.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
```

**Kullanım:**
```html
<div class="stagger-children">
  <h1>Başlık</h1>
  <p>Açıklama</p>
  <button>CTA</button>
</div>
```

---

#### 4. Scroll-triggered Animations (Intersection Observer)

```js
// Scroll into view → Animate
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});
```

**CSS:**
```css
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-fade-in {
  opacity: 1;
  transform: translateY(0);
}
```

---

#### 5. Loading Shimmer Effect

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}
```

---

#### 6. Floating Animation (Badges)

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

**Kullanım:**
```html
<div class="absolute ... animate-float">
  <span>4.9 ★★★★★</span>
</div>
```

---

#### 7. Notification Toast (Slide-in from top)

```css
@keyframes slide-in-top {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast-enter {
  animation: slide-in-top 0.3s ease-out forwards;
}
```

---

#### 8. Modal Open/Close

```css
/* Backdrop fade */
@keyframes backdrop-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal scale + fade */
@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-backdrop {
  animation: backdrop-fade-in 0.2s ease-out;
}

.modal-content {
  animation: modal-appear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### Micro-Interactions Checklist

- [ ] **Button hover**: Scale + shadow
- [ ] **Button click**: Scale down (active state)
- [ ] **Input focus**: Border glow animation
- [ ] **Card hover**: Image zoom + content lift
- [ ] **Link hover**: Underline slide-in
- [ ] **Loading states**: Spinner or skeleton
- [ ] **Success feedback**: Checkmark animation + confetti
- [ ] **Error feedback**: Shake animation
- [ ] **Page transitions**: Fade or slide
- [ ] **Scroll-triggered**: Fade-in on scroll into view
- [ ] **Floating badges**: Gentle float animation

---

## 📱 RESPONSIVE TASARIM STRATEJİSİ {#responsive-tasarim}

### Breakpoint Sistemi

```js
// tailwind.config.js

module.exports = {
  theme: {
    screens: {
      'xs': '475px',   // Large phones
      'sm': '640px',   // Tablets (portrait)
      'md': '768px',   // Tablets (landscape)
      'lg': '1024px',  // Laptops
      'xl': '1280px',  // Desktops
      '2xl': '1536px', // Large desktops
    },
  },
}
```

### Mobile-First Approach

**Strateji:**
1. Önce mobile tasarla (320px-768px)
2. Tablet için optimize et (768px-1024px)
3. Desktop için genişlet (1024px+)

---

### Responsive Patterns

#### 1. Navigation

**Mobile (<768px):**
```
┌────────────────────────┐
│  [Logo]    [Hamburger] │
└────────────────────────┘

<!-- Hamburger click: Full-screen menu -->
┌────────────────────────┐
│  ✕                     │
│                        │
│  Ana Sayfa             │
│  Turlar                │
│  Hakkımızda            │
│  İletişim              │
│                        │
│  [Rezervasyon Yap]     │
└────────────────────────┘
```

**Desktop (>1024px):**
```
┌──────────────────────────────────────────┐
│  [Logo]  [Ana] [Turlar] [Hakkımızda]     │
│          [İletişim]  [Rezervasyon Yap]   │
└──────────────────────────────────────────┘
```

**Kod:**
```html
<!-- Mobile -->
<nav class="lg:hidden">
  <button class="hamburger">☰</button>
</nav>

<!-- Desktop -->
<nav class="hidden lg:flex items-center gap-8">
  <a href="/">Ana Sayfa</a>
  <a href="/tours">Turlar</a>
  <!-- ... -->
</nav>
```

---

#### 2. Grid Layouts

**Featured Tours:**
```html
<!-- Mobile: 1 column -->
<!-- Tablet: 2 columns -->
<!-- Desktop: 3 columns -->

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>
```

**Quick Info (Tour Detail):**
```html
<!-- Mobile: 2x2 -->
<!-- Desktop: 4x1 -->

<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Info items -->
</div>
```

---

#### 3. Hero Section

**Mobile:**
```
┌────────────────────────┐
│  [Image - Full Width]  │
├────────────────────────┤
│  Başlık                │
│  Açıklama              │
│  [CTA]                 │
└────────────────────────┘
```

**Desktop:**
```
┌─────────────────┬──────────────┐
│  Başlık         │  [Image]     │
│  Açıklama       │              │
│  [CTA]          │              │
└─────────────────┴──────────────┘
```

**Kod:**
```html
<div class="grid lg:grid-cols-2 gap-8">
  <!-- Left: Text (order-2 on mobile, order-1 on desktop) -->
  <div class="order-2 lg:order-1">
    <h1>...</h1>
  </div>
  
  <!-- Right: Image (order-1 on mobile, order-2 on desktop) -->
  <div class="order-1 lg:order-2">
    <img src="..." />
  </div>
</div>
```

---

#### 4. Filter Sidebar (Tour Listing)

**Mobile:**
- Sidebar → Bottom sheet modal
- "Filtrele" floating button

**Desktop:**
- Fixed sidebar (sticky)

**Kod:**
```html
<!-- Mobile: Hidden by default, shown in modal -->
<div class="hidden lg:block lg:w-1/4">
  <div class="sticky top-24">
    <!-- Filters -->
  </div>
</div>

<!-- Mobile: Floating button -->
<button class="lg:hidden fixed bottom-6 right-6 ...">
  Filtrele
</button>

<!-- Mobile: Filter modal (toggle visibility) -->
<div class="lg:hidden fixed inset-0 bg-white z-50 ...">
  <!-- Filters -->
</div>
```

---

#### 5. Rezervasyon Card (Tour Detail)

**Mobile:**
- Sticky bottom bar (collapsed)
- Click: Expands to full-screen form

**Desktop:**
- Sticky sidebar card

**Kod:**
```html
<!-- Desktop: Sticky card -->
<div class="hidden lg:block lg:w-1/3">
  <div class="sticky top-24">
    <!-- Reservation form -->
  </div>
</div>

<!-- Mobile: Sticky bottom bar -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 z-40">
  <div class="flex items-center justify-between">
    <div>
      <p>₺2,499</p>
    </div>
    <button>Rezervasyon Yap</button>
  </div>
</div>
```

---

#### 6. Typography Scaling

```html
<!-- H1: Responsive font sizes -->
<h1 class="text-3xl md:text-4xl lg:text-display-xl">
  Başlık
</h1>

<!-- Body: Responsive line-height and size -->
<p class="text-body-sm md:text-body leading-relaxed">
  Açıklama...
</p>
```

---

#### 7. Images

**Responsive Images:**
```html
<img 
  src="tour-800.jpg" 
  srcset="tour-400.jpg 400w, tour-800.jpg 800w, tour-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Tur"
  loading="lazy"
/>
```

**Aspect Ratios:**
```html
<!-- Mobile: Square (1:1) -->
<!-- Desktop: Wide (16:9) -->
<div class="aspect-square md:aspect-video">
  <img src="..." class="w-full h-full object-cover" />
</div>
```

---

### Container & Padding

```html
<!-- Container: Max-width + centered -->
<div class="container mx-auto px-4 sm:px-6 lg:px-12">
  <!-- Content -->
</div>
```

**Padding Scale:**
- Mobile: `px-4` (16px)
- Tablet: `px-6` (24px)
- Desktop: `px-12` (48px)

---

### Touch Targets (Mobile)

**Rule:** Minimum 44x44px touch area (Apple HIG)

```html
<!-- Mobile: Larger tap areas -->
<button class="min-w-[44px] min-h-[44px] p-3 ...">
  Icon
</button>

<!-- Desktop: Can be smaller -->
<button class="lg:min-w-0 lg:p-2 ...">
  Icon
</button>
```

---

## 📊 KULLANICI AKIŞ DİYAGRAMLARI {#kullanici-akislari}

### 1. Ana Akış: Tur Keşfetme ve Rezervasyon

```
[Ana Sayfa]
    │
    ├─→ [Hero CTA: "Turları Keşfet"] ──→ [Tur Listeleme]
    │                                         │
    ├─→ [Featured Tur Kartı] ────────────────┤
    │                                         │
    ├─→ [Kategori Seçimi] ────────────────────┤
    │                                         ▼
    │                                   [Tur Detay]
    │                                         │
    │                          ┌──────────────┼──────────────┐
    │                          │              │              │
    │                    [Geri Dön]  [Rezervasyon Yap]  [Favorile]
    │                                         │
    │                                         ▼
    │                                [Rezervasyon Formu]
    │                                         │
    │                          ┌──────────────┼──────────────┐
    │                          │              │              │
    │                    [İptal]        [Ödemeye Geç]    [Kaydet]
    │                                         │
    │                                         ▼
    │                                  [Ödeme Sayfası]
    │                                         │
    │                          ┌──────────────┼──────────────┐
    │                          │              │              │
    │                    [Geri]         [Ödeme Yap]    [Farklı Yöntem]
    │                                         │
    │                          ┌──────────────┴──────────────┐
    │                          │                             │
    │                    [Başarılı]                      [Hata]
    │                          │                             │
    │                          ▼                             ▼
    │                   [Onay Sayfası]              [Hata Sayfası]
    │                          │                             │
    │                          │                        [Tekrar Dene]
    │                          │                             │
    │                          └─────────────────────────────┘
    │
    └─→ [WhatsApp CTA] ──→ [Harici: WhatsApp]
```

---

### 2. Filtreleme Akışı (Tur Listeleme)

```
[Tur Listeleme Sayfası]
    │
    ├─→ [Sidebar: Fiyat Filtresi] ──→ [Sonuçlar Güncellenir]
    │                                         │
    ├─→ [Sidebar: Kategori Seçimi] ──────────┤
    │                                         │
    ├─→ [Sidebar: Tarih Seçimi] ─────────────┤
    │                                         │
    ├─→ [Sıralama Değiştir] ─────────────────┤
    │                                         │
    │                                         ▼
    │                                 [Filtrelenmiş Liste]
    │                                         │
    │                          ┌──────────────┼──────────────┐
    │                          │              │              │
    │                  [Tur Seç]    [Filtreleri Temizle]  [Daha Fazla Yükle]
    │                          │                             │
    │                          ▼                             ▼
    │                   [Tur Detay]                   [Sonraki 10 Tur]
```

---

### 3. Mobile Navigation Akışı

```
[Ana Sayfa - Mobile]
    │
    ├─→ [Hamburger Menu] ──→ [Full-Screen Menu]
    │                              │
    │                              ├─→ [Ana Sayfa]
    │                              ├─→ [Turlar] ──→ [Tur Listeleme]
    │                              ├─→ [Hakkımızda]
    │                              ├─→ [İletişim]
    │                              └─→ [Rezervasyon Yap] ──→ [Tur Listeleme]
    │
    ├─→ [Kategori Chips] ──→ [Filtered Tur Listeleme]
    │
    └─→ [Floating "Filtrele" Button] ──→ [Bottom Sheet: Filters]
                                              │
                                              ├─→ [Filtreleri Uygula]
                                              └─→ [İptal]
```

---

### 4. Error Handling Akışı

```
[Ödeme Sayfası]
    │
    ├─→ [Kart Bilgileri Yanlış] ──→ [Inline Error Message]
    │                                  │
    │                                  └─→ [Düzelt] ──→ [Tekrar Dene]
    │
    ├─→ [Ödeme Reddedildi] ──→ [Error Modal]
    │                              │
    │                              ├─→ [Tekrar Dene]
    │                              └─→ [Farklı Yöntem] ──→ [Ödeme Sayfası]
    │
    ├─→ [Network Hatası] ──→ [Retry Prompt]
    │                              │
    │                              └─→ [Otomatik Retry (3x)]
    │
    └─→ [Timeout] ──→ [Contact Support Message]
                         │
                         └─→ [WhatsApp] / [Telefon]
```

---

### 5. Social Proof Journey

```
[Kullanıcı Ana Sayfaya Gelir]
    │
    ├─→ [Hero Trust Badges Görür] (✓ 10k+ Müşteri)
    │        │
    │        └─→ [Initial Trust ⬆]
    │
    ├─→ [Featured Tour'a Scroll] ──→ [★★★★★ 4.8 Rating Görür]
    │                                     │
    │                                     └─→ [Social Validation ⬆]
    │
    ├─→ [Social Proof Section] ──→ [Testimonial Okur]
    │                                 │
    │                                 └─→ [Empathy + Trust ⬆⬆]
    │
    ├─→ [Tur Detay'a Gider] ──→ [124 Yorum Görür]
    │                                │
    │                                └─→ [Confidence ⬆⬆⬆]
    │
    └─→ [Rezervasyon Yapar] (Conversion!)
```

---

## 🔧 TEKNİK IMPLEMENTATION NOTLARI {#teknik-notlar}

### Teknoloji Stack Önerisi

**Frontend Framework:**
- **Next.js 14+** (App Router)
  - SSR/SSG for SEO
  - Image optimization
  - API routes for backend integration

**Styling:**
- **Tailwind CSS 3.4+**
  - Custom config (colors, fonts, animations)
  - Component-first approach

**UI Library:**
- **Shadcn UI** (Radix primitives)
  - Accessible by default
  - Customizable with Tailwind
  - Modals, Dropdowns, Date Picker, etc.

**State Management:**
- **Zustand** (lightweight, simple)
  - Filter state
  - Cart/booking state
  - User preferences

**Form Handling:**
- **React Hook Form + Zod**
  - Type-safe validation
  - Async validation (email, phone)

**Animation:**
- **Framer Motion**
  - Page transitions
  - Complex animations
  - Scroll-triggered animations

**Maps:**
- **Google Maps API** or **Mapbox**
  - Tour location display
  - Interactive maps

**Payment:**
- **Stripe** or **İyzico** (Turkish market)
  - PCI compliant
  - 3D Secure support

**Analytics:**
- **Google Analytics 4**
- **Hotjar** (heatmaps, recordings)
- **PostHog** (product analytics)

---

### Performance Optimizations

#### 1. Image Optimization

```jsx
// Next.js Image component
import Image from 'next/image';

<Image
  src="/tour-kemer.jpg"
  alt="Kemer Tekne Turu"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

**Best Practices:**
- WebP format (fallback to JPEG)
- Responsive images (srcset)
- Lazy loading (below fold)
- Blur-up placeholder
- CDN delivery (Cloudflare, Vercel)

---

#### 2. Code Splitting

```jsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyMap = dynamic(() => import('./HeavyMap'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-side only
});

const ReviewModal = dynamic(() => import('./ReviewModal'));
```

---

#### 3. Caching Strategy

**Static Pages (ISR):**
```jsx
// Tour listing: Revalidate every hour
export const revalidate = 3600; // seconds

export async function getTours() {
  const res = await fetch('https://api.zeotravel.com/tours', {
    next: { revalidate: 3600 }
  });
  return res.json();
}
```

**API Caching:**
- Redis for frequently accessed data
- CDN caching (CloudFlare)
- Browser caching (service worker)

---

#### 4. SEO Optimizations

```jsx
// app/tours/[slug]/page.tsx

export async function generateMetadata({ params }) {
  const tour = await getTour(params.slug);
  
  return {
    title: `${tour.name} | Zeo Travel`,
    description: tour.description.slice(0, 160),
    openGraph: {
      title: tour.name,
      description: tour.description,
      images: [tour.images[0]],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.name,
      description: tour.description,
      images: [tour.images[0]],
    },
  };
}
```

**Schema Markup (JSON-LD):**
```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Kemer Tekne Turu",
  "description": "...",
  "image": "https://...",
  "offers": {
    "@type": "Offer",
    "price": "2499",
    "priceCurrency": "TRY"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124"
  }
}
</script>
```

---

#### 5. Accessibility (WCAG 2.1 AA)

**Checklist:**
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus indicators (visible outlines)
- [ ] ARIA labels (buttons, links)
- [ ] Color contrast (4.5:1 for text)
- [ ] Alt text for images
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Skip to main content link
- [ ] Form validation (aria-invalid, aria-describedby)

**Example:**
```jsx
<button
  aria-label="Rezervasyon yap"
  aria-describedby="price-info"
  className="..."
>
  Rezervasyon Yap
</button>
<p id="price-info" className="sr-only">
  Kişi başı 2,499 TL
</p>
```

---

#### 6. Analytics Events

**Track Key Actions:**
```js
// Google Analytics 4
gtag('event', 'view_item', {
  items: [{
    item_id: tour.id,
    item_name: tour.name,
    item_category: tour.category,
    price: tour.price,
  }]
});

gtag('event', 'begin_checkout', {
  value: totalPrice,
  currency: 'TRY',
  items: [...]
});

gtag('event', 'purchase', {
  transaction_id: booking.id,
  value: booking.total,
  currency: 'TRY',
  items: [...]
});
```

---

### Folder Structure (Next.js App Router)

```
zeo-travel/
├─ app/
│  ├─ (marketing)/
│  │  ├─ page.tsx              # Ana sayfa
│  │  ├─ about/
│  │  │  └─ page.tsx
│  │  └─ contact/
│  │     └─ page.tsx
│  │
│  ├─ tours/
│  │  ├─ page.tsx              # Tur listeleme
│  │  ├─ [slug]/
│  │  │  └─ page.tsx           # Tur detay
│  │  └─ loading.tsx
│  │
│  ├─ booking/
│  │  ├─ [tourId]/
│  │  │  └─ page.tsx           # Rezervasyon formu
│  │  └─ success/
│  │     └─ page.tsx
│  │
│  ├─ api/
│  │  ├─ tours/
│  │  │  └─ route.ts
│  │  ├─ booking/
│  │  │  └─ route.ts
│  │  └─ payment/
│  │     └─ route.ts
│  │
│  └─ layout.tsx               # Root layout
│
├─ components/
│  ├─ ui/                      # Shadcn components
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ input.tsx
│  │  └─ ...
│  │
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ MobileNav.tsx
│  │
│  ├─ tour/
│  │  ├─ TourCard.tsx
│  │  ├─ TourGrid.tsx
│  │  ├─ TourFilters.tsx
│  │  └─ TourDetail/
│  │     ├─ Gallery.tsx
│  │     ├─ BookingCard.tsx
│  │     ├─ Reviews.tsx
│  │     └─ ...
│  │
│  └─ booking/
│     ├─ BookingForm.tsx
│     ├─ PaymentForm.tsx
│     └─ ConfirmationCard.tsx
│
├─ lib/
│  ├─ utils.ts                 # Utility functions
│  ├─ api.ts                   # API client
│  ├─ validations.ts           # Zod schemas
│  └─ store.ts                 # Zustand store
│
├─ public/
│  ├─ images/
│  ├─ icons/
│  └─ fonts/
│
├─ styles/
│  └─ globals.css              # Global styles + Tailwind
│
└─ tailwind.config.js
```

---

## 📦 FİNAL DELIVERABLES

### Dökümanlar

1. **UI/UX Design Document** ✅ (Bu döküman)
2. **Component Library** (Storybook veya Figma)
3. **Wireframes** (Low-fidelity)
4. **Mockups** (High-fidelity)
5. **Prototype** (Interactive Figma)
6. **Style Guide** (Colors, fonts, spacing)
7. **User Flow Diagrams** ✅
8. **Responsive Breakpoints** ✅

### Figma Tasarım Önerileri

**Sayfalar:**
1. Ana Sayfa (Desktop + Mobile)
2. Tur Listeleme (Desktop + Mobile)
3. Tur Detay (Desktop + Mobile)
4. Rezervasyon Formu (Desktop + Mobile)
5. Ödeme Sayfası
6. Onay Sayfası
7. Hakkımızda / İletişim

**Komponentler (Library):**
- Buttons (primary, secondary, outline)
- Input fields (text, date, number)
- Cards (tour card, info card)
- Modal/Dialog
- Navigation (desktop, mobile)
- Badges
- Loading states
- Error states

---

## 🎯 ÖNCELİK SIRASI (IMPLEMENTATION)

### Phase 1: MVP (4 hafta)
1. Ana sayfa (hero + featured tours)
2. Tur listeleme (basit filtreleme)
3. Tur detay (static, rezervasyon butonu)
4. İletişim formu
5. Mobile responsive

### Phase 2: Booking Flow (3 hafta)
1. Rezervasyon formu
2. Ödeme entegrasyonu (İyzico/Stripe)
3. E-posta bildirimler
4. Admin panel (rezervasyon yönetimi)

### Phase 3: Enhancement (2 hafta)
1. Yorum sistemi
2. Favorileme
3. Gelişmiş filtreleme
4. Animasyonlar
5. Performance optimizations

### Phase 4: Marketing (Ongoing)
1. SEO optimizations
2. Google Ads entegrasyonu
3. Analytics setup
4. A/B testing
5. Conversion rate optimization

---

## 🚀 ÖNERİLER VE BEST PRACTICES

### Tasarım

1. **Whitespace is your friend**: Elemanlar arasında bol boşluk bırak
2. **Visual hierarchy**: H1 > H2 > Body, boyut farklarını belirgin tut
3. **Consistency**: Aynı element, aynı durumda aynı görünmeli
4. **Accessibility first**: Renk körlüğü, klavye navigasyonu, screen reader
5. **Mobile first**: %60+ trafik mobilden gelecek
6. **Loading states**: Her async işlemde loading göster
7. **Error states**: Kullanıcıya net feedback ver
8. **Empty states**: Boş listelerde yönlendir, motivate et

### Development

1. **Component-first**: Her element bağımsız komponent
2. **Reusable**: Copy-paste yerine tekrar kullanılabilir yaz
3. **Type-safe**: TypeScript kullan (runtime hataları engeller)
4. **Test**: Unit tests + E2E tests (Playwright)
5. **Git workflow**: Feature branches + PR reviews
6. **Documentation**: README, JSDoc, Storybook
7. **CI/CD**: Otomatik deploy (Vercel, Netlify)
8. **Monitoring**: Error tracking (Sentry), performance (Lighthouse CI)

### UX

1. **Progressive disclosure**: Tüm bilgiyi aynı anda gösterme
2. **Defaults**: Akıllı default değerler (örn: "Bugün" tarih picker'da)
3. **Undo**: Kritik işlemlerde "Geri al" seçeneği
4. **Confirmation**: Silme, ödeme gibi işlemlerde onay iste
5. **Feedback**: Her kullanıcı aksiyonu görsel feedback
6. **Speed**: 3 saniye içinde ilk görsel, 5 saniye içinde interaktif
7. **Trust**: Sertifikalar, yorum sayısı, sosyal kanıt göster
8. **CTA clarity**: "Gönder" yerine "Rezervasyon Yap" (spesifik)

---

## 🎨 İKON SETİ ÖNERİSİ

**Icon Library:** **Lucide React** (open-source, modern, consistent)

```bash
npm install lucide-react
```

**Kullanılacak İkonlar:**

| Kategori | İkonlar |
|----------|---------|
| **Navigation** | Menu, X, Home, ChevronRight, ChevronLeft, Search |
| **Turlar** | Anchor (tekne), Bike (ATV), Mountain (safari), Wind (paraşüt), Horse, Waves (dalış) |
| **UI Actions** | Heart, Share2, Calendar, Users, Clock, MapPin, Phone, Mail |
| **Status** | Check, CheckCircle, X, XCircle, AlertCircle, Info |
| **Payment** | CreditCard, Lock, ShieldCheck |
| **Social** | Instagram, Facebook, Twitter, Youtube, MessageCircle (WhatsApp) |

**Örnek Kullanım:**
```jsx
import { Anchor, Calendar, Users } from 'lucide-react';

<div className="flex items-center gap-2">
  <Anchor className="w-5 h-5 text-zeo-primary-500" />
  <span>Tekne Turu</span>
</div>
```

---

## 📸 FOTOĞRAF VE GÖRSEL REHBERİ

### Fotoğraf Gereksinimleri

**Kalite:**
- Minimum 1920x1080px (Full HD)
- Yüksek çözünürlük (web için optimize edilmiş WebP)
- Profesyonel (bulanık/düşük kalite yasak)

**İçerik:**
- **Hero images**: Dinamik, aksiyon dolu (örn: parasailing, ATV)
- **Tour cards**: Net, konuyu temsil eden
- **Detail gallery**: 5-10 fotoğraf, farklı açılar
- **Testimonials**: Gerçek müşteri fotoğrafları (izinli)

**Kompozisyon:**
- Rule of thirds (estetik açılar)
- Natural lighting (gün ışığı)
- Human element (insanlar var olmalı, empati için)
- Color grading: Sıcak tonlar (tatil hissi)

**Fotoğraf Kaynakları:**
1. **Kendi çekimleriniz** (en otantik)
2. **Unsplash** (ücretsiz, yüksek kalite)
3. **Pexels** (ücretsiz)
4. **Adobe Stock** (ücretli, profesyonel)

---

## 🎬 ANİMASYON VİDEO KONSEPTLERI

### Video Kullanım Alanları

1. **Hero Background Video** (Opsiyonel)
   - 10-15 saniye loop
   - Muted, autoplay
   - Fallback: Static image
   - Dosya boyutu: <5MB (optimized)

2. **Tour Highlight Reels** (Tur Detay)
   - 30-60 saniye
   - İçerik: Tur'un en iyi anları
   - Hosted: YouTube/Vimeo (embeded)

3. **Testimonial Videos** (Social Proof)
   - 15-30 saniye
   - Müşteri yorumları (video formatı)

**Video Best Practices:**
- Lazy loading (sayfa yüklenince otomatik başlatma)
- Thumbnail: Cazip, play butonu
- Closed captions (erişilebilirlik)

---

## 📋 CHECKLIST: TASARIM TAMAMLANDI MI?

### Sayfa Tasarımları
- [ ] Ana Sayfa (Desktop + Mobile)
- [ ] Tur Listeleme (Desktop + Mobile)
- [ ] Tur Detay (Desktop + Mobile)
- [ ] Rezervasyon Formu (Desktop + Mobile)
- [ ] Ödeme Sayfası
- [ ] Onay Sayfası
- [ ] Hakkımızda
- [ ] İletişim
- [ ] 404 Error Page

### Komponentler
- [ ] Buttons (Primary, Secondary, Outline)
- [ ] Input Fields (Text, Email, Phone, Date, Number)
- [ ] Cards (Tour Card, Info Card)
- [ ] Modal/Dialog
- [ ] Navigation (Desktop, Mobile)
- [ ] Footer
- [ ] Loading States (Spinner, Skeleton)
- [ ] Error States (Inline, Modal)
- [ ] Empty States
- [ ] Badges
- [ ] Alert/Notification
- [ ] Progress Bar

### Animasyonlar
- [ ] Page load animations (Fade-in)
- [ ] Button hover/click
- [ ] Card hover
- [ ] Modal open/close
- [ ] Form validation feedback
- [ ] Loading spinners
- [ ] Success/error animations

### Responsive
- [ ] Mobile breakpoints tested (320px, 375px, 414px)
- [ ] Tablet breakpoints tested (768px, 834px, 1024px)
- [ ] Desktop breakpoints tested (1280px, 1440px, 1920px)
- [ ] Touch targets (min 44x44px)
- [ ] Mobile navigation (hamburger menu)
- [ ] Sticky elements (mobile scroll behavior)

### Accessibility
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Color contrast (WCAG AA)
- [ ] Alt text for images
- [ ] Screen reader testing
- [ ] Form validation (accessible errors)

### Performance
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting
- [ ] Bundle size < 200KB (initial)
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.9s
- [ ] Lighthouse score > 90

### SEO
- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Schema markup (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs

---

## 🔚 SONUÇ

Erdal abi, bu döküman **Zeo Travel** için kapsamlı bir UI/UX tasarım stratejisi sunuyor. Burada dikkat etmem gereken birkaç kritik nokta var:

### 🔴 KRİTİK UYARILAR (Senin Dikkat Etmen Gereken!)

1. **Rakiplerden Farklılaş**: Standart turizm siteleri çok generic. Bizim tasarım **bespoke** olmalı. Her element bilinçli yerleştirilmeli.

2. **Mobile-First**: Türkiye'de %65+ trafik mobilden geliyor. Mobile tasarım öncelikli olmalı, desktop secondary değil!

3. **Güven Unsurları**: Turizm sektöründe güven çok kritik. Social proof (yorumlar, rating), trust badges (güvenli ödeme), profesyonel görseller şart.

4. **Hız**: Yavaş site = kayıp müşteri. İlk 3 saniyede görsel impact olmalı, 5 saniyede interaktif olmalı.

5. **CTA Netliği**: "Gönder" yerine "Rezervasyon Yap", "Devam" yerine "Ödemeye Geç" gibi spesifik CTA'ler kullan. Kullanıcı ne olacağını bilmeli.

6. **Filtreleme**: Tur listeleme sayfasında filtreleme çok önemli. Kullanıcı hızlıca ilgilendiği turu bulmalı, yoksa sıkılır gider.

7. **Fotoğraf Kalitesi**: Düşük kaliteli fotoğraf = düşük kaliteli hizmet algısı. Yüksek çözünürlük, profesyonel görseller şart.

### 🎯 BENİM TAVSİYELERİM

**Önce Prototype Yap:**
- Figma'da high-fidelity mockup oluştur
- Gerçek içerikle doldur (lorem ipsum değil)
- 2-3 potansiyel müşteriyle test et (feedback al)
- Revize et, sonra development'a geç

**Villa Sitesiyle Tutarlılık:**
- Aynı renk paleti (marka kimliği)
- Aynı tipografi
- Aynı komponent stili (button, card)
- Farklı: Layout (turlar için daha dinamik)

**A/B Testing:**
- Hero CTA pozisyonu (sol vs merkez)
- Tur kartı tasarımı (floating card vs standart)
- Rezervasyon formu (modal vs dedicated page)

### ❓ SANA SORULARIM

1. **Villa kiralama sitesi var mı?** Varsa link atar mısın, marka kimliğini görmem lazım.
2. **Backend hazır mı?** API endpoint'leri var mı yoksa full-stack geliştirme mi yapıyoruz?
3. **Bütçe ve süre?** Kaç hafta var ve kaç kişilik ekip?
4. **Ödeme sistemi?** İyzico mu, Stripe mı tercih ediyorsun?
5. **Admin panel?** Tur yönetimi için bir panel gerekiyor mu?

Erdal abi, bu tasarım dokümantasyonu ile **modern, şık ve conversion-odaklı** bir turizm sitesi kurabilirsin. Ama şunu unutma: **Tasarım sadece başlangıç**. Gerçek başarı, kullanıcı testleri ve iterasyonlarla gelir.

Şimdi sırada ne yapalım?
- Figma mockup'ları başlayalım mı?
- Development setup'a geçelim mi?
- Önce villa sitesini inceleyelim mi?

Senin kararın, abi! 🚀

---

**Döküman Versiyonu:** 1.0  
**Son Güncelleme:** 12 Ağustos 2026  
**Hazırlayan:** Çopur (Senior Frontend Architect)
