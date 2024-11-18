import * as nodemailer from 'nodemailer'

import { mailerConfig } from '@/lib/mailer.js'

export const sendMail = async (options: nodemailer.SendMailOptions) => {
	const mailer = await mailerConfig()

	const res = await mailer.sendMail(options)

	return res
}
