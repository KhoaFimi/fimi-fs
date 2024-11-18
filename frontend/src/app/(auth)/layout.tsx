import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import AuthHeader from '@/features/auth/components/header'
import Policies from '@/features/auth/components/policies'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AuthHeader />
			<div className='mt-44 flex items-center justify-center overflow-y-auto bg-background md:mt-20'>
				<div className='flex w-[420px] items-start gap-x-4 rounded-xl p-2 md:border md:p-8 md:shadow-lg lg:w-[780px]'>
					<div className='hidden h-[600px] w-[360px] flex-col justify-center md:flex'>
						<Image
							src='/quote.svg'
							alt='quote'
							width={360}
							height={224}
						/>
						<Image
							src='/brand.svg'
							alt='brand'
							width={360}
							height={307}
						/>
					</div>
					<div className='w-[420px]'>{children}</div>
				</div>
			</div>
			<Policies />
		</>
	)
}

export default AuthLayout
