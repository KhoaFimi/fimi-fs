import { formatInTimeZone } from 'date-fns-tz'

import { tokenService } from '@/modules/token/services/index.js'
import { usersService } from '@/modules/users/services/index.js'

export const newVerification = async (token: string) => {
	const verifyToken = await tokenService.verificationToken.verify(token)

	const timeStamp = formatInTimeZone(
		new Date(),
		'Asia/Ho_Chi_Minh',
		'yyyy-dd-MM'
	)

	await usersService.update({
		where: {
			email: verifyToken.identifier
		},
		data: {
			emailVerified: timeStamp
		}
	})

	return true
}
