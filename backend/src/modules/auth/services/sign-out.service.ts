import type { Context } from 'hono'
import { deleteCookie } from 'hono/cookie'

import { usersService } from '@/modules/users/services/index.js'

export const signOut = async (id: string, c: Context) => {
	const existingUser = await usersService.findByUnique({
		where: { id }
	})

	await deleteCookie(c, 'refresh-token')

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

	return {
		message: 'Sign out successfully'
	}
}
