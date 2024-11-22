import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async ({ context, location }) => {
		const { isAuth, checkAuth } = context.auth

		if (!isAuth) {
			const auth = await checkAuth()

			if (!auth) {
				throw redirect({
					to: '/auth/login',
					replace: true,
					search: {
						redirect: location.href
					}
				})
			}
		}
	}
})
