import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { LoginSchema, loginSchema } from '@/features/auth/schemas/login.schema'
import { httpClient } from '@/lib/http'

export const login = async (values: LoginSchema) => {
	const validatedValues = loginSchema.safeParse(values)

	if (!validatedValues.success) {
		return {
			error: 'Thông tin đằng nhập không chính xác'
		}
	}

	const { data: resData } = await httpClient.post(
		'/auth/sign-in',
		validatedValues.data
	)

	if (resData.code === ErrorLibrary.UNAUTHORIZED) {
		return {
			token: resData.data.token
		}
	}

	if (
		resData.code === ErrorLibrary.BAD_REQUEST ||
		resData.code === ErrorLibrary.NOT_FOUND
	) {
		return {
			error: 'Thông tin đăng nhập không chính xác'
		}
	}

	return {
		success: 'Đăng nhập thành công',
		accessToken: resData.data.accessToken,
		user: resData.data.user
	}
}
