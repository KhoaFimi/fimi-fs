import { tokenService } from '@/modules/token/services/index.js'
import { env } from '@/utils/env.js'
import { sendMail } from '@/utils/send-mail.js'

export const forgotPassword = async (email: string) => {
	const forgotPasswordToken =
		await tokenService.forgotPasswordToken.generate(email)

	await sendMail({
		to: email,
		subject: 'FIMI TECH - Yêu cầu lấy lại mật khẩu',
		html: `<a href="${env.HOST || 'http://localhost:3000'}/auth/reset-password?token${forgotPasswordToken.token}">Reset password</a>`
	})

	return {
		message: `Go to "${email}" to reset password`,
		resetPasswordToken: forgotPasswordToken.token
	}
}
