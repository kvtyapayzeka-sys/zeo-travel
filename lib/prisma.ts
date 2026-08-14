import { PrismaClient } from '@prisma/client'
import { getServerEnv } from './env'

// Prisma Client Singleton pattern for Next.js
// Prevents multiple instances in development hot reload

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const env = getServerEnv()

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
