import { ErrorLibrary } from '@/contraints/error-library.constraint'
import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/features/auth/schemas/forgot-password.schema'
import { httpClient } from '@/lib/http'

export const forgotPassword = async (values: ForgotPasswordSchema) => {
	const validatedValues = forgotPasswordSchema.safeParse(values)

	if (!validatedValues.success)
		return {
			error: 'Email không chính xác'
		}

	const { data: resData } = await httpClient.post('/auth/forgot-password', {
		...validatedValues.data
	})

	if (resData.code === ErrorLibrary.NOT_FOUND)
		return {
			error: 'Email không chính xác'
		}

	return {
		success: 'Xác thực email thành công'
	}
}
