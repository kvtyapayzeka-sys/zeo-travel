import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zeo Travel - Antalya Turları',
    short_name: 'Zeo Travel',
    description: 'Antalya\'nın en güvenilir turizm acentası. Tekne turları, yamaç paraşütü, ATV safari ve daha fazlası.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d86d9',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
