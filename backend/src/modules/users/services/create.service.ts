import type { Prisma, User } from '@prisma/client'

import { db } from '@/lib/db.js'

export const create = async (args: Prisma.UserCreateArgs): Promise<User> => {
	const newUser = await db.user.create(args)

	return newUser
}
