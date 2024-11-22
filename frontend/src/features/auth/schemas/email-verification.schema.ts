import { z } from 'zod'

export const emailVerificationSchema = z.object({
	otp: z.string().min(6, { message: 'OTP gôm 6 số' })
})

export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>
