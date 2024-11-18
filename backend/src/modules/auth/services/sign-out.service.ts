import type { Context } from 'hono'
import { deleteCookie } from 'hono/cookie'

import { usersService } from '@/modules/users/services/index.js'

export const signOut = async (code: string, c: Context) => {
	const existingUser = await usersService.findByUnique({
		where: { code }
	})

	await usersService.update({
		where: {
			id: existingUser.id
		},
		data: {
			refreshToken: null,
			version: {
				increment: 1
			}
		}
	})

	deleteCookie(c, 'refresh-token', {
		httpOnly: true,
		sameSite: 'Lax',
		secure: true
	})

	return {
		message: 'Sign out successfully'
	}
}
