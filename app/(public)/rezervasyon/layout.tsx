import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rezervasyon',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
