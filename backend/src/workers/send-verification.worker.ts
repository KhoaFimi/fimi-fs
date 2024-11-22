import { Worker } from 'bullmq'

import { queueList } from '@/lib/queue.js'
import { redisConnection } from '@/lib/redis.js'
import { tokenService } from '@/modules/token/services/index.js'
import { newUserMailTemplate } from '@/templates/new-user-mail.template.js'
import { sendMail } from '@/utils/send-mail.js'

export const sendVerificationWorker = new Worker(
	queueList.sendVerificationMailQueue,
	async job => {
		const verificationToken = await tokenService.verificationToken.generate(
			job.data.email
		)

		const template = newUserMailTemplate({
			name: job.data.fullname,
			phone: job.data.phone,
			code: job.data.code,
			token: verificationToken.token
		})

		await sendMail({
			subject: 'FIMI TECH - Thông tin Publisher',
			html: template,
			from: `FIMI <no-reply@fimi.tech>`,
			to: job.data.email
		})
	},
	{ connection: redisConnection }
)
