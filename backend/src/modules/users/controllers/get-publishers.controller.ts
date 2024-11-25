import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { isAdminMiddleware } from '@/middlewares/is-admin.middleware.js'
import { parseUser } from '@/modules/users/helper.js'
import { usersService } from '@/modules/users/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

const searchParams = z.object({
	page: z.number().catch(1),
	limit: z.number().catch(10)
})

export const getPublishers = factory.createHandlers(
	isAdminMiddleware,
	zValidator('query', searchParams, res => {
		if (!res.success)
			throw new HTTPException(400, {
				message: parseZodError(res.error.message),
				cause: ErrorLibrary.BAD_REQUEST
			})
	}),
	async c => {
		const { page, limit } = c.req.valid('query')

		const { users, total } = await usersService.findManyByCondition({
			page,
			limit
		})

		return c.json<IResponse>({
			statusCode: 200,
			code: StatusLibrary.OK,
			success: true,
			message: 'Get publisher successfully',
			data: {
				publishers: users.map(user => parseUser(user)),
				total
			}
		})
	}
)
