import { Hero } from '@/components/home/hero'
import { FeaturedTours } from '@/components/home/featured-tours'
import { Categories } from '@/components/home/categories'

export const metadata = {
  title: 'Zeo Travel - Antalya Turları ve Aktiviteleri',
  description: 'Antalya\'nın en güvenilir turizm acentası. Tekne turları, yamaç paraşütü, ATV safari ve daha fazlası. Profesyonel rehberlik ve güvenli turlar.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTours />
      <Categories />
      
      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-zeo-primary-600 to-zeo-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-h1 font-bold text-white mb-4">
            Hemen Rezervasyon Yapın
          </h2>
          <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Turları inceleyin, size uygun tarihi seçin. Havale ile güvenli rezervasyon
            için ekibimiz aynı gün dönüş yapar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/turlar"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-zeo-primary-600 font-semibold hover:bg-white/90 transition-colors"
            >
              Turları Görüntüle
            </a>
            <a
              href="https://wa.me/905551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp ile İletişim
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
