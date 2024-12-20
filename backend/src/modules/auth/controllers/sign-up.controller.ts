import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { signUpSchema } from '@/modules/auth/schemas/sign-up.schema.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

export const signUp = factory.createHandlers(
	zValidator('json', signUpSchema, res => {
		if (!res.success) {
			console.log(res.error)

			throw new HTTPException(400, {
				message: parseZodError(res.error.message),
				cause: ErrorLibrary.BAD_REQUEST
			})
		}
	}),
	async c => {
		const validatedData = c.req.valid('json')

		const res = await authService.signUp(validatedData)

		return c.json<IResponse>({
			statusCode: 201,
			success: true,
			code: StatusLibrary.CREATED_UESER,
			message: res.message,
			data: {
				token: res.token
			}
		})
	}
)
