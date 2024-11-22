import { formatInTimeZone } from 'date-fns-tz'

import { ErrorLibrary } from '@/contraints/error-library.constraint'
import {
	RegisterSchema,
	registerSchema
} from '@/features/auth/schemas/register.schema'
import { httpClient } from '@/lib/http'

export const register = async (values: RegisterSchema) => {
	const validatedValues = registerSchema.safeParse(values)

	if (!validatedValues.success)
		return {
			error: 'Thông tin đăng ký chưa chính xác'
		}

	const { data: resData } = await httpClient.post('/auth/sign-up', {
		...validatedValues.data,
		dateOfBirth: formatInTimeZone(
			new Date(validatedValues.data.dateOfBirth),
			'Asia/Ho_Chi_Minh',
			'yyyy-MM-dd'
		)
	})

	if (resData.code === ErrorLibrary.NOT_ENOUGHT_OLD)
		return {
			step: 3
		}

	if (resData.code === ErrorLibrary.DUPLICATED_USER)
		return {
			error: 'Người dùng đã tồn tại'
		}

	return {
		success: 'Đăng ký mã giới thiệu thành công',
		token: resData.data.token
	}
}
