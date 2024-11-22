import { FaPhoneAlt } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

const AuthHeader = () => {
	return (
		<header className='fixed inset-x-0 top-0 z-50 flex w-full justify-center bg-background'>
			<div className='container flex items-center justify-between px-2 py-2 md:px-40 lg:px-60'>
				<img
					src='/logo.png'
					width={2454}
					height={1066}
					alt='logo'
					className='w-24'
				/>
				<Button
					size='lg'
					className='gap-2 px-4 text-base font-semibold'
				>
					<FaPhoneAlt className='size-6' />
					<p className='hidden md:block'>Liên hệ hỗ trợ</p>
				</Button>
			</div>
		</header>
	)
}

export default AuthHeader
