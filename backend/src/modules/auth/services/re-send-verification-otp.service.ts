import { sendVerificationMailQueue } from '@/lib/queue.js'

export const reSendVerificationOtp = async (token: string) => {
	const parseToken = atob(token)

	await sendVerificationMailQueue.add(
		'send-verification-mail',
		{
			email: parseToken
		},
		{
			removeOnComplete: true
		}
	)

	return {
		message: 'Resend OTP'
	}
}
