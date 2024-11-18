import { createFactory } from 'hono/factory'
import type { JwtVariables } from 'hono/jwt'

import type { IAccessTokenPayload } from '@/modules/auth/services/jwt.service.js'

type Env = {
	Variables: JwtVariables<IAccessTokenPayload>
}

export const factory = createFactory<Env>()
