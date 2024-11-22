import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { StatusLibrary } from '@/contraints/status-librery.constraint'
import { httpClient } from '@/lib/http'

export const emailVerification = async (token: string) => {
	const { data: resData } = await httpClient.get('/auth/new-verification', {
		params: {
			token
		}
	})

	if (resData.code === ErrorLibrary.BAD_REQUEST)
		return {
			error: 'OTP không chính xác'
		}

	if (resData.code === ErrorLibrary.UNAUTHORIZED)
		return {
			error: 'OTP đã hết hạn'
		}

	if (resData.code === ErrorLibrary.NOT_FOUND)
		return {
			error: 'OTP không chính xác'
		}

	if (resData.code === StatusLibrary.EMAIL_VERIRIFICATION)
		return {
			success: 'Xác thực tài khoản thành công'
		}
}
