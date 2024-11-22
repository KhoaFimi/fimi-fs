import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { StatusLibrary } from '@/contraints/status-librery.constraint'
import {
	ResetPasswordSchema,
	resetPasswordSchema
} from '@/features/auth/schemas/reset-password.schema'
import { httpClient } from '@/lib/http'

export const resetPassword = async (values: ResetPasswordSchema) => {
	const validatedValues = resetPasswordSchema.safeParse(values)

	if (!validatedValues.success)
		return {
			error: 'Thông tin không chính xác'
		}

	const { data: resData } = await httpClient.post(
		'/auth/reset-password',
		validatedValues.data
	)

	if (
		resData.code === ErrorLibrary.BAD_REQUEST ||
		resData.code === ErrorLibrary.NOT_FOUND
	)
		return {
			error: 'OTP không chính xác'
		}

	if (resData.code === ErrorLibrary.UNAUTHORIZED)
		return {
			warning: 'OTP đã hết hạn',
			redirect: true
		}

	if (resData.code === StatusLibrary.OK)
		return {
			success: 'Lấy lại mật khẩu thành công'
		}
}