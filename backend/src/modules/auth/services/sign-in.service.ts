import argon2 from 'argon2'
import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { sendVerificationMailQueue } from '@/lib/queue.js'
import type { SignInSchema } from '@/modules/auth/schemas/sign-in.schema.js'
import { authService } from '@/modules/auth/services/index.js'
import { parseUser } from '@/modules/users/helper.js'
import { usersService } from '@/modules/users/services/index.js'

export const signIn = async (values: SignInSchema, c: Context) => {
	const existingUser = await usersService.findOneByCondition({
		where: {
			OR: [{ email: values.emailOrPhone }, { phone: values.emailOrPhone }]
		},
		errorMessage: 'Sign in credential is incorect'
	})

	if (!existingUser.emailVerified) {
		await sendVerificationMailQueue.add(
			'send-verification-mail',
			{
				email: existingUser.email
			},
			{ removeOnComplete: true }
		)

		return {
			message: `Go to "${existingUser.email}" to verify your account`,
			token: btoa(existingUser.email)
		}
	}

	const verifiedPassword = await argon2.verify(
		existingUser.password,
		values.password
	)

	if (!verifiedPassword)
		throw new HTTPException(400, {
			message: 'Sign in credential is incorect',
			cause: ErrorLibrary.BAD_REQUEST
		})

	const accessToken = await authService.jwt.generateAccessToken({
		sub: existingUser.id,
		role: existingUser.role,
		version: existingUser.version
	})

	const refreshToken = await authService.jwt.genrateRefreshToken({
		sub: existingUser.id
	})

	await setCookie(c, 'refresh-token', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		path: '/'
	})

	await usersService.update({
		where: { id: existingUser.id },
		data: { refreshToken }
	})

	return {
		user: parseUser(existingUser),
		accessToken
	}
}
