import { httpClient } from '@/lib/http'

export const resendOtp = async (token: string) => {
	await httpClient.get('/auth/resend-verification-otp', {
		params: {
			token
		}
	})

	return {
		success: 'Otp mới đã được gửi tới email đã đăng ký'
	}
}
