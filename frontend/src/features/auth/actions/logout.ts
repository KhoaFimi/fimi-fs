import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { httpClient } from '@/lib/http'
import JWTManager from '@/lib/jwt'

export const logout = async () => {
	const userId = JWTManager.getUserId()

	const { data: resData } = await httpClient.patch(
		'/auth/sign-out',
		{},
		{
			params: {
				id: userId
			}
		}
	)

	if (resData.code === ErrorLibrary.NOT_FOUND)
		return {
			error: 'Đăng xuát không thành công'
		}

	return {
		success: 'Đăng xuất thành công'
	}
}
