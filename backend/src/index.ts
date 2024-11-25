import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { except } from 'hono/combine'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import { accessTokenPulicKey } from '@/constraints/jwt.constraint.js'
import { verifyTokenVersionMiddleware } from '@/middlewares/verify-refresh-token.middleware.js'
import { authRoute } from '@/modules/auth/routes.js'
import { userRoutes } from '@/modules/users/routes.js'
import type { IResponse } from '@/types.js'
import { env } from '@/utils/env.js'
import { httpLogger } from '@/utils/http-logger.js'
import { sendForgotPasswordWorker } from '@/workers/send-forgot-password.worker.js'
import { sendVerificationWorker } from '@/workers/send-verification.worker.js'

const app = new Hono()

app.use(logger(httpLogger))
app.use(
	'*',
	cors({
		origin: [
			'https://fimi-fs.vercel.app',
			'http://localhost:5173',
			'https://fimi-fs.vercel.app/'
		],
		//origin: 'http://localhost:*',
		credentials: true
	})
	//   {
	// 	origin: [
	// 		'http://localhost:5173',
	// 		'http://localhost:4173',
	// 		'https://fimi-fs.vercel.app',
	// 		'http://192.168.22.11:5173',
	// 		'https://tuna-awaited-rat.ngrok-free.app'
	// 	],
	// 	credentials: true
	// }
)

app.use(
	except(
		['/api/auth/*', 'api/public/*'],

		jwt({
			secret: accessTokenPulicKey,
			alg: 'RS256'
		}),
		verifyTokenVersionMiddleware
	)
)

app
	.basePath('/api')
	.route('/auth', authRoute)
	.route('/users', userRoutes)
	.get('/public', c =>
		c.json({
			message: 'local'
		})
	)

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json<IResponse>({
			statusCode: err.status,
			success: false,
			code: err.cause as ErrorLibrary,
			message: err.message.split(',')
		})
	}

	return c.json<IResponse>({
		statusCode: 500,
		success: false,
		code: ErrorLibrary.INTERNAL_SERVER_ERROR,
		message: err.message
	})
})

sendVerificationWorker.on('completed', () =>
	console.log('Task done: Send verification mail')
)
sendForgotPasswordWorker.on('completed', () =>
	console.log('Task done: Send forgot password mail')
)

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port
})
