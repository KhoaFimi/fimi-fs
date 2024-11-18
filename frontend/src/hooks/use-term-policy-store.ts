import { create } from 'zustand'

interface ITermPolicyStore {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useTermPolicyStore = create<ITermPolicyStore>()(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))
