import { z } from 'zod'

export const signUpSchema = z.object({
	fullname: z.string().min(1, { message: 'Fullname is required' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email is invalid' }),
	phone: z
		.string({ required_error: 'Phone number is required' })
		.min(10, { message: 'Phone number must have at least 10 digit' })
		.max(10, { message: 'Phone number no longer 10 digit' })
		.regex(/^\d+$/, {
			message: 'Phone number is digit'
		}),
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
	dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
	confirmPassword: z.string().min(1, {
		message: 'Re-enter password'
	}),
	managerId: z.string().optional().nullable(),
	tnc: z.boolean().default(false)
})

export type SignUpSchema = z.infer<typeof signUpSchema>
