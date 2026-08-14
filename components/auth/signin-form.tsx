'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function SignInForm({
  callbackUrl,
  initialError,
}: {
  callbackUrl: string
  initialError?: string
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(
    initialError === 'unauthorized' ? 'Bu alan için admin yetkisi gerekiyor.' : null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl,
      })

      if (!result?.ok) {
        setError('E-posta veya parola hatalı.')
        return
      }

      router.push(result.url ?? callbackUrl)
      router.refresh()
    } catch {
      setError('Giriş sırasında bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-zeo-ink">
          E-posta
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border-2 border-zeo-ink/20 px-4 py-3 text-sm outline-none transition-colors focus:border-zeo-coral"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-zeo-ink">
          Parola
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border-2 border-zeo-ink/20 px-4 py-3 text-sm outline-none transition-colors focus:border-zeo-coral"
        />
      </label>

      {error && (
        <p role="alert" className="border border-zeo-error bg-red-50 p-3 text-sm text-zeo-error">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Giriş yapılıyor…' : 'Admin paneline gir'}
      </Button>
    </form>
  )
}
