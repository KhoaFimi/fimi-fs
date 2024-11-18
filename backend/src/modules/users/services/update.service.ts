import type { Prisma, User } from '@prisma/client'

import { db } from '@/lib/db.js'

export const update = async ({
	where,
	data
}: {
	where: Prisma.UserWhereUniqueInput
	data: Prisma.UserUpdateInput
}): Promise<User> => {
	const updatedUser = await db.user.update({ where, data })

	return updatedUser
}
