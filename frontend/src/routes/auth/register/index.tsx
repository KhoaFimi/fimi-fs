import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import RegisterForm from '@/features/auth/components/form/register-form'

const searchParams = z.object({
	step: z.number().catch(1)
})

const RegisterPage = () => {
	return (
		<AuthPageWrapper>
			<RegisterForm />
		</AuthPageWrapper>
	)
}

export const Route = createFileRoute('/auth/register/')({
	component: RegisterPage,
	validateSearch: zodValidator(searchParams)
})
