import { create } from 'zustand'

interface ISercurityPolicyStore {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useSercurityPolicyStore = create<ISercurityPolicyStore>()(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))
