import 'winston-daily-rotate-file'

import * as path from 'path'
import * as winston from 'winston'

import { env } from '@/utils/env.js'

const levels: Record<string, number> = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
	http: 4,
	verbose: 5,
	input: 6,
	silly: 7,
	data: 8,
	help: 9,
	prompt: 10,
	emerg: 11,
	alert: 12,
	crit: 13,
	notice: 14
}

const colors: Record<string, string> = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	debug: 'blue',
	http: 'magenta',
	verbose: 'cyan',
	input: 'grey',
	silly: 'magenta',
	data: 'white',
	help: 'cyan',
	prompt: 'grey',
	emerg: 'red',
	alert: 'yellow',
	crit: 'red',
	notice: 'blue'
}

const logDir = path.join(process.cwd(), 'logs')

export const loggerConfig = () => {
	const formatFile = winston.format.uncolorize()

	const config = winston.createLogger({
		level: 'notice',
		levels,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize({ all: true, colors }),
			winston.format.printf(
				({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
			)
		),
		transports: [
			new winston.transports.Console({
				level: 'data',
				silent: env.isProduction
			}),
			new winston.transports.DailyRotateFile({
				level: 'http',
				filename: 'http-%DATE%.log',
				dirname: path.join(logDir, 'http'),
				format: formatFile,
				zippedArchive: true,
				datePattern: 'YYYY-MM-DD',
				maxFiles: '20d',
				maxSize: '30m'
			}),
			new winston.transports.DailyRotateFile({
				level: 'error',
				filename: 'error-%DATE%.log',
				dirname: path.join(logDir, 'error'),
				format: formatFile,
				zippedArchive: true,
				datePattern: 'YYYY-MM-DD',
				maxFiles: '20d',
				maxSize: '30m'
			})
		]
	})

	return config
}

export const logger = loggerConfig()
