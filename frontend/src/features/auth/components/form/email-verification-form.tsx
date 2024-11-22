import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { emailVerification } from '@/features/auth/actions/email-verification'
import { resendOtp } from '@/features/auth/actions/resendOtp'
import {
	FormError,
	FormSuccess
} from '@/features/auth/components/form/form-response'
import FormWrapper from '@/features/auth/components/form/form-wrapper'
import {
	EmailVerificationSchema,
	emailVerificationSchema
} from '@/features/auth/schemas/email-verification.schema'
import { Route } from '@/routes/auth/email-verification'

const EmailVerificationForm = () => {
	const [remainTime, setRemainTime] = useState<number>(600)
	const [cooldown, setCooldown] = useState<number>(120)
	const [allowGetNewOTP, setAllowGetNewOTP] = useState(false)
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const navigate = Route.useNavigate()
	const { token } = Route.useSearch()

	const { mutate: resendOtpAction, isPending: resendOtpPending } = useMutation({
		mutationFn: async ({ token }: { token: string }) => await resendOtp(token),
		onSuccess: _data => {
			setRemainTime(600)
			setAllowGetNewOTP(false)
		}
	})

	const { mutate: verificationEmail, isPending: isVerificationEmailPending } =
		useMutation({
			mutationFn: async ({ token }: { token: string }) =>
				await emailVerification(token),
			onSuccess: data => {
				if (data?.error) {
					setError(data.error)
					return
				}

				if (data?.success) {
					setSuccess(data.success)
					navigate({ to: '/auth/login' })
				}
			}
		})

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		if (!allowGetNewOTP) {
			timeoutId = setTimeout(() => setAllowGetNewOTP(true), 45000)
		}

		return () => clearTimeout(timeoutId)
	}, [allowGetNewOTP])

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainTime && !resendOtpPending) {
				setRemainTime(remainTime => remainTime - 1)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [remainTime, resendOtpPending])

	useEffect(() => {
		const interval = setInterval(() => {
			if (cooldown && !allowGetNewOTP) {
				setCooldown(cooldown => cooldown - 1)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [cooldown, allowGetNewOTP])

	const form = useForm<EmailVerificationSchema>({
		resolver: zodResolver(emailVerificationSchema),
		defaultValues: {
			otp: ''
		},
		mode: 'onChange'
	})

	const formatTimeCounter = (secondsValue: number) => {
		const minutesRaw = Math.floor(secondsValue / 60)

		const secondsRaw = secondsValue % 60

		const minutes =
			minutesRaw === 0 ? '00' : minutesRaw.toString().padStart(2, '0')
		const seconds =
			secondsRaw === 0 ? '00' : secondsRaw.toString().padStart(2, '0')

		return `${minutes}:${seconds}`
	}

	const onSubmit = (values: EmailVerificationSchema) => {
		verificationEmail({ token: values.otp })
	}

	return (
		<FormWrapper
			title='Xác thực tài khoản'
			description='Truy cập email đã đăng ky đế nhận được OTP xác thực tài khoản'
		>
			<Form {...form}>
				<div className='flex flex-col items-center gap-y-3'>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col items-center justify-center space-y-4'
					>
						<FormField
							name='otp'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nhập mã OTP</FormLabel>
									<FormControl>
										<InputOTP
											disabled={isVerificationEmailPending}
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
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							type='submit'
							disabled={isVerificationEmailPending}
							className='w-fit self-center'
						>
							Xác thực tài khoản
						</Button>
					</form>
					<p className='text-xs font-semibold tracking-tight'>
						Mã OTP của bạn sẽ hết hạn sau:{' '}
						<span className='text-primary'>
							{formatTimeCounter(remainTime)}
						</span>
					</p>

					{allowGetNewOTP ? (
						<Button
							variant='ghost'
							size='sm'
							disabled={!allowGetNewOTP}
							onClick={e => {
								e.preventDefault()

								resendOtpAction({ token })
							}}
							className='text-primary disabled:cursor-not-allowed'
						>
							Lấy OTP mới
						</Button>
					) : (
						<p className='text-xs font-semibold text-foreground'>
							Lấy OTP mới sau{' '}
							<span className='text-primary'>
								{formatTimeCounter(cooldown)}
							</span>
						</p>
					)}
				</div>
			</Form>
		</FormWrapper>
	)
}

export default EmailVerificationForm
