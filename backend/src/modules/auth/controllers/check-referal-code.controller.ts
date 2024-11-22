import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { usersService } from '@/modules/users/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

export const checkReferalCode = factory.createHandlers(
	zValidator(
		'query',
		z.object({
			code: z.string().min(1, { message: 'Missing code' })
		}),
		res => {
			if (!res.success)
				throw new HTTPException(400, {
					message: parseZodError(res.error.message)
				})
		}
	),
	async c => {
		const { code } = c.req.valid('query')

		const res = await usersService.findByUnique({ where: { code } })

		return c.json<IResponse>({
			statusCode: 200,
			code: StatusLibrary.OK,
			message: 'Get referal user successfully',
			success: true,
			data: {
				code: res.code
			}
		})
	}
)
