import type { User } from '@prisma/client'
import _ from 'lodash'

export const parseUser = (user: User) => {
	return _.pick(user, [
		'code',
		'fullname',
		'email',
		'phone',
		'profile',
		'document',
		'workStatus'
	])
}
