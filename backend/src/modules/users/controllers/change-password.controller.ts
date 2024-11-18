import { zValidator } from '@hono/zod-validator'
import { createFactory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import type { JwtVariables } from 'hono/jwt'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import type { IAccessTokenPayload } from '@/modules/auth/services/jwt.service.js'
import { changePasswordSchema } from '@/modules/users/schemas/change-password.schema.js'
import { usersService } from '@/modules/users/services/index.js'
import type { IResponse } from '@/types.js'
import { parseZodError } from '@/utils/parse-zod-error.js'

type Env = {
	Variables: JwtVariables<IAccessTokenPayload>
}

const factory = createFactory<Env>()

export const changePassword = factory.createHandlers(
	zValidator('json', changePasswordSchema, res => {
		if (!res.success)
			throw new HTTPException(400, {
				message: parseZodError(res.error.message),
				cause: ErrorLibrary.BAD_REQUEST
			})
	}),
	async c => {
		const payload = c.get('jwtPayload')
		const validatedData = c.req.valid('json')

		await usersService.changePassword(payload.sub, validatedData, c)

		return c.json<IResponse>({
			statusCode: 200,
			success: true,
			code: StatusLibrary.OK,
			message: 'Change password successfully'
		})
	}
)
