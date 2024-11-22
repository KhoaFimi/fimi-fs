import { z } from 'zod'

export const resetPasswordSchema = z.object({
	token: z.string().min(1, { message: 'Token is missing' }),
	password: z
		.string()
		.min(7, { message: 'Password must have at least 7 charactors' })
		.max(64, { message: 'Password no longer 64 charactors' })
		.refine(password => /[A-Z]/.test(password), {
			message: 'Password must have at least 1 uppercase letter'
		})
		.refine(password => /[a-z]/.test(password), {
			message: 'Password must have at least 1 uppercase letter'
		})
		.refine(password => /[0-9]/.test(password), {
			message: 'Password must have at least 1 lowercase letter'
		}),
	confirmPassword: z.string().min(1, {
		message: 'Re-enter password'
	})
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
