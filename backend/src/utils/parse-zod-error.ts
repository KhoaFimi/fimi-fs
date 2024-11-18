export const parseZodError = (error: string) =>
	JSON.parse(error).map((err: { message: string }) => err.message)
