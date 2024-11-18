import argon2 from 'argon2'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { authService } from '@/modules/auth/services/index.js'
import type { ChangePasswordSchema } from '@/modules/users/schemas/change-password.schema.js'
import { usersService } from '@/modules/users/services/index.js'

export const changePassword = async (
	id: string,
	values: ChangePasswordSchema,
	c: Context
) => {
	const existingUser = await usersService.findByUnique({
		where: { id }
	})

	const verifiedPassword = await argon2.verify(
		existingUser.password,
		values.oldPassword
	)

	if (!verifiedPassword)
		throw new HTTPException(400, {
			message: 'Old password is wrong',
			cause: ErrorLibrary.BAD_REQUEST
		})

	const newPassword = await argon2.hash(values.newPassword)

	await usersService.update({ where: { id }, data: { password: newPassword } })

	await authService.signOut(existingUser.code, c)

	return true
}
