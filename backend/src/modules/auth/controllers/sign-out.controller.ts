import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

export const signOut = factory.createHandlers(
	zValidator(
		'query',
		z.object({ id: z.string().min(1, { message: 'Id is required' }) }),
		res => {
			if (!res.success)
				throw new HTTPException(400, {
					message: parseZodError(res.error.message),
					cause: ErrorLibrary.BAD_REQUEST
				})
		}
	),
	async c => {
		const { id } = c.req.valid('query')

		const res = await authService.signOut(id, c)

		return c.json<IResponse>({
			statusCode: 200,
			success: true,
			code: StatusLibrary.OK,
			message: res.message
		})
	}
)
