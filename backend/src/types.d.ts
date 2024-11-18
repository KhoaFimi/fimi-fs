/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ErrorLibrary } from '@/constraints/error-library.constraint.ts'
import type { StatusLibrary } from '@/constraints/status-librery.constraint.ts'

export type IResponse<T = any> = {
	success: boolean
	statusCode: number
	code: ErrorLibrary | StatusLibrary
	message: string | string[]
	data?: T
}
