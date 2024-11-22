import { Worker } from 'bullmq'

import { queueList } from '@/lib/queue.js'
import { redisConnection } from '@/lib/redis.js'
import { tokenService } from '@/modules/token/services/index.js'
import { env } from '@/utils/env.js'
import { sendMail } from '@/utils/send-mail.js'

export const sendVerificationWorker = new Worker(
	queueList.sendVerificationMailQueue,
	async job => {
		const verificationToken = await tokenService.verificationToken.generate(
			job.data.email
		)

		const url = `${env.FRONTEND_URL}/auth/email-verification?token=${verificationToken.token}`

		// const template = newUserMailTemplate({
		// 	name: job.data.fullname,
		// 	phone: job.data.phone,
		// 	code: job.data.code,
		// 	token: verificationToken.token
		// })

		await sendMail({
			subject: 'FIMI TECH - Thông tin Publisher',
			html: `<a href="${url}">Xác thực tài khoản</a>`,
			from: `FIMI <no-reply@fimi.tech>`,
			to: job.data.email
		})
	},
	{ connection: redisConnection }
)
