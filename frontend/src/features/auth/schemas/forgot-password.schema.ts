import { z } from 'zod'

export const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: 'Vui lòng nhập Email' })
		.email({ message: 'Email không chính xác' })
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
