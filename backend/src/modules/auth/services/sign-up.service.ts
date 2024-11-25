import argon2 from 'argon2'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { sendVerificationMailQueue } from '@/lib/queue.js'
import type { SignUpSchema } from '@/modules/auth/schemas/sign-up.schema.js'
import { usersService } from '@/modules/users/services/index.js'

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

	const hashPassword = await argon2.hash(values.password)

	const newUser = await usersService.create({
		data: {
			fullname: values.fullname.toUpperCase(),
			email: values.email,
			phone: values.phone,
			password: hashPassword,
			tnc: values.tnc,
			managerId: values.managerId,
			workStatus: true,
			profile: {
				dateOfBirth: values.dateOfBirth
			}
		}
	})

	console.log(newUser)

	await sendVerificationMailQueue.add(
		'send-verification-mail',
		{
			email: newUser.email
		},
		{
			removeOnComplete: true
		}
	)

	return {
		message: 'Register successfully',
		token: btoa(newUser.email)
	}
}
