import type { Prisma, User } from '@prisma/client'
import { HTTPException } from 'hono/http-exception'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { db } from '@/lib/db.js'

const defaultMessage = {
	one: 'User not found',
	many: 'Users not found'
}

export const findUsersService = {
	findById: async ({
		id,
		errorMessage = defaultMessage.one
	}: {
		id: string
		errorMessage?: string
	}): Promise<User> => {
		const existingUser = await db.user.findUnique({ where: { id } })

		if (!existingUser)
			throw new HTTPException(404, {
				message: errorMessage,
				cause: ErrorLibrary.NOT_FOUND
			})

		return existingUser
	},
	findByUnique: async ({
		where,
		errorMessage = defaultMessage.one
	}: {
		where: Prisma.UserWhereUniqueInput
		errorMessage?: string
	}): Promise<User> => {
		const existingUser = await db.user.findUnique({ where })

		if (!existingUser)
			throw new HTTPException(404, {
				message: errorMessage,
				cause: ErrorLibrary.NOT_FOUND
			})

		return existingUser
	},
	findOneByCondition: async ({
		where,
		errorMessage = defaultMessage.one
	}: {
		where: Prisma.UserWhereInput
		errorMessage?: string
	}): Promise<User> => {
		const existingUser = await db.user.findFirst({ where })

		if (!existingUser)
			throw new HTTPException(404, {
				message: errorMessage,
				cause: ErrorLibrary.NOT_FOUND
			})

		return existingUser
	},
	findManyByCondition: async ({
		where,
		page = 1,
		limit = 10,
		orderBy,
		errorMessage = defaultMessage.many
	}: {
		where?: Prisma.UserWhereInput
		page: number
		limit: number
		orderBy?: Prisma.UserOrderByWithRelationInput
		errorMessage?: string
	}): Promise<{ users: User[]; total: number }> => {
		const skip = (page - 1) * limit

		const [existingUsers, totalUsers] = await db.$transaction([
			db.user.findMany({
				where,
				skip,
				take: limit,
				orderBy
			}),
			db.user.count()
		])

		console.log(existingUsers)

		if (existingUsers.length < 1)
			throw new HTTPException(404, {
				message: errorMessage,
				cause: ErrorLibrary.NOT_FOUND
			})

		return {
			users: existingUsers,
			total: totalUsers
		}
	},
	findMany: async ({
		page = 1,
		limit = 10,
		orderBy,
		errorMessage = defaultMessage.many
	}: {
		page: number
		limit: number
		orderBy: Prisma.UserOrderByWithRelationInput
		errorMessage?: string
	}): Promise<User[]> => {
		const skip = (page - 1) * limit + 1

		const existingUsers = await db.user.findMany({
			skip,
			take: limit,
			orderBy
		})

		if (existingUsers.length < 1)
			throw new HTTPException(404, {
				message: errorMessage,
				cause: ErrorLibrary.NOT_FOUND
			})

		return existingUsers
	}
}
