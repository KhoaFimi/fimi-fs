import { create } from 'zustand'

interface IUserPolicyStore {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useUserPolicyStore = create<IUserPolicyStore>()(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))
