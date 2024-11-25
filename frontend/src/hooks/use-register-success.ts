import { create } from 'zustand'

interface IRegisterSuccess {
	email: string
	setEmail: (email: string) => void
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useRegisterSuccess = create<IRegisterSuccess>()(set => ({
	email: '',
	setEmail: email => set(state => ({ ...state, email })),
	open: false,
	onOpen: () => set(state => ({ ...state, open: true })),
	onClose: () => set(state => ({ ...state, open: false }))
}))
