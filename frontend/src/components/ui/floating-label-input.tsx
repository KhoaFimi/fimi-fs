'use client'

import { ComponentProps, forwardRef, useId } from 'react'

import { useVisiblePassword } from '@/hooks/use-visible-password'
import { cn } from '@/lib/utils'

interface FloatingLabelInputProps extends ComponentProps<'input'> {
	label: string
}

const FloatingLabelInput = forwardRef<
	HTMLInputElement,
	FloatingLabelInputProps
>(({ className, type, label, ...props }, ref) => {
	const id = useId()

	const { showPassword, VisiblePasswordButton } = useVisiblePassword()

	return (
		<div className='relative z-0'>
			<input
				type={type === 'password' ? (showPassword ? 'text' : type) : type}
				id={id}
				className={cn(
					'peer block w-full appearance-none border-0 border-b-2 border-primary bg-transparent px-0 py-2.5 text-sm font-semibold text-foreground/70 caret-primary',
					'focus:border-primary focus:outline-none focus:ring-0'
				)}
				placeholder=' '
				ref={ref}
				{...props}
			/>
			<label
				htmlFor={id}
				className={cn(
					'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-semibold text-foreground/50 duration-300',
					'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
					'peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:tracking-tight peer-focus:text-primary',
					'rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
				)}
			>
				{label}
			</label>
			{type === 'password' && (
				<div className='absolute right-2 top-1/2 -translate-y-1/2'>
					<VisiblePasswordButton />
				</div>
			)}
		</div>
	)
})

FloatingLabelInput.displayName = 'FloatingLabelInput'

export default FloatingLabelInput
