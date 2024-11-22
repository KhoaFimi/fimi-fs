import { createFileRoute, Link } from '@tanstack/react-router'

import LogoutButton from '@/features/auth/components/form/logout-button'
import JWTManager from '@/lib/jwt'

export const Route = createFileRoute('/_authenticated/dashboard')({
	component: RouteComponent
})

function RouteComponent() {
	const token = JWTManager.getToken()
	const userId = JWTManager.getUserId()

	return (
		<div>
			<Link to='/auth/login'>Login</Link>
			<p>{token}</p>
			<p>userId: {userId}</p>
			<LogoutButton />
		</div>
	)
}
