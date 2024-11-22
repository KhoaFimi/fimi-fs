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
	FormMessage
} from '@/components/ui/form'
import { login } from '@/features/auth/actions/login'
import {
	FormError,
	FormSuccess
} from '@/features/auth/components/form/form-response'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import { LoginSchema, loginSchema } from '@/features/auth/schemas/login.schema'
import { useAuth } from '@/hooks/use-auth'
import JWTManager from '@/lib/jwt'
import { Route } from '@/routes/auth/login'

const LoginForm = () => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			emailOrPhone: '',
			password: ''
		}
	})

	const navigate = Route.useNavigate()

	const { setIsAuth, setUser } = useAuth()

	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: LoginSchema) => await login(values),
		onSuccess: async data => {
			if (data.error) {
				setError(data.error)
				return
			}

			if (data.token) {
				navigate({
					to: '/auth/email-verification',
					search: { token: data.token }
				})
			}

			if (data.success) {
				setIsAuth(true)
				setSuccess(data.success)
				JWTManager.setToken(data.accessToken)
				setUser(data.user)

				await navigate({
					to: '/dashboard'
				})
			}
		}
	})

	const onSubmit = (values: LoginSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			title='Đăng nhập'
			description='Chào mừng trở lại với FIMI'
			backButton={{
				label: 'Đăng ký',
				description: 'Bạn chưa có mã giới thiệu',
				href: '/auth/register'
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col justify-center space-y-4 px-4'
				>
					<FormField
						name='emailOrPhone'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										{...field}
										disabled={isPending}
										label='Email hoặc số điện thoại'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex flex-col gap-1'>
						<FormField
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FloatingLabelInput
											{...field}
											type='password'
											disabled={isPending}
											className='w-full'
											label='Mật khẩu'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							variant='link'
							asChild
							className='ml-auto px-0'
						>
							<Link
								to='/auth/forgot-password'
								replace={true}
							>
								Quên mật khẩu
							</Link>
						</Button>
					</div>

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button type='submit'>Đăng nhập</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default LoginForm
