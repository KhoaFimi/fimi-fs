import Redis from 'ioredis'

import { env } from '@/utils/env.js'

export const redisConnection = new Redis.default({
	host: env.REDIS_HOST,
	port: env.REDIS_PORT,
	maxRetriesPerRequest: null
})
