import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import ResetPasswordForm from '@/features/auth/components/form/reset-password-form'

const searchParams = z.object({
	token: z.string()
})

const ResetPasswordPage = () => {
	return (
		<AuthPageWrapper>
			<ResetPasswordForm />
		</AuthPageWrapper>
	)
}

export const Route = createFileRoute('/auth/reset-password/')({
	component: ResetPasswordPage,
	validateSearch: zodValidator(searchParams)
})
