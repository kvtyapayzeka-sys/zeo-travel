import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Zeo Travel ile iletişime geçin — telefon, WhatsApp veya e-posta.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
