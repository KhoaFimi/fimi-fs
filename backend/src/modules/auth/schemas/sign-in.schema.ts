import { z } from 'zod'

export const signInSchema = z.object({
	emailOrPhone: z
		.string()
		.min(1, { message: 'Phone number or email is required' }),
	password: z.string().min(1, { message: 'Password is required' })
})

export type SignInSchema = z.infer<typeof signInSchema>
