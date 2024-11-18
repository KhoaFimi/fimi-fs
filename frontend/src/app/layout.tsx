import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export const metadata: Metadata = {
	title: {
		default: 'FIMI',
		template: '%s | FIMI'
	},
	description: 'FIMI TECH - Giải pháp bán hàng đa kênh'
}

const font = Montserrat({
	subsets: ['latin', 'vietnamese']
})

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={cn(font.className, 'antialiased')}>{children}</body>
		</html>
	)
}

export default RootLayout
