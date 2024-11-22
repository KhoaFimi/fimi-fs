import { TriangleAlert } from 'lucide-react'
import { FC } from 'react'
import { LuBan, LuCheckCircle } from 'react-icons/lu'

interface FormResponseProps {
	message?: string
}

export const FormSuccess: FC<FormResponseProps> = ({ message }) => {
	if (!message) return null

	return (
		<div className='flex items-center gap-x-1.5 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500'>
			<LuCheckCircle className='size-4' />
			<p className='tracking-tight'>{message}</p>
		</div>
	)
}

export const FormError: FC<FormResponseProps> = ({ message }) => {
	if (!message) return null

	return (
		<div className='flex items-center gap-x-1.5 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
			<LuBan className='size-4' />
			<p className='tracking-tight'>{message}</p>
		</div>
	)
}

export const FormWarning: FC<FormResponseProps> = ({ message }) => {
	if (!message) return null

	return (
		<div className='flex items-center gap-x-1.5 rounded-md bg-orange-500/15 p-3 text-sm text-orange-500'>
			<TriangleAlert className='size-4' />
			<p className='tracking-tight'>{message}</p>
		</div>
	)
}
