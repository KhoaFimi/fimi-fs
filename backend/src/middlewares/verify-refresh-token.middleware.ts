import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { usersService } from '@/modules/users/services/index.js'
import { factory } from '@/utils/factory.js'

export const verifyTokenVersionMiddleware = factory.createMiddleware(
	async (c, next) => {
		const payload = c.get('jwtPayload')

		const existingUser = await usersService.findByUnique({
			where: { id: payload.sub }
		})

		if (payload.version !== existingUser.version)
			throw new HTTPException(401, {
				message: 'Invlid token',
				cause: ErrorLibrary.UNAUTHORIZED
			})

		await next()
	}
)
