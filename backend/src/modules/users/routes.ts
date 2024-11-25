import { Hono } from 'hono'

import { usersController } from '@/modules/users/controllers/index.js'

export const userRoutes = new Hono()
	.post('/change-password', ...usersController.changePassword)
	.get('/publishers', ...usersController.getPublishers)
