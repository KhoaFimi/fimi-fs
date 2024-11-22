import { createRouter, RouterProvider } from '@tanstack/react-router'

import { useAuth } from '@/hooks/use-auth'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({
	routeTree,

	context: {
		auth: undefined!
	}
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const App = () => {
	const auth = useAuth()

	return (
		<RouterProvider
			router={router}
			context={{ auth }}
		/>
	)
}

export default App
