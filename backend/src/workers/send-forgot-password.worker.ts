import { Worker } from 'bullmq'

import { queueList } from '@/lib/queue.js'
import { redisConnection } from '@/lib/redis.js'
import { tokenService } from '@/modules/token/services/index.js'
import { newUserMailTemplate } from '@/templates/new-user-mail.template.js'
import { sendMail } from '@/utils/send-mail.js'

export const sendForgotPasswordWorker = new Worker(
	queueList.sendForgotPasswordMailQueue,
	async job => {
		const forgotPasswordToken = await tokenService.forgotPasswordToken.generate(
			job.data.email
		)

		const template = newUserMailTemplate({
			name: job.data.fullname,
			phone: job.data.phone,
			code: job.data.code,
			token: forgotPasswordToken.token
		})

		await sendMail({
			to: job.data.email,
			subject: 'FIMI TECH - Yêu cầu lấy lại mật khẩu',
			from: `FIMI <no-reply@fimi.tech>`,
			html: template
		})
	},
	{ connection: redisConnection }
)
