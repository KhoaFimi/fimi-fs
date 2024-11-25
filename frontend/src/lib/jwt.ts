import { jwtDecode, JwtPayload } from 'jwt-decode'

import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { httpClient } from '@/lib/http'

const JWTManager = () => {
	const LOGOUT_EVENT_NAME = 'jwt-logout'

	let inMemoryToken: string | null = null
	let refreshTokenTimeoutId: number | null = null
	let userId: string | undefined = undefined
	let userRole: string | undefined = undefined

	const getToken = () => inMemoryToken

	const getUserId = () => userId

	const getUserRole = () => userRole

	const setToken = (accessToken: string) => {
		inMemoryToken = accessToken

		const decoded = jwtDecode<JwtPayload & { role: string }>(accessToken)

		userId = decoded.sub
		userRole = decoded.role
		setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number))

		return true
	}

	const abortRefreshToken = () => {
		if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId)
	}

	const deleteToken = () => {
		inMemoryToken = null
		abortRefreshToken()
		window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString())
		return true
	}

	window.addEventListener('storage', event => {
		if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null
	})

	const getRefreshToken = async () => {
		const { data: resData } = await httpClient.get('/auth/refresh-token')

		if (
			resData.code === ErrorLibrary.UNAUTHORIZED ||
			resData.code === ErrorLibrary.NOT_FOUND
		) {
			deleteToken()
			return {
				success: false
			}
		}

		setToken(resData.data.accessToken)
		return {
			success: true,
			user: resData.data.user
		}
	}

	const setRefreshTokenTimeout = (delay: number) => {
		refreshTokenTimeoutId = window.setTimeout(
			getRefreshToken,
			delay * 1000 - 10000
		)
	}

	return {
		getToken,
		setToken,
		getRefreshToken,
		deleteToken,
		getUserId,
		getUserRole
	}
}

export default JWTManager()
