import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'

const AdminSidebar = () => {
	const { user } = useAuth()

	return (
		<Sidebar className='border-primary bg-white'>
			<SidebarHeader className='flex items-center justify-center border-b bg-primary shadow-sm'>
				<img
					src='/logo-negative.png'
					width={2454}
					height={1066}
					alt='logo'
					className='w-24'
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter className='p-2'>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className='cursor-pointer rounded-md bg-foreground/20 p-2 hover:bg-foreground/30 focus:outline focus:ring-0'>
									<Avatar>
										<AvatarFallback className='bg-primary text-white'>
											K
										</AvatarFallback>
									</Avatar>
									<div className='flex flex-col'>
										<p className='text-sm font-semibold'>{user['fullname']}</p>
										<p className='text-xs'>{user['email']}</p>
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								className='w-[--radix-popper-anchor-width]'
							>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}

const AdminSidebarTrigger = () => {
	const { open } = useSidebar()

	return (
		<SidebarTrigger className='size-8 rounded-l-none rounded-t-none border bg-background p-1 text-base text-white shadow-sm transition hover:text-white'>
			{open ? (
				<ChevronLeft className='size-7' />
			) : (
				<ChevronRight className='size-7' />
			)}
		</SidebarTrigger>
	)
}

const AdminPage = () => {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<AdminSidebarTrigger />
			<main className='w-full'>
				<Outlet />
			</main>
		</SidebarProvider>
	)
}

export const Route = createFileRoute('/_authenticated/_admin')({
	component: AdminPage
})
