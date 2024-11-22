import { z } from 'zod'

export const registerSchema = z.object({
	fullname: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
	email: z
		.string()
		.min(1, { message: 'Vui lòng nhập Email' })
		.email({ message: 'Email sai định dạng' }),
	phone: z
		.string({ required_error: 'Vui lòng nhập số điện thoại' })
		.min(1, { message: 'Vui lòng nhập số điện thoại' })
		.max(10, { message: 'Sđt không quá 10 số' })
		.regex(/^\d+$/, {
			message: 'Sddt chỉ gồm số'
		}),
	password: z
		.string()
		.min(7, { message: 'Mật khẩu phải có tối thiểu 7 ký tự' })
		.max(64, { message: 'Mật khẩu khồng quá 64 ký tự' })
		.refine(password => /[A-Z]/.test(password), {
			message: 'Mật khẩu phải có ít nhất 1 ký tự in hoa'
		})
		.refine(password => /[a-z]/.test(password), {
			message: 'Mật khẩu phải có ít nhất 1 ký tự thường'
		})
		.refine(password => /[0-9]/.test(password), {
			message: 'Mật khẩu phải có ít nhất 1 chữ số'
		}),
	dateOfBirth: z.date(),
	confirmPassword: z.string().min(1, {
		message: 'Vui lòng nhập lại mật khẩu'
	}),
	referralCode: z.string().optional(),
	tnc: z.boolean().default(false)
})

export type RegisterSchema = z.infer<typeof registerSchema>
