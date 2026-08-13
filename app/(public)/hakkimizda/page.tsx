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
    <div className="bg-zeo-sand">
      <section className="border-b-2 border-zeo-ink bg-zeo-ink text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-zeo-coral">
            Zeo Travel
          </p>
          <h1 className="font-bricolage max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
            Antalya&apos;da turizmi sade ve güvenilir kılıyoruz
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70">
            Zeo Travel, tekne turlarından yamaç paraşütüne kadar Antalya&apos;nın
            en çok tercih edilen aktivitelerini tek çatı altında sunar. Amacımız
            gösteriş değil: net bilgi, doğru fiyat ve sorunsuz deneyim.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-bricolage mb-4 text-3xl font-extrabold uppercase text-zeo-ink">Hikâyemiz</h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-zeo-ink/70">
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
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="border-2 border-zeo-ink bg-white p-5"
                >
                  <item.icon className="mb-4 h-6 w-6 text-zeo-coral" />
                  <h3 className="mb-2 text-[15px] font-bold text-zeo-ink">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-zeo-ink/60">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-zeo-ink bg-zeo-ink py-14 text-white">
        <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <h2 className="font-bricolage text-2xl font-extrabold uppercase">Turları keşfetmeye hazır mısınız?</h2>
            <p className="mt-2 text-[14px] text-white/70">
              Güncel program ve müsaitlik için tur listesine göz atın.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/turlar">Turları Gör</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:border-zeo-coral hover:text-zeo-coral"
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
