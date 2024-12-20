import { randomUUID as uuidV4 } from 'crypto'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { db } from '@/lib/db.js'
import { usersService } from '@/modules/users/services/index.js'

export const forgotPasswordToken = {
	generate: async (identifier: string): Promise<{ token: string }> => {
		const exisitingToken = await db.forgotPasswordToken.findFirst({
			where: { identifier }
		})

		if (exisitingToken) {
			await db.forgotPasswordToken.delete({ where: { id: exisitingToken.id } })
		}

		const token = uuidV4()

		const newToken = await db.forgotPasswordToken.create({
			data: {
				token,
				identifier
			}
		})

		return {
			token: newToken.token
		}
	},
	verify: async (token: string): Promise<{ identifier: string }> => {
		const existingToken = await db.forgotPasswordToken.findUnique({
			where: { token }
		})

		if (!existingToken)
			throw new HTTPException(400, {
				message: 'Missing token',
				cause: ErrorLibrary.BAD_REQUEST
			})

		const existingUser = await usersService.findByUnique({
			where: { email: existingToken.identifier }
		})

		await db.forgotPasswordToken.delete({
			where: {
				id: existingToken.id
			}
		})

		return {
			identifier: existingUser.email
		}
	}
}
