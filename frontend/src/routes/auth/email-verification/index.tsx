import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import EmailVerificationForm from '@/features/auth/components/form/email-verification-form'

const searchParams = z.object({
	token: z.string()
})

const EmailVerificationPage = () => {
	return (
		<AuthPageWrapper>
			<EmailVerificationForm />
		</AuthPageWrapper>
	)
}

export const Route = createFileRoute('/auth/email-verification/')({
	component: EmailVerificationPage,
	validateSearch: zodValidator(searchParams)
})
