import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import FloatingLabelInput from '@/components/ui/floating-label-input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { resetPassword } from '@/features/auth/actions/reset-password'
import {
	FormError,
	FormSuccess
} from '@/features/auth/components/form/form-response'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import {
	ResetPasswordSchema,
	resetPasswordSchema
} from '@/features/auth/schemas/reset-password.schema'
import { Route } from '@/routes/auth/reset-password'

const ResetPasswordForm = () => {
	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})

	const [error, setError] = useState<undefined | string>(undefined)
	const [success, setSuccess] = useState<undefined | string>(undefined)

	const navigate = Route.useNavigate()
	const { token } = Route.useSearch()

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			token,
			values
		}: {
			token: string
			values: ResetPasswordSchema
		}) => await resetPassword(token, values),
		onSuccess: async data => {
			if (data?.error) {
				setError(data.error)
			}

			if (data?.success) {
				setSuccess(data.success)
				await navigate({
					to: '/auth/login'
				})
			}
		}
	})

	const onSubmit = (values: ResetPasswordSchema) => {
		mutate({ token, values })
	}

	return (
		<FormWrapper title='Tạo mật khẩu mới'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col justify-center space-y-4 px-4'
				>
					<FormField
						name='password'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										label='Mật khẩu'
										disabled={isPending}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='confirmPassword'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										label='Xác nhận mật khẩu'
										disabled={isPending}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button type='submit'>Tạo mật khẩu mới</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ResetPasswordForm
