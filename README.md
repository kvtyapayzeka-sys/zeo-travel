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


# ZEO Travel Claude Redesign Kit

This package is tailored to the existing `kvtyapayzeka-sys/zeo-travel` project.

Copy `CLAUDE.md` into the repository root.
Copy `.claude/skills/zeo-travel-redesign/` into the repository.
Keep your existing `design-critic` skill from the previous kit.
Then give Claude the contents of `PROMPT-01-REDESIGN-EXPLORATION.md`.

Important:
- Do not overwrite the existing homepage in the first pass.
- Explore 3 isolated concepts first.
- Treat `ZEO-TRAVEL-UI-UX-DESIGN.md` as legacy visual guidance.
- Preserve backend/domain logic.
