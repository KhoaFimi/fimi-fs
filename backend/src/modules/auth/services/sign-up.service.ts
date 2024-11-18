import type { User } from '@prisma/client'
import argon2 from 'argon2'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { mailerConfig } from '@/lib/mailer.js'
import type { SignUpSchema } from '@/modules/auth/schemas/sign-up.schema.js'
import { tokenService } from '@/modules/token/services/index.js'
import { usersService } from '@/modules/users/services/index.js'
import { newUserMailTemplate } from '@/templates/new-user-mail.template.js'

const genCode = (): string => {
	const numbers = Array.from({ length: 5 }, () =>
		Math.floor(Math.random() * 10)
	)

	return `FIMI${numbers.join('')}`
}

const isAdult = (birthDateString: string): boolean => {
	const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/

	if (!birthdateRegex.test(birthDateString)) {
		throw new HTTPException(400, {
			message: 'Birthdate is invalid',
			cause: ErrorLibrary.BAD_REQUEST
		})
	}
	const birthdate = new Date(birthDateString)

	const today = new Date()

	let age = today.getFullYear() - birthdate.getFullYear()
	const monthDiff = today.getMonth() - birthdate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthdate.getDate())
	) {
		age--
	}

	return age >= 18
}

export const signUp = async (values: SignUpSchema) => {
	const aldult = isAdult(values.dateOfBirth)

	if (!aldult)
		throw new HTTPException(403, {
			message:
				'Your age is not suitable to become a publisher, please come back later.',
			cause: ErrorLibrary.NOT_ENOUGHT_OLD
		})

	await usersService.checkDuplicated({
		email: values.email,
		phone: values.phone
	})

	let existingManager: User | null = null

	if (values.referralCode) {
		existingManager = await usersService.findByUnique({
			where: { code: values.referralCode },
			errorMessage: 'Manager not found'
		})
	}

	const hashPassword = await argon2.hash(values.password)

	const code = genCode()

	const newUser = await usersService.create({
		data: {
			code,
			fullname: values.fullname.toUpperCase(),
			email: values.email,
			phone: values.phone,
			password: hashPassword,
			tnc: values.tnc,
			managerId: existingManager?.id,
			workStatus: true,
			profile: {
				dateOfBirth: values.dateOfBirth
			}
		}
	})

	const verificationToken = await tokenService.verificationToken.generate(
		newUser.email
	)

	const template = newUserMailTemplate({
		name: newUser.fullname,
		phone: newUser.phone,
		code,
		token: verificationToken.token
	})

	const mailer = await mailerConfig()

	await mailer.sendMail({
		subject: 'FIMI TECH - Thông tin Publisher',
		html: template,
		from: `FIMI <no-reply@fimi.tech>`,
		to: newUser.email
	})

	return {
		message: 'Register successfully',
		verifyToken: verificationToken.token
	}
}
