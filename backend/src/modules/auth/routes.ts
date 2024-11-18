import { Hono } from 'hono'

import { authController } from '@/modules/auth/controllers/index.js'

export const authRoute = new Hono()
	.post('/sign-up', ...authController.signUp)
	.get('/new-verification', ...authController.newVerification)
	.post('/sign-in', ...authController.signIn)
	.patch('/sign-out', ...authController.signOut)
	.get('/refresh-token', ...authController.refreshToken)
	.post('/forgot-password', ...authController.forgotPassword)
	.post('/reset-password', ...authController.resetPassword)
