import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { emailVerification } from '@/features/auth/actions/email-verification'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import { Route } from '@/routes/auth/email-verification'

const EmailVerificationForm = () => {
	const navigate = Route.useNavigate()
	const { token } = Route.useSearch()

	const { isLoading, data } = useQuery({
		queryKey: ['email-verification'],
		queryFn: async () => await emailVerification(token)
	})

	console.log(data)

	if (isLoading)
		return (
			<FormWrapper title='Xác thực tài khoản'>
				<div className='flex w-full items-center gap-x-1.5 rounded-md border bg-background p-3 text-sm text-foreground/80 shadow-md'>
					<Loader2 className='size-4 animate-spin' />
					<p className='tracking-tight'>Đang xác thực tài khoản</p>
				</div>
			</FormWrapper>
		)

	if (data?.success) {
		navigate({
			to: '/auth/login'
		})
	}
}

export default EmailVerificationForm
