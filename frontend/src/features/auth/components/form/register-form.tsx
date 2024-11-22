import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import FloatingLabelInput from '@/components/ui/floating-label-input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { register } from '@/features/auth/actions/register'
import {
	FormError,
	FormSuccess
} from '@/features/auth/components/form/form-response'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import {
	RegisterSchema,
	registerSchema
} from '@/features/auth/schemas/register.schema'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'
import { Route } from '@/routes/auth/register'

const RegisterForm = () => {
	const { data } = Route.useSearch()

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			dateOfBirth: undefined,
			tnc: false,
			managerId: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegisterSchema) => {
			setSuccess(undefined)
			setError(undefined)

			return await register(values)
		},
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
			}

			if (data.success) {
				setSuccess(data.success)
			}
		}
	})

	const onSubmit = (values: RegisterSchema) => {
		mutate({
			...values,
			managerId: !data ? '' : atob(data)
		})
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Chào mừng bạn đến với FIMI, hãy cung cấp một số thông tin cơ bản để có thể đăng ký mã giới thiệu ngay.'
			backButton={{
				label: 'Đăng nhập',
				description: 'Bạn đã có mã giới thiệu',
				href: '/auth/login'
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col justify-center space-y-4 px-4'
				>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										disabled={isPending}
										label='Họ và tên'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='dateOfBirth'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										disabled={isPending}
										label='Ngày sinh'
										onMouseDown={e => (e.currentTarget.type = 'date')}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										label='Email'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='phone'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										label='Số điện thoại'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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

					<FormField
						name='tnc'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='select-none space-y-1 leading-3'>
									<FormDescription className='cursor-pointer text-justify text-xs font-semibold'>
										Bằng việc cung cấp thông tin, bạn đã đồng ý với{' '}
										<PolicyButton onOpen={onOpenSercutiryPolicy}>
											Điều khoản sử dụng dịch vụ FIMI
										</PolicyButton>
										,{' '}
										<PolicyButton onOpen={onOpenTermPolicy}>
											Chính sách bảo vệ dữ liệu cá nhân
										</PolicyButton>{' '}
										và{' '}
										<PolicyButton onOpen={onOpenUserPolicy}>
											Thông báo bảo mật của chúng tôi
										</PolicyButton>
										.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button
						type='submit'
						className='gap-x-1.5'
						disabled={!form.getFieldState('tnc').isDirty || isPending}
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Đăng ký ngay
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

const PolicyButton: FC<
	PropsWithChildren<{
		onOpen: () => void
	}>
> = ({ children, onOpen }) => {
	return (
		<span
			className='text-primary hover:underline'
			onClick={e => {
				e.preventDefault()
				onOpen()
			}}
		>
			{children}
		</span>
	)
}

export default RegisterForm
