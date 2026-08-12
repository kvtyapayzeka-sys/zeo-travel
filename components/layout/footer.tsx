import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const navigation = {
    turlar: [
      { name: 'Tekne Turları', href: '/turlar?kategori=tekne-turlari' },
      { name: 'ATV Safari', href: '/turlar?kategori=atv-safari' },
      { name: 'Yamaç Paraşütü', href: '/turlar?kategori=yamac-parasutu' },
      { name: 'Tüm Turlar', href: '/turlar' },
    ],
    kurumsal: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'İletişim', href: '/iletisim' },
    ],
    destek: [
      { name: 'Turlar', href: '/turlar' },
      { name: 'İletişim', href: '/iletisim' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
  ]

  return (
    <footer className="bg-gradient-to-b from-zeo-neutral-50 to-white border-t border-zeo-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <div className="text-h2 font-bold text-zeo-primary-600">
                  Zeo <span className="text-zeo-accent-500">Travel</span>
                </div>
              </Link>
              <p className="text-body text-zeo-neutral-600 mb-6 max-w-sm">
                Antalya&apos;nın en güvenilir turizm acentası. Profesyonel rehberlik, güvenli turlar ve unutulmaz deneyimler.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="tel:+905551234567"
                  className="flex items-center gap-3 text-body text-zeo-neutral-700 hover:text-zeo-primary-600 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zeo-primary-50">
                    <Phone className="h-5 w-5 text-zeo-primary-600" />
                  </div>
                  <span className="font-semibold">+90 555 123 4567</span>
                </a>
                <a
                  href="mailto:info@zeotravel.com"
                  className="flex items-center gap-3 text-body text-zeo-neutral-700 hover:text-zeo-primary-600 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zeo-primary-50">
                    <Mail className="h-5 w-5 text-zeo-primary-600" />
                  </div>
                  <span>info@zeotravel.com</span>
                </a>
                <div className="flex items-start gap-3 text-body text-zeo-neutral-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zeo-primary-50">
                    <MapPin className="h-5 w-5 text-zeo-primary-600" />
                  </div>
                  <span>Lara, Antalya, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Turlar */}
            <div>
              <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">Popüler Turlar</h3>
              <ul className="space-y-3">
                {navigation.turlar.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-body text-zeo-neutral-600 hover:text-zeo-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kurumsal */}
            <div>
              <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">Kurumsal</h3>
              <ul className="space-y-3">
                {navigation.kurumsal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-body text-zeo-neutral-600 hover:text-zeo-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destek */}
            <div>
              <h3 className="text-h4 font-semibold text-zeo-neutral-900 mb-4">Destek</h3>
              <ul className="space-y-3">
                {navigation.destek.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-body text-zeo-neutral-600 hover:text-zeo-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zeo-neutral-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-body-sm text-zeo-neutral-600">
              © 2026 Zeo Travel. Tüm hakları saklıdır.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-zeo-neutral-100 text-zeo-neutral-600 transition-colors hover:bg-zeo-primary-500 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
