'use client'

import DialogWrapper from '@/features/auth/components/policies/dialog-wrapper'
import SecurityPolicy from '@/features/auth/components/policies/security-policy'
import TermPolicy from '@/features/auth/components/policies/term-policy'
import UserPolicy from '@/features/auth/components/policies/user-policy'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'

const Policies = () => {
	const { open: openSecurityPolicy, onClose: onCloseSecurityPolicy } =
		useSercurityPolicyStore()
	const { open: openTermPolicy, onClose: onCloseTermPolicy } =
		useTermPolicyStore()
	const { open: openUserPolicy, onClose: onCloseUserPolicy } =
		useUserPolicyStore()

	return (
		<>
			<DialogWrapper
				title='THÔNG BÁO BẢO MẬT'
				open={openSecurityPolicy}
				onOpenChange={onCloseSecurityPolicy}
			>
				<SecurityPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='NỘI DUNG CHÍNH SÁCH VỀ BẢO VỆ DỮ LIỆU CÁ NHÂN CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN ĐỐI VỚI KHÁCH HÀNG'
				open={openUserPolicy}
				onOpenChange={onCloseUserPolicy}
			>
				<UserPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='ĐIỀU KHOẢN SỬ DỤNG'
				open={openTermPolicy}
				onOpenChange={onCloseTermPolicy}
			>
				<TermPolicy />
			</DialogWrapper>
		</>
	)
}

export default Policies
