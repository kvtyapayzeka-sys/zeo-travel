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
    <div className="bg-white">
      <section className="border-b border-zeo-neutral-100 bg-gradient-to-br from-zeo-neutral-50 via-white to-zeo-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
          <p className="text-caption uppercase tracking-[0.2em] text-zeo-primary-600 font-semibold mb-4">
            İletişim
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-zeo-neutral-900 mb-4">
            Size nasıl yardımcı olabiliriz?
          </h1>
          <p className="text-body-lg text-zeo-neutral-600 max-w-2xl">
            Tur soruları, grup rezervasyonu veya villa misafiri talepleri için
            yazın — aynı gün dönüş yapıyoruz.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <a
                href="tel:+905551234567"
                className="flex items-start gap-4 rounded-2xl border border-zeo-neutral-200 p-5 hover:border-zeo-primary-300 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zeo-primary-50 shrink-0">
                  <Phone className="h-5 w-5 text-zeo-primary-600" />
                </div>
                <div>
                  <p className="text-caption text-zeo-neutral-500 mb-1">Telefon</p>
                  <p className="text-body font-semibold text-zeo-neutral-900">+90 555 123 4567</p>
                </div>
              </a>

              <a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-zeo-neutral-200 p-5 hover:border-zeo-primary-300 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zeo-success/10 shrink-0">
                  <MessageCircle className="h-5 w-5 text-zeo-success" />
                </div>
                <div>
                  <p className="text-caption text-zeo-neutral-500 mb-1">WhatsApp</p>
                  <p className="text-body font-semibold text-zeo-neutral-900">Hızlı mesaj</p>
                </div>
              </a>

              <a
                href="mailto:info@zeotravel.com"
                className="flex items-start gap-4 rounded-2xl border border-zeo-neutral-200 p-5 hover:border-zeo-primary-300 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zeo-primary-50 shrink-0">
                  <Mail className="h-5 w-5 text-zeo-primary-600" />
                </div>
                <div>
                  <p className="text-caption text-zeo-neutral-500 mb-1">E-posta</p>
                  <p className="text-body font-semibold text-zeo-neutral-900">info@zeotravel.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-zeo-neutral-200 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zeo-primary-50 shrink-0">
                  <MapPin className="h-5 w-5 text-zeo-primary-600" />
                </div>
                <div>
                  <p className="text-caption text-zeo-neutral-500 mb-1">Konum</p>
                  <p className="text-body font-semibold text-zeo-neutral-900">Lara, Antalya</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-zeo-neutral-200 bg-zeo-neutral-50 p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-body-sm font-medium text-zeo-neutral-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full h-11 rounded-xl border border-zeo-neutral-300 bg-white px-4 text-body outline-none focus:border-zeo-primary-500 focus:ring-2 focus:ring-zeo-primary-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-body-sm font-medium text-zeo-neutral-700 mb-2">
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full h-11 rounded-xl border border-zeo-neutral-300 bg-white px-4 text-body outline-none focus:border-zeo-primary-500 focus:ring-2 focus:ring-zeo-primary-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-body-sm font-medium text-zeo-neutral-700 mb-2">
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full h-11 rounded-xl border border-zeo-neutral-300 bg-white px-4 text-body outline-none focus:border-zeo-primary-500 focus:ring-2 focus:ring-zeo-primary-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-body-sm font-medium text-zeo-neutral-700 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-xl border border-zeo-neutral-300 bg-white px-4 py-3 text-body outline-none focus:border-zeo-primary-500 focus:ring-2 focus:ring-zeo-primary-500/20 resize-y"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Mesaj Gönder
                </Button>
                {sent && (
                  <p className="text-body-sm text-zeo-success">
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
