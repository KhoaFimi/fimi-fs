import { z } from 'zod'

export const registerStep1Schema = z.object({
	referralCode: z.string().optional(),
	dateOfBirth: z.date({ required_error: 'Vui lòng chọn ngày sinh của bạn' })
})

export type RegisterStep1Schema = z.infer<typeof registerStep1Schema>
