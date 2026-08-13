'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const phone = String(data.get('phone') || '')
    const message = String(data.get('message') || '')

    const subject = encodeURIComponent(`Zeo Travel iletişim — ${name}`)
    const body = encodeURIComponent(
      `Ad Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\n\nMesaj:\n${message}`
    )
    window.location.href = `mailto:info@zeotravel.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="bg-zeo-sand">
      <section className="border-b-2 border-zeo-ink bg-zeo-ink text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-zeo-coral">
            İletişim
          </p>
          <h1 className="font-bricolage text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
            Size nasıl yardımcı olabiliriz?
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70">
            Tur soruları, grup rezervasyonu veya villa misafiri talepleri için
            yazın — aynı gün dönüş yapıyoruz.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="space-y-4 lg:col-span-2">
              <a
                href="tel:+905551234567"
                className="flex items-start gap-4 border-2 border-zeo-ink bg-white p-5 transition-colors hover:border-zeo-coral"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-zeo-ink">
                  <Phone className="h-4 w-4 text-zeo-ink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">Telefon</p>
                  <p className="text-[15px] font-semibold text-zeo-ink">+90 555 123 4567</p>
                </div>
              </a>

              <a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 border-2 border-zeo-ink bg-white p-5 transition-colors hover:border-zeo-coral"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-zeo-ink">
                  <MessageCircle className="h-4 w-4 text-zeo-ink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">WhatsApp</p>
                  <p className="text-[15px] font-semibold text-zeo-ink">Hızlı mesaj</p>
                </div>
              </a>

              <a
                href="mailto:info@zeotravel.com"
                className="flex items-start gap-4 border-2 border-zeo-ink bg-white p-5 transition-colors hover:border-zeo-coral"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-zeo-ink">
                  <Mail className="h-4 w-4 text-zeo-ink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">E-posta</p>
                  <p className="text-[15px] font-semibold text-zeo-ink">info@zeotravel.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 border-2 border-zeo-ink bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-zeo-ink">
                  <MapPin className="h-4 w-4 text-zeo-ink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] text-zeo-ink/50">Konum</p>
                  <p className="text-[15px] font-semibold text-zeo-ink">Lara, Antalya</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 border-2 border-zeo-ink bg-white p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                      Ad Soyad
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="h-11 w-full border-2 border-zeo-ink/20 bg-white px-4 text-[14px] text-zeo-ink outline-none focus:border-zeo-coral"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="h-11 w-full border-2 border-zeo-ink/20 bg-white px-4 text-[14px] text-zeo-ink outline-none focus:border-zeo-coral"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-11 w-full border-2 border-zeo-ink/20 bg-white px-4 text-[14px] text-zeo-ink outline-none focus:border-zeo-coral"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.06em] text-zeo-ink">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y border-2 border-zeo-ink/20 bg-white px-4 py-3 text-[14px] text-zeo-ink outline-none focus:border-zeo-coral"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Mesaj Gönder
                </Button>
                {sent && (
                  <p className="text-[13px] text-zeo-success">
                    E-posta uygulamanız açıldı. Gönderimi tamamlayın.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
