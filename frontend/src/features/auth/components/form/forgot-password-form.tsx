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
import { forgotPassword } from '@/features/auth/actions/forgot-password'
import {
	FormError,
	FormSuccess
} from '@/features/auth/components/form/form-response'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/features/auth/schemas/forgot-password.schema'

const ForgotPasswordForm = () => {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const [error, setError] = useState<undefined | string>(undefined)
	const [success, setSuccess] = useState<undefined | string>(undefined)

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ForgotPasswordSchema) =>
			await forgotPassword(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}

			if (data.success) {
				setSuccess(data.success)
			}
		}
	})

	const onSubmit = (values: ForgotPasswordSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			title='Yêu cầu lấy lại mật khẩu'
			description='Để yêu cầu lấy lại mật khẩu, vui lòng nhập email đã đăng ký để hệ thống xác thực'
		>
			<Form {...form}>
				<form
					className='flex w-full flex-col justify-center space-y-4 px-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
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

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button
						type='submit'
						disabled={isPending}
					>
						Yêu cầu lấy lại mật khẩu
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ForgotPasswordForm
