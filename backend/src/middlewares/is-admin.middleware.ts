import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { factory } from '@/utils/factory.js'

export const isAdminMiddleware = factory.createMiddleware(async (c, next) => {
	const { role } = c.get('jwtPayload')

	if (role !== 'ADMIN')
		throw new HTTPException(401, {
			message: 'User not authoirize to route',
			cause: ErrorLibrary.UNAUTHORIZED
		})

	await next()
})
