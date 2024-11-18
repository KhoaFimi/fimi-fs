import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

type FormWrapperProps = PropsWithChildren<{
	title: string
	description?: string
	backButton?: {
		label: string
		href: string
		description: string
	}
}>

const FormWrapper: FC<FormWrapperProps> = ({
	children,
	title,
	description,
	backButton
}) => {
	return (
		<div className='flex flex-col gap-y-6'>
			<div className='flex flex-col gap-y-2'>
				<h2 className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-center text-xl font-bold uppercase tracking-tight text-transparent'>
					{title}
				</h2>
				<p className='px-2 text-center text-xs font-semibold tracking-tight text-foreground/50'>
					{description}
				</p>
			</div>
			<div className='flex flex-1 items-center justify-center'>{children}</div>

			{backButton ? (
				<div className='flex items-center gap-x-1.5 px-4 text-xs font-semibold tracking-tight'>
					<p>{backButton.description}</p>
					<Link
						className='text-primary transition-all duration-200 ease-out hover:underline'
						href={backButton.href}
					>
						{backButton.label}
					</Link>
				</div>
			) : null}
		</div>
	)
}

export default FormWrapper
