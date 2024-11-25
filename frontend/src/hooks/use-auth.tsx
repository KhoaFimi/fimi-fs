import { create } from 'zustand'

import JWTManager from '@/lib/jwt'

export interface IAuth {
	isAuth: boolean
	setIsAuth: (value: boolean) => void
	user: any
	setUser: (user: any) => void
	checkAuth: () => Promise<boolean>
	logoutClient: () => void
}

export const useAuth = create<IAuth>()(set => ({
	isAuth: false,
	setIsAuth: value => set(state => ({ ...state, isAuth: value })),
	user: {},
	setUser: user => set(state => ({ ...state, user })),
	checkAuth: async () => {
		const token = JWTManager.getToken()

		if (!token) {
			const res = await JWTManager.getRefreshToken()

			if (res.success) {
				set(state => ({ ...state, isAuth: true, user: res.user }))
				return true
			}

			set(state => ({ ...state, isAuth: false, user: {} }))
			return false
		}

		set(state => ({ ...state, isAuth: true }))
		return true
	},
	logoutClient: () => {
		JWTManager.deleteToken()
		return set(state => ({ ...state, isAuth: false }))
	}
}))
