import { randomUUID as uuidV4 } from 'crypto'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { db } from '@/lib/db.js'
import { usersService } from '@/modules/users/services/index.js'

export const verificationToken = {
	generate: async (identifier: string): Promise<{ token: string }> => {
		const exisitingToken = await db.verificationToken.findFirst({
			where: { identifier }
		})

		if (exisitingToken) {
			await db.verificationToken.delete({ where: { id: exisitingToken.id } })
		}

		const token = uuidV4()

		const expires = new Date(new Date().getTime() + 3600 * 1000)

		const newToken = await db.verificationToken.create({
			data: {
				token,
				expires,
				identifier
			}
		})

		return {
			token: newToken.token
		}
	},
	verify: async (token: string): Promise<{ identifier: string }> => {
		const existingToken = await db.verificationToken.findUnique({
			where: { token }
		})

		if (!existingToken)
			throw new HTTPException(400, {
				message: 'Missing token',
				cause: ErrorLibrary.BAD_REQUEST
			})

		const hasExpires = new Date(existingToken.expires) < new Date()

		if (hasExpires)
			throw new HTTPException(401, {
				message: 'Token is expires',
				cause: ErrorLibrary.UNAUTHORIZED
			})

		const existingUser = await usersService.findByUnique({
			where: { email: existingToken.identifier }
		})

		await db.verificationToken.delete({
			where: {
				id: existingToken.id
			}
		})

		return {
			identifier: existingUser.email
		}
	}
}
