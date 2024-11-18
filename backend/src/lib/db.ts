import { PrismaClient } from '@prisma/client'

import { env } from '@/utils/env.js'

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient
}

export const db = globalForPrisma.prisma || new PrismaClient()

if (!env.isProduction) globalForPrisma.prisma = db
