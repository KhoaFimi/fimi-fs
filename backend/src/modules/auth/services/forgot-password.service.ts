import { sendForgotPasswordMailQueue } from '@/lib/queue.js'
import { usersService } from '@/modules/users/services/index.js'

export const forgotPassword = async (email: string) => {
	await usersService.findByUnique({
		where: { email }
	})

	await sendForgotPasswordMailQueue.add(
		'send-forgot-password-mail',
		{
			email
		},
		{ removeOnComplete: true }
	)

	return {
		message: `Go to "${email}" to reset password`
	}
}
