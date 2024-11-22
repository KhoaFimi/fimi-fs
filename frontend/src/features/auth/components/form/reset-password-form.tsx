import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import FloatingLabelInput from '@/components/ui/floating-label-input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/input-otp'
import { resetPassword } from '@/features/auth/actions/reset-password'
import {
	FormError,
	FormSuccess,
	FormWarning
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
			token: '',
			password: '',
			confirmPassword: ''
		}
	})

	const [error, setError] = useState<undefined | string>(undefined)
	const [success, setSuccess] = useState<undefined | string>(undefined)
	const [warning, setWarning] = useState<undefined | string>(undefined)
	const [reRequest, setReRequest] = useState<boolean>(false)

	const navigate = Route.useNavigate()
	const { data } = Route.useSearch()

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ResetPasswordSchema) =>
			await resetPassword(values),
		onSuccess: async data => {
			if (data?.error) {
				setError(data.error)
			}

			if (data?.warning && data.redirect) {
				setWarning(data.warning)
				setReRequest(true)
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
		mutate(values)
	}

	return (
		<FormWrapper
			title='Tạo mật khẩu mới'
			description={`Truy cập email "${atob(data)}" để nhận OTP lấy lại mật khẩu`}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col items-center space-y-4'
				>
					<div className='flex w-fit justify-center rounded-md border p-4 shadow-sm'>
						<FormField
							name='token'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>OTP</FormLabel>
									<FormControl>
										<InputOTP
											disabled={isPending}
											maxLength={6}
											{...field}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{form.getValues('token').length === 6 && (
						<>
							<div className='flex w-full flex-col gap-y-4 px-4 pt-4'>
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
							</div>
							<div className='w-full px-4'>
								<FormError message={error} />
								<FormSuccess message={success} />
								<FormWarning message={warning} />
							</div>
						</>
					)}

					{reRequest ? (
						<Button asChild>
							<Link
								to='/auth/forgot-password'
								replace={true}
							>
								Yêu cầu lấy lại mật khẩu
							</Link>
						</Button>
					) : (
						<Button type='submit'>Tạo mật khẩu mới</Button>
					)}
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ResetPasswordForm
