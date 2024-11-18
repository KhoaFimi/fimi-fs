import { EducationLevelEnum, GenderEnum } from '@prisma/client'
import { z } from 'zod'

export const updateProfileSchema = z.object({
	gender: z.nativeEnum(GenderEnum, {
		required_error: 'Gender is required',
		message: 'Gender is invalid'
	}),
	placeOfBirth: z.string().min(1, { message: 'Place of birth is required' }),
	citizenIdentification: z.object({
		number: z
			.string()
			.min(1, { message: 'Citizen identification is required' })
			.max(12, { message: 'Citizen identification length is 12' }),
		dateOfIssue: z
			.string()
			.min(1, { message: 'Citizen identification date issue is required' }),
		placeOfIssue: z
			.string()
			.min(1, { message: 'Citizen identification issue place is required' })
	}),
	nation: z.string().min(1, { message: 'Nation is required' }),
	education: z.nativeEnum(EducationLevelEnum),
	currentAddress: z.object({
		address: z.string().min(1, { message: 'Address detail is required' }),
		ward: z.string().min(1, { message: 'Ward is required' }),
		district: z.string().min(1, { message: 'District is required' }),
		province: z.string().min(1, { message: 'Province is required' })
	}),
	bank: z.object({
		accountName: z
			.string()
			.min(1, { message: 'Bank account name is required' }),
		accountNumber: z
			.string()
			.min(1, { message: 'Bank account number is required' }),
		bankName: z.string().min(1, { message: 'Bank name is required' })
	})
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
