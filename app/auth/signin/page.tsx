import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/auth/signin-form'
import { authOptions, isAdmin } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Admin Girişi',
  robots: { index: false, follow: false },
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  const session = await getServerSession(authOptions)

  if (session && isAdmin(session.user.role)) {
    redirect('/admin')
  }

  const callbackUrl =
    searchParams.callbackUrl?.startsWith('/') &&
    !searchParams.callbackUrl.startsWith('//')
      ? searchParams.callbackUrl
      : '/admin'

  return (
    <main className="flex min-h-screen items-center justify-center bg-zeo-ink px-4 py-12">
      <div className="w-full max-w-md border-2 border-white/15 bg-zeo-sand p-7 shadow-[10px_10px_0_0_#ff5a3d] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-zeo-coral">
          ZEO Travel
        </p>
        <h1 className="font-bricolage mt-2 text-4xl font-extrabold uppercase leading-none text-zeo-ink">
          Operasyon girişi
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zeo-ink/60">
          Bu alan yalnızca yetkili ekip üyeleri içindir.
        </p>
        <SignInForm callbackUrl={callbackUrl} initialError={searchParams.error} />
      </div>
    </main>
  )
}
