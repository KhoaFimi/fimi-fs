import { createFileRoute, redirect } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

const searchParams = z.object({
	data: z.string()
})

export const Route = createFileRoute('/auth/invite/')({
	validateSearch: zodValidator(searchParams),
	beforeLoad: ({ search }) => {
		const { data } = search

		throw redirect({
			to: '/auth/register',
			replace: true,
			search: {
				data
			}
		})
	}
})
