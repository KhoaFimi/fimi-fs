import { createFileRoute, Link } from '@tanstack/react-router'
import { QRCodeCanvas } from 'qrcode.react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import LogoutButton from '@/features/auth/components/form/logout-button'
import JWTManager from '@/lib/jwt'

export const Route = createFileRoute('/_authenticated/dashboard')({
	component: RouteComponent
})

function RouteComponent() {
	const userId = JWTManager.getUserId()
	const userRole = JWTManager.getUserRole()
	const qrRef = useRef<HTMLCanvasElement>(null)

	const inviteLink = `${import.meta.env.DOMAIN ?? 'http://localhost:5173'}/auth/invite?data=${btoa(userId as string)}`

	const onDownload = () => {
		const canvas = qrRef.current

		if (!canvas) return

		const pngUrl = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream')

		const downloadLink = document.createElement('a')

		downloadLink.href = pngUrl
		downloadLink.download = 'fimi-invite.png'
		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
	}

	return (
		<div className='space-y-4'>
			<Link to='/auth/login'>Login</Link>

			<p>userId: {userId}</p>
			<p>userRole: {userRole}</p>
			<LogoutButton />
			<QRCodeCanvas
				id='qr-code'
				ref={qrRef}
				value={inviteLink}
			/>
			<Button onClick={onDownload}>Download ma gioi thieu</Button>
			<p>{inviteLink}</p>
		</div>
	)
}
