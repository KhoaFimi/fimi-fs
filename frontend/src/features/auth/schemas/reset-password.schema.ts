import { z } from 'zod'

export const resetPasswordSchema = z.object({
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
	confirmPassword: z.string().min(1, {
		message: 'Vui lòng nhập lại mật khẩu'
	})
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
