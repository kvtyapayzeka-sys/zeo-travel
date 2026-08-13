import Link from 'next/link'
import Image from 'next/image'

const concepts = [
  {
    href: '/design-lab/a',
    letter: 'A',
    name: 'Mediterranean Adventure Editorial',
    desc: 'Fotoğraf öncelikli, seyahat dergisi disiplini. Sıcak mineral nötrler, derin Akdeniz mavisi, tek terracotta vurgu. Asimetrik editoryal düzen.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=900&fit=crop&q=80',
  },
  {
    href: '/design-lab/b',
    letter: 'B',
    name: 'Riviera Modernist',
    desc: 'Mimari, kesin ızgara, ince çizgiler. Taş/beyaz yüzeyler, derin deniz-yeşili, ölçülü vurgu. Sakin ama jenerik değil.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop&q=80',
  },
  {
    href: '/design-lab/c',
    letter: 'C',
    name: 'Kinetic Expedition',
    desc: 'Yüksek enerji, cesur kırpma, güçlü tipografik kontrast. Karanlık zemin + canlı vurgu. Kontrollü hareket.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop&q=80',
  },
]

export default function DesignLabIndex() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
          Zeo Travel — Redesign Exploration
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">
          Üç farklı sanat yönetimi. Aynı tur verisi.
        </h1>
        <p className="mb-14 max-w-xl text-white/60">
          Hiçbiri prod anasayfasına dokunmuyor. Karşılaştırıp birini seçin.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {concepts.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-white/30"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-sm font-bold backdrop-blur">
                  {c.letter}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-sm leading-relaxed text-white/60">{c.desc}</p>
                <span className="mt-auto pt-4 text-sm font-medium text-white/80 group-hover:text-white">
                  İncele →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
