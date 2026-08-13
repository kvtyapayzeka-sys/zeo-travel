import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getCategories, getHighlightedTours, getTours } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Reveal } from '@/components/kinetic/reveal'

const serif = 'font-[family-name:var(--font-fraunces)]'
const body = 'font-[family-name:var(--font-public-sans)]'

const destinations = [
  { name: 'Kemer', coord: 'Batı sahil şeridi', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&h=1100&fit=crop&q=80' },
  { name: 'Alanya', coord: 'Doğu sahil şeridi', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=700&fit=crop&q=80' },
  { name: 'Side', coord: 'Antik liman kasabası', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&h=1100&fit=crop&q=80' },
  { name: 'Belek', coord: 'Çamlık kıyı bandı', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&h=700&fit=crop&q=80' },
]

export default function ConceptA() {
  const tours = getTours()
  const featured = getHighlightedTours()
  const [spotlight, ...rest] = featured
  const stackTours = rest.slice(0, 2)
  const strip = tours.slice(0, 6)
  const categories = getCategories()

  return (
    <div className={`${body} bg-[#f4ecdd] text-[#12303f]`}>
      {/* Header */}
      <header className="sticky top-9 z-40 border-b border-[#f4ecdd]/15 bg-[#12303f]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link href="/design-lab/a" className={`${serif} text-xl tracking-tight text-[#f4ecdd]`}>
            Zeo <span className="text-[#d97a3f]">Travel</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.14em] text-[#f4ecdd]/70 md:flex">
            <Link href="/" className="transition-colors hover:text-[#f4ecdd]">Ana Sayfa</Link>
            <Link href="/turlar" className="transition-colors hover:text-[#f4ecdd]">Turlar</Link>
            <Link href="/hakkimizda" className="transition-colors hover:text-[#f4ecdd]">Hakkımızda</Link>
            <Link href="/iletisim" className="transition-colors hover:text-[#f4ecdd]">İletişim</Link>
          </nav>
          <Link
            href="/turlar"
            className="hidden rounded-sm border border-[#f4ecdd]/40 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#f4ecdd] transition-colors hover:border-[#f4ecdd] md:inline-block"
          >
            Rezervasyon
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden bg-[#12303f]">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&h=1200&fit=crop&q=80"
          alt="Kemer koyunda tekne turu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c232e] via-[#0c232e]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c232e]/50 via-transparent to-transparent" />

        {/* Kicker */}
        <div className="absolute left-6 top-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f4ecdd]/80 lg:left-12 lg:top-12">
          Antalya · Türkiye
        </div>

        {/* Vertical destination rail */}
        <div className="absolute right-6 top-8 hidden flex-col items-end gap-3 lg:right-12 lg:top-12 lg:flex">
          {destinations.map((d, i) => (
            <span key={d.name} className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#f4ecdd]/60">
              <span className="text-[#d97a3f]">0{i + 1}</span>
              {d.name}
            </span>
          ))}
        </div>

        {/* Headline */}
        <div className="absolute bottom-24 left-6 right-6 lg:bottom-28 lg:left-12 lg:right-auto lg:max-w-3xl">
          <Reveal>
            <h1 className={`${serif} text-[13vw] leading-[0.95] text-[#f4ecdd] sm:text-6xl lg:text-[5.5rem]`}>
              Akdeniz&apos;i
              <br />
              <span className="text-[#d97a3f]">tenle</span> hisset.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#f4ecdd]/75">
              Tekne turu, yamaç paraşütü, ATV safari ve dalış — Antalya&apos;nın en iyi
              rehberli aktiviteleriyle keşif dolu bir gün.
            </p>
          </Reveal>
        </div>

        {/* Discovery dock */}
        <div className="absolute inset-x-0 bottom-0 border-t border-[#f4ecdd]/15 bg-[#0c232e]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 lg:px-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#f4ecdd]/50">Keşfet</span>
            {categories.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                href={`/turlar?kategori=${c.slug}`}
                className="text-[13px] text-[#f4ecdd]/75 transition-colors hover:text-[#f4ecdd]"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/turlar"
              className="ml-auto flex items-center gap-1 text-[13px] font-semibold text-[#d97a3f] hover:text-[#e88a4f]"
            >
              Tüm turlar <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured spotlight — asymmetric */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d97a3f]">Öne Çıkan</p>
          <h2 className={`${serif} mb-12 text-4xl leading-tight lg:text-5xl`}>Bu haftanın seçkisi</h2>
        </Reveal>

        {spotlight && (
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <Reveal className="lg:col-span-3">
              <Link href={`/turlar/${spotlight.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={spotlight.images[0]}
                    alt={spotlight.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-t border-[#12303f]/15 pt-5">
                  <div>
                    <h3 className={`${serif} text-2xl leading-snug lg:text-3xl`}>{spotlight.title}</h3>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[#12303f]/50">
                      {spotlight.category.name} · {Math.round(spotlight.duration / 60)} saat
                    </p>
                  </div>
                  <p className={`${serif} shrink-0 text-2xl text-[#d97a3f]`}>{formatPrice(spotlight.priceAdult)}</p>
                </div>
              </Link>
            </Reveal>

            <div className="flex flex-col gap-8 lg:col-span-2">
              {stackTours.map((tour, i) => (
                <Reveal key={tour.id} delay={0.1 * (i + 1)}>
                  <Link href={`/turlar/${tour.slug}`} className="group flex gap-4">
                    <div className="relative aspect-square w-28 shrink-0 overflow-hidden">
                      <Image
                        src={tour.images[0]}
                        alt={tour.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center border-t border-[#12303f]/15 pt-0">
                      <h4 className="text-[15px] font-semibold leading-snug">{tour.title}</h4>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-[#12303f]/50">
                        {Math.round(tour.duration / 60)} saat · {tour.category.name}
                      </p>
                      <p className={`${serif} mt-2 text-lg text-[#d97a3f]`}>{formatPrice(tour.priceAdult)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Secondary strip */}
        <div className="mt-16 flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {strip.map((tour) => (
            <Link key={tour.id} href={`/turlar/${tour.slug}`} className="group w-40 shrink-0 lg:w-auto">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={tour.images[0]}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 1024px) 160px, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 line-clamp-2 text-[13px] font-medium leading-snug">{tour.title}</p>
              <p className="mt-1 text-[12px] text-[#12303f]/50">{formatPrice(tour.priceAdult)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Category index */}
      <section className="border-y border-[#12303f]/10 bg-[#eee2c9]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
          <Reveal>
            <h2 className={`${serif} mb-12 text-4xl leading-tight lg:text-5xl`}>Deneyim türleri</h2>
          </Reveal>
          <div className="divide-y divide-[#12303f]/15 border-t border-[#12303f]/15">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.04}>
                <Link
                  href={`/turlar?kategori=${cat.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 lg:grid-cols-[4rem_1fr_10rem_auto] lg:gap-8 lg:py-6"
                >
                  <span className={`${serif} text-lg text-[#12303f]/35`}>0{i + 1}</span>
                  <span className={`${serif} text-2xl transition-colors group-hover:text-[#d97a3f] lg:text-3xl`}>
                    {cat.name}
                  </span>
                  <span className="relative hidden h-14 w-20 overflow-hidden lg:block">
                    <Image src={cat.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="flex items-center gap-3 justify-self-end text-[13px] text-[#12303f]/50">
                    {cat.tourCount} tur (geliştirme verisi)
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination strip */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d97a3f]">Nerede</p>
          <h2 className={`${serif} mb-12 text-4xl leading-tight lg:text-5xl`}>Sahil boyunca dört durak</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {destinations.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06} className={i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-10'}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src={d.image} alt={d.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className={`${serif} text-xl text-white`}>{d.name}</p>
                  <p className="text-[12px] text-white/70">{d.coord}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust / support */}
      <section className="border-t border-[#12303f]/10 bg-[#eee2c9]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-20">
          {[
            { t: 'Yerel ekip desteği', d: 'Antalya\'da yaşayan ekip, rezervasyon öncesi ve sonrasında iletişimde.' },
            { t: 'Havale / EFT ile ödeme', d: 'Rezervasyon sonrası dekont onayı ile tur garanti altına alınır.' },
            { t: 'Net dahil / hariç listesi', d: 'Her tur sayfasında ne dahil, ne hariç açıkça belirtilir.' },
          ].map((item) => (
            <Reveal key={item.t}>
              <div className="border-t border-[#12303f]/20 pt-5">
                <h3 className="text-[15px] font-semibold">{item.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#12303f]/60">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative h-[64vh] min-h-[440px] w-full overflow-hidden bg-[#0c232e]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=1000&fit=crop&q=80"
          alt="Yükseklerden Akdeniz manzarası"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c232e] via-[#0c232e]/30 to-transparent" />
        <div className="absolute inset-x-6 bottom-14 lg:inset-x-12 lg:bottom-16">
          <Reveal>
            <h2 className={`${serif} max-w-xl text-4xl leading-tight text-[#f4ecdd] lg:text-6xl`}>
              Tarihini seç, <span className="text-[#d97a3f]">yola çık.</span>
            </h2>
            <Link
              href="/turlar"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#d97a3f] px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#0c232e] transition-colors hover:bg-[#e88a4f]"
            >
              Turları görüntüle <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#12303f] px-6 py-12 text-[#f4ecdd]/60 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 border-t border-[#f4ecdd]/10 pt-8 md:flex-row md:items-center">
          <p className={`${serif} text-lg text-[#f4ecdd]`}>Zeo Travel</p>
          <p className="text-[13px]">Lara, Antalya · Concept A — Mediterranean Adventure Editorial</p>
        </div>
      </footer>
    </div>
  )
}
