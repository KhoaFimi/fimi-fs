import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

import { cn } from '@/lib/utils'

export const useVisiblePassword = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const VisiblePasswordButton = () => (
		<button
			className={cn('transition-all duration-150 ease-out')}
			onClick={e => {
				e.preventDefault()
				setShowPassword(!showPassword)
			}}
		>
			{showPassword ? (
				<LuEyeOff className='size-5 text-foreground/50 hover:text-foreground active:scale-105' />
			) : (
				<LuEye className='size-5 text-foreground/50 hover:text-foreground active:scale-105' />
			)}
		</button>
	)

	return { showPassword, VisiblePasswordButton }
}
