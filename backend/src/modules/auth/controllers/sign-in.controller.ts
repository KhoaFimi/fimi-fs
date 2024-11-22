import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { signInSchema } from '@/modules/auth/schemas/sign-in.schema.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

export const signIn = factory.createHandlers(
	zValidator('json', signInSchema, res => {
		if (!res.success)
			throw new HTTPException(400, {
				message: parseZodError(res.error.message),
				cause: ErrorLibrary.BAD_REQUEST
			})
	}),
	async c => {
		const validatedData = c.req.valid('json')

		const res = await authService.signIn(validatedData, c)

		if (res.token)
			return c.json<IResponse>({
				statusCode: 401,
				success: false,
				message: res.message,
				code: ErrorLibrary.UNAUTHORIZED,
				data: {
					token: res.token
				}
			})

		return c.json<IResponse>({
			statusCode: 200,
			success: true,
			message: 'Signed in successfully',
			code: StatusLibrary.CREATED_UESER,
			data: res
		})
	}
)
