import { FC, PropsWithChildren } from 'react'

import AuthHeader from '@/features/auth/components/auth-header'
import Policies from '@/features/auth/components/policies'

const AuthPageWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AuthHeader />
			<main className='mt-20 flex items-center justify-center overflow-y-auto bg-background'>
				<div className='flex w-[420px] items-start gap-x-4 rounded-xl p-2 md:border md:p-8 md:shadow-lg lg:w-[780px]'>
					<div className='hidden w-[360px] flex-col justify-center md:flex'>
						<img
							src='/quote.svg'
							alt='quote'
							width={360}
							height={224}
						/>
						<img
							src='/brand.svg'
							alt='brand'
							width={360}
							height={307}
						/>
					</div>
					<div className='flex w-[420px]'>{children}</div>
				</div>
			</main>
			<Policies />
		</>
	)
}

export default AuthPageWrapper
