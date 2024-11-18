import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

export const newVerification = factory.createHandlers(
	zValidator(
		'query',
		z.object({
			token: z.string().min(1, { message: 'Missing token' })
		}),
		res => {
			if (!res.success)
				throw new HTTPException(400, {
					message: parseZodError(res.error.message),
					cause: ErrorLibrary.BAD_REQUEST
				})
		}
	),
	async c => {
		const validatedData = c.req.valid('query')

		await authService.newVerification(validatedData.token)

		return c.json<IResponse>({
			statusCode: 200,
			success: true,
			code: StatusLibrary.EMAIL_VERIRIFICATION,
			message: 'Verification account successfully'
		})
	}
)
