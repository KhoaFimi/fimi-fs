/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useState
} from 'react'

import JWTManager from '@/lib/jwt'

export interface IAuthContext {
	isAuth: boolean
	setIsAuth: Dispatch<SetStateAction<boolean>>
	user: any
	setUser: Dispatch<any>
	checkAuth: () => Promise<boolean>
	logoutClient: () => void
}

const defaultIsAuth = false

export const AuthContext = createContext<IAuthContext>({
	isAuth: defaultIsAuth,
	setIsAuth: () => {},
	user: {},
	setUser: () => {},
	checkAuth: () => Promise.resolve(false),
	logoutClient: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState<boolean>(defaultIsAuth)
	const [user, setUser] = useState<any>({})

	const checkAuth = useCallback(async () => {
		const token = JWTManager.getToken()

		console.log(token)

		if (token) {
			setIsAuth(true)
			return true
		} else {
			const success = await JWTManager.getRefreshToken()

			if (success) {
				setIsAuth(true)
				return true
			}

			return false
		}
	}, [])

	const logoutClient = () => {
		JWTManager.deleteToken()
		setIsAuth(false)
	}

	const value = {
		isAuth,
		setIsAuth,
		user,
		setUser,
		checkAuth,
		logoutClient
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
