import { changePassword } from '@/modules/users/services/change-password.service.js'
import { checkDuplicated } from '@/modules/users/services/check-duplicated.service.js'
import { create } from '@/modules/users/services/create.service.js'
import { findUsersService } from '@/modules/users/services/find.service.js'
import { update } from '@/modules/users/services/update.service.js'

export const usersService = {
	...findUsersService,
	create,
	update,
	checkDuplicated,
	changePassword
}
