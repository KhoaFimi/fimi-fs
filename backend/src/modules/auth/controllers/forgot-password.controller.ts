import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'

export const forgotPassword = factory.createHandlers(
	zValidator(
		'json',
		z.object({
			email: z
				.string({ required_error: 'Email is required' })
				.email({ message: 'Email is invalid' })
		})
	),
	async c => {
		const validatedData = c.req.valid('json')

		const res = await authService.forgotPassword(validatedData.email)

		return c.json<IResponse>({
			statusCode: 200,
			code: StatusLibrary.OK,
			success: true,
			message: res.message
		})
	}
)
