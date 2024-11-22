import { createFileRoute } from '@tanstack/react-router'

import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import LoginForm from '@/features/auth/components/form/login-form'

export const LoginPage = () => {
	return (
		<AuthPageWrapper>
			<LoginForm />
		</AuthPageWrapper>
	)
}

export const Route = createFileRoute('/auth/login/')({
	component: LoginPage
})
