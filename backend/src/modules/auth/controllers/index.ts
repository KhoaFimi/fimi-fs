import { checkReferalCode } from '@/modules/auth/controllers/check-referal-code.controller.js'
import { forgotPassword } from '@/modules/auth/controllers/forgot-password.controller.js'
import { newVerification } from '@/modules/auth/controllers/new-verification.controller.js'
import { refreshToken } from '@/modules/auth/controllers/refresh-token.controller.js'
import { resendVerificationOTP } from '@/modules/auth/controllers/resend-verification-otp.controller.js'
import { resetPassword } from '@/modules/auth/controllers/reset-password.controller.js'
import { signIn } from '@/modules/auth/controllers/sign-in.controller.js'
import { signOut } from '@/modules/auth/controllers/sign-out.controller.js'
import { signUp } from '@/modules/auth/controllers/sign-up.controller.js'

export const authController = {
	signUp,
	signIn,
	signOut,
	newVerification,
	refreshToken,
	forgotPassword,
	resetPassword,
	resendVerificationOTP,
	checkReferalCode
}
