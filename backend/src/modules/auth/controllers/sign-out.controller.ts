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
		'json',
		z.object({ code: z.string().min(1, { message: 'Code is required' }) }),
		res => {
			if (!res.success)
				throw new HTTPException(400, {
					message: parseZodError(res.error.message),
					cause: ErrorLibrary.BAD_REQUEST
				})
		}
	),
	async c => {
		const validatedData = c.req.valid('json')

		const res = await authService.signOut(validatedData.code, c)

		return c.json<IResponse>({
			statusCode: 200,
			success: true,
			code: StatusLibrary.OK,
			message: res.message
		})
	}
)
