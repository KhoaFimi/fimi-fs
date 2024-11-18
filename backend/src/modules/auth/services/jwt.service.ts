import type { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'
import { type JWTPayload, JwtTokenExpired } from 'hono/utils/jwt/types'

import { ErrorLibrary } from '@/constraints/error-library.constraint.js'
import {
	accessTokenPrivateKey,
	refreshTokenPrivateKey,
	refreshTokenPulicKey
} from '@/constraints/jwt.constraint.js'
import { parseUser } from '@/modules/users/helper.js'
import { usersService } from '@/modules/users/services/index.js'
import { env } from '@/utils/env.js'

export interface IAccessTokenPayload extends JWTPayload {
	sub: string
	code: string
	role: string
	version: number
}

interface IRefreshTokenPayload extends JWTPayload {
	sub: string
}

export const jwt = {
	generateAccessToken: async (payload: IAccessTokenPayload) => {
		const now = Math.floor(Date.now() / 1000)

		const accessToken = await sign(
			{
				sub: payload.sub,
				code: payload.code,
				role: payload.role,
				iat: now,
				version: payload.version,
				exp: Math.floor(Date.now() / 1000) + env.ACCESS_TOKEN_EXPIRES
			},
			accessTokenPrivateKey,
			'RS256'
		)

		return accessToken
	},
	genrateRefreshToken: async (payload: IRefreshTokenPayload) => {
		const now = Math.floor(Date.now() / 1000)

		const refreshToken = await sign(
			{
				sub: payload.sub,
				iat: now,
				exp: Math.floor(Date.now() / 1000) + env.REFRESH_TOKEN_EXPIRES
			},
			refreshTokenPrivateKey,
			'RS256'
		)

		return refreshToken
	},
	refreshToken: async (c: Context) => {
		const refreshToken = getCookie(c, 'refresh-token')

		if (!refreshToken)
			throw new HTTPException(401, {
				message: 'Missing token',
				cause: ErrorLibrary.UNAUTHORIZED
			})

		try {
			const verifyToken = (await verify(
				refreshToken,
				refreshTokenPulicKey,
				'RS256'
			)) as IRefreshTokenPayload

			const existingUser = await usersService.findByUnique({
				where: {
					id: verifyToken.sub
				}
			})

			const newAccessToken = await jwt.generateAccessToken({
				sub: existingUser.id,
				code: existingUser.code,
				role: existingUser.role,
				version: existingUser.version
			})

			const newRefreshToken = await jwt.genrateRefreshToken({
				sub: existingUser.id
			})

			setCookie(c, 'refresh-token', newRefreshToken, {
				httpOnly: true,
				sameSite: 'Lax',
				secure: true
			})

			return {
				user: parseUser(existingUser),
				accessToken: newAccessToken
			}
		} catch (error) {
			if (error instanceof JwtTokenExpired)
				throw new HTTPException(401, {
					message: error.message,
					cause: ErrorLibrary.UNAUTHORIZED
				})
		}
	}
}