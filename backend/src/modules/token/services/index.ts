import { forgotPasswordToken } from '@/modules/token/services/forgot-password-token.service.js'
import { verificationToken } from '@/modules/token/services/new-verification-token.service.js'

export const tokenService = {
	forgotPasswordToken,
	verificationToken
}
