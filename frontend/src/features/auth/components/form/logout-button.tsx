import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/actions/logout'
import { useAuth } from '@/hooks/use-auth'

const LogoutButton = () => {
	const { setIsAuth, logoutClient, setUser } = useAuth()

	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationFn: async () => await logout(),
		onSuccess: data => {
			if (data.error) {
				alert(data.error)
				return
			}

			if (data.success) {
				setIsAuth(false)
				logoutClient()
				setUser({})

				router.invalidate()
			}
		}
	})

	return (
		<Button
			onClick={() => mutate()}
			disabled={isPending}
		>
			Đăng xuất
		</Button>
	)
}

export default LogoutButton
