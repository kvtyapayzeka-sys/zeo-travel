import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Users, MapPin, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Zeo Travel — Antalya merkezli turizm acentesi. Tekne turu, ATV, yamaç paraşütü ve daha fazlası.',
}

const values = [
  {
    icon: Shield,
    title: 'Güvenlik önce',
    text: 'Lisanslı rehberler, sigortalı aktiviteler ve net bilgilendirme.',
  },
  {
    icon: Users,
    title: 'Misafir odaklı',
    text: 'Küçük gruplar, net iletişim ve rezervasyondan tura kadar yanınızdayız.',
  },
  {
    icon: Compass,
    title: 'Yerel uzmanlık',
    text: 'Antalya ve çevresini bilen ekip — doğru rota, doğru zaman.',
  },
  {
    icon: MapPin,
    title: 'Kolay erişim',
    text: 'Villa misafirlerinden bireysel gezgine — tek yerden tur planı.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-zeo-neutral-100 bg-gradient-to-br from-zeo-neutral-50 via-white to-zeo-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <p className="text-caption uppercase tracking-[0.2em] text-zeo-primary-600 font-semibold mb-4">
            Zeo Travel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-zeo-neutral-900 max-w-3xl leading-tight mb-6">
            Antalya&apos;da turizmi sade ve güvenilir kılıyoruz
          </h1>
          <p className="text-body-lg text-zeo-neutral-600 max-w-2xl">
            Zeo Travel, tekne turlarından yamaç paraşütüne kadar Antalya&apos;nın
            en çok tercih edilen aktivitelerini tek çatı altında sunar. Amacımız
            gösteriş değil: net bilgi, doğru fiyat ve sorunsuz deneyim.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-h1 font-bold text-zeo-neutral-900 mb-4">Hikâyemiz</h2>
              <div className="space-y-4 text-body text-zeo-neutral-600">
                <p>
                  Yerel operasyon bilgisi ile dijital rezervasyonu birleştirdik.
                  Villa kiralama misafirlerimiz ve bireysel gezginler aynı
                  kalitede tur deneyimine ulaşsın diye Zeo Travel&apos;ı kurduk.
                </p>
                <p>
                  Şimdilik ödemeler havale/EFT ile alınır; her rezervasyon ekibimiz
                  tarafından onaylanır. İleride sanal POS ile anında ödeme de
                  eklenecek.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-zeo-neutral-200 bg-zeo-neutral-50 p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white mb-4 shadow-sm">
                    <item.icon className="h-5 w-5 text-zeo-primary-600" />
                  </div>
                  <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-zeo-neutral-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-zeo-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-h2 font-bold text-white mb-2">Turları keşfetmeye hazır mısınız?</h2>
            <p className="text-body text-white/85">
              Güncel program ve müsaitlik için tur listesine göz atın.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-white text-zeo-primary-600 hover:bg-white/90 shadow-none"
              asChild
            >
              <Link href="/turlar">Turları Gör</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/iletisim">İletişim</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
