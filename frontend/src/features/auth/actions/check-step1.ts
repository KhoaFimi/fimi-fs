import { ErrorLibrary } from '@/contraints/error-library.constraint'
import {
	RegisterStep1Schema,
	registerStep1Schema
} from '@/features/auth/schemas/register-step1.schema'
import { httpClient } from '@/lib/http'

const isAdult = (birthDateString: Date): boolean => {
	const birthdate = new Date(birthDateString)

	const today = new Date()

	let age = today.getFullYear() - birthdate.getFullYear()
	const monthDiff = today.getMonth() - birthdate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthdate.getDate())
	) {
		age--
	}

	return age >= 18
}

export const checkStep1 = async (values: RegisterStep1Schema) => {
	const validatedvalues = registerStep1Schema.safeParse(values)

	if (!validatedvalues.success) {
		return {
			error: 'Thông tin chưa chính xác'
		}
	}

	const { referralCode, dateOfBirth } = validatedvalues.data

	if (!isAdult(dateOfBirth))
		return {
			step: 3
		}

	const { data: resData } = await httpClient.get('/auth/check-referal-code', {
		params: {
			code: referralCode
		}
	})

	if (resData.code === ErrorLibrary.NOT_FOUND) {
		return {
			error: 'Mã người giới thiệu không đúng'
		}
	}

	return {
		step: 2
	}
}
