import argon2 from 'argon2'
import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import type { SignInSchema } from '@/modules/auth/schemas/sign-in.schema.js'
import { authService } from '@/modules/auth/services/index.js'
import { tokenService } from '@/modules/token/services/index.js'
import { parseUser } from '@/modules/users/helper.js'
import { usersService } from '@/modules/users/services/index.js'
import { newUserMailTemplate } from '@/templates/new-user-mail.template.js'
import { sendMail } from '@/utils/send-mail.js'

export const signIn = async (values: SignInSchema, c: Context) => {
	const existingUser = await usersService.findOneByCondition({
		where: {
			OR: [{ email: values.emailOrPhone }, { phone: values.emailOrPhone }]
		},
		errorMessage: 'Sign in credential is incorect'
	})

	if (!existingUser.emailVerified) {
		const verificationToken = await tokenService.verificationToken.generate(
			existingUser.email
		)

		const template = newUserMailTemplate({
			name: existingUser.fullname,
			phone: existingUser.phone,
			code: existingUser.code,
			token: verificationToken.token
		})

		await sendMail({
			subject: 'FIMI TECH - Thông tin Publisher',
			html: template,
			from: `FIMI <no-reply@fimi.tech>`,
			to: existingUser.email
		})

		throw new HTTPException(401, {
			message: `Go to "${existingUser.email}" to verify your account`,
			cause: ErrorLibrary.UNAUTHORIZED
		})
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
		code: existingUser.code,
		role: existingUser.role,
		version: existingUser.version
	})

	const refreshToken = await authService.jwt.genrateRefreshToken({
		sub: existingUser.id
	})

	await usersService.update({
		where: { id: existingUser.id },
		data: { refreshToken }
	})

	setCookie(c, 'refresh-token', refreshToken, {
		httpOnly: true,
		sameSite: 'Lax',
		secure: true
	})

	return {
		user: parseUser(existingUser),
		accessToken
	}
}
