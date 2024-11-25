import dotenv from 'dotenv'
import { cleanEnv, email, host, num, port, str, testOnly } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
	NODE_ENV: str({
		devDefault: testOnly('test'),
		choices: ['development', 'production', 'test']
	}),
	HOST: host({ devDefault: testOnly('localhost') }),
	PORT: port({ devDefault: testOnly(8080) }),
	CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:8080') }),
	COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
	COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
	DATABASE_URL: str(),
	GOOGLE_CLIENT_ID: str(),
	GOOGLE_CLIENT_SECRET: str(),
	GOOGLE_REFRESH_TOKEN: str(),
	ADMIN_EMAIL_ADDRESS: email(),
	ACCESS_TOKEN_EXPIRES: num(),
	REFRESH_TOKEN_EXPIRES: num(),
	REDIS_PORT: port({ devDefault: testOnly(6379) }),
	REDIS_HOST: host({ devDefault: testOnly('127.0.0.1') }),
	FRONTEND_URL: str({ devDefault: testOnly('https://fimi-fs.vercel.app/') })
})
