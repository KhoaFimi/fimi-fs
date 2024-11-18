import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { db } from '@/lib/db.js'

export const checkDuplicated = async ({
	email,
	phone
}: {
	email: string
	phone: string
}) => {
	const existingUser = await db.user.findFirst({
		where: {
			OR: [{ email }, { phone }]
		}
	})

	if (existingUser)
		throw new HTTPException(409, {
			message: 'Duplicated user',
			cause: ErrorLibrary.DUPLICATED_USER
		})
}
