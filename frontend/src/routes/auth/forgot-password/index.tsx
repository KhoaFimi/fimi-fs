import { createFileRoute } from '@tanstack/react-router'

import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import ForgotPasswordForm from '@/features/auth/components/form/forgot-password-form'

const ForgotPasswordPage = () => {
	return (
		<AuthPageWrapper>
			<ForgotPasswordForm />
		</AuthPageWrapper>
	)
}

export const Route = createFileRoute('/auth/forgot-password/')({
	component: ForgotPasswordPage
})
