import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getCategories, getHighlightedTours, getTours } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Reveal } from '@/components/kinetic/reveal'

const display = 'font-[family-name:var(--font-archivo)]'
const body = 'font-[family-name:var(--font-plex-sans)]'
const INK = '#12332f'

const districts = [
  { name: 'Kemer', count: 18 },
  { name: 'Alanya', count: 22 },
  { name: 'Side', count: 14 },
  { name: 'Belek', count: 9 },
  { name: 'Kaş', count: 7 },
]

export default function ConceptB() {
  const tours = getTours()
  const featured = getHighlightedTours()
  const categories = getCategories()

  return (
    <div className={`${body} bg-[#f7f5f0]`} style={{ color: INK }}>
      {/* Header */}
      <header className="sticky top-9 z-40 border-b border-black/10 bg-[#f7f5f0]">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Link href="/design-lab/b" className={`${display} text-lg font-bold uppercase tracking-[0.04em]`}>
            Zeo Travel
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.1em] md:flex">
            <Link href="/" className="border-b border-transparent pb-1 hover:border-current">Ana Sayfa</Link>
            <Link href="/turlar" className="border-b border-transparent pb-1 hover:border-current">Turlar</Link>
            <Link href="/hakkimizda" className="border-b border-transparent pb-1 hover:border-current">Hakkımızda</Link>
            <Link href="/iletisim" className="border-b border-transparent pb-1 hover:border-current">İletişim</Link>
          </nav>
          <Link
            href="/turlar"
            className="hidden border border-current px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[#12332f] hover:text-[#f7f5f0] md:inline-block"
          >
            Rezervasyon
          </Link>
        </div>
      </header>

      {/* Hero — grid module */}
      <section className="mx-auto max-w-[1440px] border-b border-black/10 px-6 pb-0 pt-10 lg:px-12 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#a8532f]">01 / Antalya, Türkiye</p>
            <Reveal>
              <h1 className={`${display} text-[13vw] font-bold leading-[0.95] sm:text-6xl lg:text-[4.2rem]`}>
                Kıyı boyunca
                <br />
                planlı macera.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#12332f]/70">
                Tekne turu, ATV safari, yamaç paraşütü ve dalış — netlikle
                planlanmış, sahada kanıtlanmış rehberli aktiviteler.
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-black/15 pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-[#12332f]/50">Aktivite türü</dt>
                <dd className={`${display} mt-1 text-2xl font-bold`}>{categories.length}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-[#12332f]/50">Süre aralığı</dt>
                <dd className={`${display} mt-1 text-2xl font-bold`}>2–8 sa</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-[#12332f]/50">Sahil durağı</dt>
                <dd className={`${display} mt-1 text-2xl font-bold`}>{districts.length}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=1000&fit=crop&q=80"
                alt="Antalya sahil şeridi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-black/15 py-5 lg:mt-14">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#12332f]/50">Aktivite</span>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/turlar?kategori=${c.slug}`}
              className="border border-black/20 px-3.5 py-1.5 text-[12px] uppercase tracking-[0.04em] transition-colors hover:border-[#12332f] hover:bg-[#12332f] hover:text-[#f7f5f0]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured — modular mosaic */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <div className="mb-12 flex items-end justify-between border-b border-black/15 pb-4">
            <h2 className={`${display} text-3xl font-bold lg:text-4xl`}>02 / Seçili turlar</h2>
            <Link href="/turlar" className="hidden items-center gap-1 text-[13px] uppercase tracking-[0.08em] md:flex">
              Tümü <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tour, i) => {
            const big = i < 2
            return (
              <Reveal
                key={tour.id}
                delay={i * 0.06}
                className={`bg-[#f7f5f0] ${big ? 'lg:col-span-2' : 'lg:col-span-2'}`}
              >
                <Link href={`/turlar/${tour.slug}`} className="group block h-full">
                  <div className={`relative w-full overflow-hidden ${big ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                    <Image
                      src={tour.images[0]}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="border-t border-black/15 p-4">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-[#12332f]/50">{tour.category.name}</p>
                    <h3 className="mt-1 text-[15px] font-semibold leading-snug">{tour.title}</h3>
                    <div className="mt-3 flex items-center justify-between text-[13px]">
                      <span className="text-[#12332f]/60">{Math.round(tour.duration / 60)} sa · maks {tour.maxCapacity}</span>
                      <span className={`${display} font-bold text-[#a8532f]`}>{formatPrice(tour.priceAdult)}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Categories mosaic */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <Reveal>
            <h2 className={`${display} mb-12 border-b border-black/15 pb-4 text-3xl font-bold lg:text-4xl`}>
              03 / Deneyim türleri
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-4">
            {categories.map((cat, i) => (
              <Reveal
                key={cat.id}
                delay={i * 0.04}
                className={i % 5 === 0 ? 'col-span-2 lg:col-span-2' : 'col-span-1'}
              >
                <Link href={`/turlar?kategori=${cat.slug}`} className="group relative block w-full overflow-hidden border border-black/15">
                  <div className={`relative w-full ${i % 5 === 0 ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-white">{cat.name}</span>
                      <span className="text-[11px] text-white/70">{cat.tourCount}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination table */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 className={`${display} mb-6 border-b border-black/15 pb-4 text-3xl font-bold lg:text-4xl`}>
              04 / Sahil durakları
            </h2>
            <table className="w-full text-[14px]">
              <tbody>
                {districts.map((d) => (
                  <tr key={d.name} className="border-b border-black/10">
                    <td className="py-3 font-semibold">{d.name}</td>
                    <td className="py-3 text-right text-[#12332f]/50">{d.count} tur (geliştirme verisi)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1400&h=800&fit=crop&q=80"
                alt="Toros Dağları manzarası"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust — spec sheet */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
          <h2 className={`${display} mb-8 text-2xl font-bold`}>05 / Rezervasyon koşulları</h2>
          <div className="grid gap-x-12 gap-y-4 border-t border-black/15 pt-6 sm:grid-cols-2">
            {[
              ['Ödeme', 'Banka havalesi / EFT ile, dekont sonrası onay.'],
              ['Onay süresi', 'Aynı gün içinde e-posta ile dönüş.'],
              ['İptal', 'Tur sayfasında belirtilen koşullara tabidir.'],
              ['Transfer', 'Otelden alım, tur detayında belirtilir.'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-black/10 py-3 text-[14px]">
                <span className="shrink-0 font-semibold">{k}</span>
                <span className="text-right text-[#12332f]/60">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <Reveal>
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#a8532f]">06 / Rezervasyon</p>
            <h2 className={`${display} max-w-2xl text-4xl font-bold leading-[1.05] lg:text-6xl`}>
              Tarihi seç, planı netleştir.
            </h2>
            <Link
              href="/turlar"
              className="mt-8 inline-flex items-center gap-2 border border-current px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[#12332f] hover:text-[#f7f5f0]"
            >
              Turları görüntüle <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 text-[13px] text-[#12332f]/60 md:flex-row md:items-center">
          <span className={`${display} text-base font-bold`} style={{ color: INK }}>Zeo Travel</span>
          <span>Lara, Antalya · Concept B — Riviera Modernist</span>
        </div>
      </footer>
    </div>
  )
}
