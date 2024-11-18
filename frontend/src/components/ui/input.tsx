'use client'

import * as React from 'react'

import { useVisiblePassword } from '@/hooks/use-visible-password'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		const { showPassword, VisiblePasswordButton } = useVisiblePassword()

		return (
			<div className='relative'>
				<input
					type={type === 'password' ? (showPassword ? 'text' : type) : type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						className
					)}
					ref={ref}
					{...props}
				/>
				{type === 'password' && (
					<div className='absolute right-2 top-1/2 -translate-y-1/2'>
						<VisiblePasswordButton />
					</div>
				)}
			</div>
		)
	}
)
Input.displayName = 'Input'

export { Input }