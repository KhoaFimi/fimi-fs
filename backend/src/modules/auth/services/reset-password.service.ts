import argon2 from 'argon2'

import type { ResetPasswordSchema } from '@/modules/auth/schemas/reset-password.schema.js'
import { tokenService } from '@/modules/token/services/index.js'
import { usersService } from '@/modules/users/services/index.js'

export const resetPassword = async (
	token: string,
	resetPassword: ResetPasswordSchema
) => {
	const verifiedToken = await tokenService.forgotPasswordToken.verify(token)

	const existingUser = await usersService.findByUnique({
		where: { email: verifiedToken.identifier }
	})

	const hashedPassword = await argon2.hash(resetPassword.password)

	await usersService.update({
		where: { id: existingUser.id },
		data: {
			password: hashedPassword
		}
	})

	return true
}
