# Zeo Travel

Antalya turizm acentesi platformu — tur tanıtım ve rezervasyon (MVP).

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind + Shadcn UI
- Prisma + PostgreSQL (Supabase)
- NextAuth (admin/auth)
- Vercel deploy

## Geliştirme

```bash
npm install
npx prisma generate
npm run prisma:seed
npm run dev
```

## Ortam değişkenleri

`.env.example` dosyasını kopyala, Supabase `DATABASE_URL` ve `NEXTAUTH_SECRET` doldur.

## MVP durumu

- Ana sayfa, tur listesi, tur detay (şu an mock data ile)
- API: tours, categories, reservations, admin endpoints
- Havale ile rezervasyon API hazır; rezervasyon UI ve admin paneli sonraki faz
