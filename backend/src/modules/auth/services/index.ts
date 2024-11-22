import { forgotPassword } from '@/modules/auth/services/forgot-password.service.js'
import { jwt } from '@/modules/auth/services/jwt.service.js'
import { newVerification } from '@/modules/auth/services/new-verification.service.js'
import { reSendVerificationOtp } from '@/modules/auth/services/re-send-verification-otp.service.js'
import { resetPassword } from '@/modules/auth/services/reset-password.service.js'
import { signIn } from '@/modules/auth/services/sign-in.service.js'
import { signOut } from '@/modules/auth/services/sign-out.service.js'
import { signUp } from '@/modules/auth/services/sign-up.service.js'

export const authService = {
	jwt,
	signIn,
	signUp,
	signOut,
	newVerification,
	forgotPassword,
	resetPassword,
	reSendVerificationOtp
}
