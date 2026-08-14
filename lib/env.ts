import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  ADMIN_EMAIL: z.string().email().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

let cachedServerEnv: ServerEnv | undefined

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv
  }

  const result = serverEnvSchema.safeParse(process.env)

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ')

    throw new Error(`Invalid server environment: ${details}`)
  }

  cachedServerEnv = result.data
  return cachedServerEnv
}
