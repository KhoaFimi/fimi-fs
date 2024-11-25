import { createFileRoute, Link } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { ChevronRight } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import AuthPageWrapper from '@/features/auth/components/auth-page-wrapper'
import RegisterForm from '@/features/auth/components/form/register-form'
import { useRegisterSuccess } from '@/hooks/use-register-success'

const searchParams = z.object({
	data: z.string().optional()
})

const RegisterPage = () => {
	const { email, onClose, open } = useRegisterSuccess()

	return (
		<>
			<AuthPageWrapper>
				<RegisterForm />
			</AuthPageWrapper>
			<Dialog
				open={open}
				onOpenChange={onClose}
			>
				<DialogContent className='select-none rounded-xl border-none bg-primary px-3 py-3 text-white'>
					<DialogHeader>
						<DialogTitle className='text-center text-xl font-bold uppercase tracking-tight'>
							Đăng ký thành công
						</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col gap-2 rounded-lg bg-white p-4 text-sm text-foreground'>
						<p className='text-base font-bold leading-10'>
							Chúc mừng bạn đã đăng ký mã giới thiệu thành công.
						</p>
						<p className='font-semibold'>
							Hãy truy cập email <span className='text-primary'>{email}</span>{' '}
							để xác thực tài khoản ngay.
						</p>
						<ul>
							<li className='flex items-center gap-x-1 text-xs font-semibold'>
								<ChevronRight className='size-4' />
								<p className='leading-none'>Nhận thông báo mới nhất từ FIMI</p>
								<Button
									asChild
									variant='link'
									size='sm'
									className='px-0 font-semibold leading-none'
								>
									<Link href='https://zalo.me/g/zlheub504'>Tại đây</Link>
								</Button>
							</li>
							<li className='flex items-center gap-x-1 text-xs font-semibold'>
								<ChevronRight className='size-4' />
								<p className='leading-none'>Liên hệ với admin qua Zalo OA</p>
								<Button
									asChild
									variant='link'
									size='sm'
									className='px-0 font-semibold leading-none'
								>
									<Link href='https://zalo.me/3387059207338415317'>
										Tại đây
									</Link>
								</Button>
							</li>
							<li className='flex items-center gap-x-1 text-xs font-semibold'>
								<ChevronRight className='size-4' />
								<p className='leading-none'>
									Hãy hoàn tất hợp đồng dịch vụ trước để nhận hoa hồng giới
									thiệu phát sinh nhé.
								</p>
							</li>
						</ul>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export const Route = createFileRoute('/auth/register/')({
	component: RegisterPage,
	validateSearch: zodValidator(searchParams)
})
