import { logger } from '@/lib/logger.js'

export const httpLogger = (message: string, ...rest: string[]) => {
	logger.http(message, ...rest)
}
