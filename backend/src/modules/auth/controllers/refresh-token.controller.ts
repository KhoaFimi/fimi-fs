import { StatusLibrary } from '@/constraints/status-librery.constraint.js'
import { authService } from '@/modules/auth/services/index.js'
import type { IResponse } from '@/types.js'
import { factory } from '@/utils/factory.js'

export const refreshToken = factory.createHandlers(async c => {
	const res = await authService.jwt.refreshToken(c)

	return c.json<IResponse>({
		statusCode: 200,
		code: StatusLibrary.OK,
		success: true,
		message: 'Refresh token successfully',
		data: res
	})
})
