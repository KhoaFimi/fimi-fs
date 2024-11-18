'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DateTimePicker } from '@/components/ui/date-picker'
import FloatingLabelInput from '@/components/ui/floating-label-input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import FormWrapper from '@/features/auth/components/form-wrapper'
import { RegisterSchema, registerSchema } from '@/features/auth/schema/register'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'

const isAdult = (birthDateString: Date): boolean => {
	const birthdate = new Date(birthDateString)

	const today = new Date()

	let age = today.getFullYear() - birthdate.getFullYear()
	const monthDiff = today.getMonth() - birthdate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthdate.getDate())
	) {
		age--
	}

	return age >= 18
}

const RegisterForm = () => {
	const [referralCode, setReferralCode] = useState<string>('')
	const [birthday, setBirthday] = useState<Date | undefined>(undefined)
	const [step, setStep] = useState(1)
	const [missingBirthDate, setMissingBirthDate] = useState<string>('')

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			dateOfBirth: '',
			tnc: false,
			referralCode: ''
		}
	})

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const nextStep = () => {
		if (!birthday) {
			setMissingBirthDate('Vui lòng nhập ngày sinh')
			return
		}

		if (birthday && isAdult(birthday)) {
			setStep(2)
			return
		}

		setStep(3)
	}

	const onSubmit = (values: RegisterSchema) => {
		values.referralCode = referralCode

		console.log(values)
	}

	if (step === 1)
		return (
			<FormWrapper
				title={'Đăng ký mã giới thiệu'}
				description={
					'Bạn nhận được lời giới thiệu từ thành viên của FIMI, hãy nhập mã giới thiệu ngay'
				}
				backButton={{
					label: 'Đăng nhập',
					description: 'Bạn đã có mã giới thiệu',
					href: '/auth/login'
				}}
			>
				<div className='flex w-full flex-col justify-center space-y-6 px-4 pt-8'>
					<FloatingLabelInput
						label='Mã giới thiệu'
						value={referralCode}
						autoCapitalize='on'
						onChange={e => setReferralCode(e.currentTarget.value.toUpperCase())}
					/>
					<div className='flex flex-col gap-2'>
						<DateTimePicker
							value={birthday}
							granularity='day'
							placeholder='Ngày sinh'
							displayFormat={{
								hour24: 'dd/MM/yyyy'
							}}
							onChange={setBirthday}
						/>
						{missingBirthDate.length > 1 && (
							<small className='tracking-tight text-destructive'>
								{missingBirthDate}
							</small>
						)}
					</div>
					<div className='flex items-center gap-x-4'>
						<Button
							variant='ghost'
							disabled={referralCode !== ''}
							onClick={e => {
								e.preventDefault()
								nextStep()
							}}
						>
							Tôi không có mã giới thiệu
						</Button>
						<Button
							onClick={e => {
								e.preventDefault()
								nextStep()
							}}
						>
							Tiếp tục
						</Button>
					</div>
				</div>
			</FormWrapper>
		)

	if (step === 2)
		return (
			<FormWrapper
				title={'Đăng ký mã giới thiệu'}
				description={
					'Chào mừng bạn đến với FIMI, hãy cung cấp một số thông tin cơ bản để có thể đăng ký mã giới thiệu ngay.'
				}
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
											label='Họ và tên'
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

						<Button
							type='submit'
							disabled={!form.getFieldState('tnc').isDirty}
						>
							Đăng ký ngay
						</Button>
					</form>
				</Form>
			</FormWrapper>
		)

	if (step === 3) return <div>Non qualifued</div>

	return null
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
