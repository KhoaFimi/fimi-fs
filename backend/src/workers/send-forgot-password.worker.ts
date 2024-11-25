import { Worker } from 'bullmq'

import { queueList } from '@/lib/queue.js'
import { redisConnection } from '@/lib/redis.js'
import { tokenService } from '@/modules/token/services/index.js'
import { env } from '@/utils/env.js'
import { sendMail } from '@/utils/send-mail.js'

export const sendForgotPasswordWorker = new Worker(
	queueList.sendForgotPasswordMailQueue,
	async job => {
		const forgotPasswordToken = await tokenService.forgotPasswordToken.generate(
			job.data.email
		)

		await sendMail({
			to: job.data.email,
			subject: 'FIMI TECH - Yêu cầu lấy lại mật khẩu',
			from: `FIMI <no-reply@fimi.tech>`,
			html: `<a href='${env.FRONTEND_URL}/auth/reset-password?token=${forgotPasswordToken.token}'>Lấy lại mật khẩu</a>`
		})
	},
	{ connection: redisConnection }
)
