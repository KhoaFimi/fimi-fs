import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { checkStep1 } from '@/features/auth/actions/check-step1'
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
import {
	RegisterStep1Schema,
	registerStep1Schema
} from '@/features/auth/schemas/register-step1.schema'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'
import { Route } from '@/routes/auth/register'

const RegisterForm = () => {
	const { step } = Route.useSearch()

	return (
		<RegisterFormProvider>
			{step === 1 && <Step1 />}
			{step === 2 && <Step2 />}
			{step === 3 && <Step3 />}
		</RegisterFormProvider>
	)
}

const Step1 = () => {
	const form = useForm<RegisterStep1Schema>({
		resolver: zodResolver(registerStep1Schema),
		defaultValues: {
			dateOfBirth: undefined,
			referralCode: ''
		}
	})

	const navigate = Route.useNavigate()

	const [error, setError] = useState<string | undefined>(undefined)

	const { setState } = useRegisterForm()

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegisterStep1Schema) => await checkStep1(values),
		onSuccess: (data, variables) => {
			if (data.error) {
				setError(data.error)
				return
			}

			if (data.step === 3) {
				navigate({
					search: {
						step: data.step
					}
				})
				return
			}

			setState(state => ({
				...state,
				referralCode: variables.referralCode as string,
				dateOfBirth: variables.dateOfBirth
			}))
			navigate({
				search: {
					step: data.step
				}
			})
		}
	})

	const onSubmit = (values: RegisterStep1Schema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			title='Đăng ký mã giới thiệu'
			description='Bạn nhận được lời giới thiệu từ thành viên của FIMI, hãy nhập mã giới thiệu ngay'
			backButton={{
				label: 'Đằng nhập',
				href: '/auth/login',
				description: 'Bạn đã có mã giới thiệu'
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col justify-center space-y-4 px-4'
				>
					<FormField
						name='referralCode'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FloatingLabelInput
										{...field}
										disabled={isPending}
										onChange={e =>
											field.onChange(e.currentTarget.value.toUpperCase())
										}
										label='Mã người giới thiệu'
									/>
								</FormControl>
								<FormDescription>
									Bỏ qua trường này nếu bạn không có mã người giới thiệu
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						name='dateOfBirth'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<DateTimePicker
										value={field.value}
										granularity='day'
										disabled={isPending}
										onChange={field.onChange}
										placeholder='Ngày sinh'
										displayFormat={{ hour24: 'dd/MM/yyyy' }}
									></DateTimePicker>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormError message={error} />

					<Button
						type='submit'
						disabled={isPending}
						className='gap-x-1.5'
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Tiếp tục
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

const Step2 = () => {
	const { state } = useRegisterForm()

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
			referralCode: ''
		}
	})

	const navigate = Route.useNavigate()

	useEffect(() => {
		form.setValue('dateOfBirth', state.dateOfBirth as Date)
		form.setValue('referralCode', state.referralCode)
	}, [form, state])

	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegisterSchema) => await register(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
			}

			if (data.step === 3) {
				navigate({
					search: {
						step: 3
					}
				})
			}

			if (data.success) {
				setSuccess(data.success)
				navigate({
					to: '/auth/email-verification',
					search: {
						token: data.token
					}
				})
			}
		}
	})

	const onSubmit = (values: RegisterSchema) => {
		mutate(values)
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

const Step3 = () => {
	return (
		<Card className='w-full shadow-none md:border-none md:border-transparent'>
			<CardHeader>
				<CardTitle className='text-center text-2xl uppercase'>
					Chưa đủ điều kiện tham gia
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-4'>
					<div className='flex w-full items-center justify-center p-4'>
						<img
							src='/unqualified.png'
							alt='img'
							width={1000}
							height={1000}
							className='size-52'
						/>
					</div>
					<p className='text-justify text-sm font-semibold tracking-tight'>
						Rất tiếc, bạn chưa đủ điều kiện trở thành Pulisher. Vui lòng đăng ký
						lại khi bạn đủ 18 tuổi.
					</p>
					<Button className='mt-4 text-base font-bold'>
						<Link
							href='https://www.fimi.tech/trang-chu'
							target='_blank'
						>
							Ghé thăm trang chủ của chúng tôi
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
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

// #region: Form context
interface IRegisterFormContext {
	state: {
		dateOfBirth: Date | undefined
		referralCode: string
	}
	setState: Dispatch<
		SetStateAction<{
			dateOfBirth: Date | undefined
			referralCode: string
		}>
	>
}

const RegisterFormContext = createContext<IRegisterFormContext>({
	state: {
		dateOfBirth: undefined,
		referralCode: ''
	},
	setState: () => {}
})

const useRegisterForm = () => useContext(RegisterFormContext)

const RegisterFormProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<{
		dateOfBirth: Date | undefined
		referralCode: string
	}>({
		dateOfBirth: undefined,
		referralCode: ''
	})

	const value = {
		state,
		setState
	}

	return (
		<RegisterFormContext.Provider value={value}>
			{children}
		</RegisterFormContext.Provider>
	)
}
// #endregion

export default RegisterForm
