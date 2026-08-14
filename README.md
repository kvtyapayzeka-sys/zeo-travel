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
npm run prisma:generate
npm run prisma:seed
npm run dev
```

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın.

- `DATABASE_URL`: Uygulama trafiği için Supabase transaction pooler (`6543`)
- `DIRECT_URL`: Prisma migration için Supabase session pooler/direct bağlantı (`5432`)
- `NEXTAUTH_SECRET`: En az 32 karakter
- `SEED_ADMIN_EMAIL` ve `SEED_ADMIN_PASSWORD`: İlk admin hesabı; parola en az 12 karakter

Gerçek environment ve banka bilgilerini repoya eklemeyin.

## Veritabanı

Şemayı doğrulamak ve Prisma Client üretmek için:

```bash
npm run prisma:validate
npm run prisma:generate
```

Boş bir Supabase veritabanına migration uygulamak için:

```bash
npm run prisma:migrate:deploy
npm run prisma:seed
```

Veritabanı tabloları daha önce migration geçmişi olmadan oluşturulduysa, şemanın eşleştiğini doğruladıktan sonra başlangıç migration'ını bir kez baseline edin:

```bash
npx prisma migrate resolve --applied 20260814080000_init
npm run prisma:migrate:status
```

## MVP durumu

- Production public sayfalar Supabase/Prisma verisini kullanıyor; design-lab mock veride kalıyor
- Tur, kategori, availability, rezervasyon ve temel admin API'leri mevcut
- Public havale rezervasyon talebi ve güvenli rezervasyon sorgulama akışı mevcut
- Admin CRUD sıradaki faz
- Email gönderimi provider-bağımsız tutulacak; MailerSend veya Amazon SES daha sonra bağlanacak
