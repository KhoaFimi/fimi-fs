import { jwtDecode } from 'jwt-decode'

import { ErrorLibrary } from '@/contraints/error-library.constraint'
import { httpClient } from '@/lib/http'

const JWTManager = () => {
	const LOGOUT_EVENT_NAME = 'jwt-logout'

	let inMemoryToken: string | null = null
	let refreshTokenTimeoutId: number | null = null
	let userId: string | undefined = undefined

	const getToken = () => inMemoryToken

	const getUserId = () => userId

	const setToken = (accessToken: string) => {
		inMemoryToken = accessToken

		const decoded = jwtDecode(accessToken)

		userId = decoded.sub
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
			return false
		}

		setToken(resData.data.accessToken)
		return true
	}

	const setRefreshTokenTimeout = (delay: number) => {
		refreshTokenTimeoutId = window.setTimeout(
			getRefreshToken,
			delay * 1000 - 10000
		)
	}

	return { getToken, setToken, getRefreshToken, deleteToken, getUserId }
}

export default JWTManager()
