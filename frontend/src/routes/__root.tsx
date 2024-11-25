import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { IAuth } from '@/hooks/use-auth'

interface RouteContext {
	auth: IAuth
}

export const Route = createRootRouteWithContext<RouteContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
})
