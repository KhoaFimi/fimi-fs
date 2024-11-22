import { StatusLibrary } from '@/contraints/status-librery.constraint'
import { httpClient } from '@/lib/http'

export const emailVerification = async (token: string) => {
	const { data: resData } = await httpClient.get('/auth/new-verification', {
		params: {
			token
		}
	})

	console.log(resData)

	if (resData.code === StatusLibrary.EMAIL_VERIRIFICATION)
		return {
			success: 'Xác thực tài khoản thành công'
		}
}
