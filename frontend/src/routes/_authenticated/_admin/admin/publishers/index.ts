import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
	'/_authenticated/_admin/admin/publishers/'
)({
	component: RouteComponent
})

function RouteComponent() {
	return 'Hello /_authenticated/_admin/admin/publishers/!'
}
