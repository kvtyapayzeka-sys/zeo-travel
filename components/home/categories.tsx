import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/mock-data'
import { Reveal } from '@/components/kinetic/reveal'
import { ScrollCarousel } from '@/components/kinetic/scroll-carousel'

export function Categories() {
  const categories = getCategories()

  return (
    <section className="bg-zeo-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <h2 className="font-bricolage mb-10 text-4xl font-extrabold uppercase leading-none lg:text-6xl">
            Kategoriler
          </h2>
        </Reveal>
      </div>
      <ScrollCarousel
        trackClassName="gap-4 px-6 lg:px-12"
        arrowClassName="bg-zeo-ink/80 text-white hover:bg-zeo-coral"
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/turlar?kategori=${cat.slug}`}
            className="group relative aspect-[3/4] w-[62vw] shrink-0 snap-start overflow-hidden sm:w-[38vw] lg:w-[22vw]"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 1024px) 60vw, 22vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4">
              <p className="font-bricolage -rotate-2 text-2xl font-extrabold uppercase leading-none text-white">
                {cat.name}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-white/60">
                {cat.tourCount} tur · geliştirme verisi
              </p>
            </div>
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  )
}
