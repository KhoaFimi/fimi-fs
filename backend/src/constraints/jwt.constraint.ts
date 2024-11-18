/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as crypto from 'node:crypto'
import * as path from 'node:path'

import * as fs from 'fs'

const checkExistKeyFolder = (name: string) => {
	const checkPath = path.join(process.cwd(), `${name}`)

	!fs.existsSync(checkPath) && fs.mkdir(checkPath, err => err)
}

const basePath = 'secure'

const keyPath = {
	accessTokenPrivate: path.join(
		process.cwd(),
		basePath,
		'access-token-private.key'
	),
	accessTokenPublic: path.join(
		process.cwd(),
		basePath,
		'access-token-public.key'
	),
	refreshTokenPrivate: path.join(
		process.cwd(),
		basePath,
		'refresh-token-private.key'
	),
	refreshTokenPublic: path.join(
		process.cwd(),
		basePath,
		'refresh-token-public.key'
	)
}

const genKey = () => {
	const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem'
		}
	})

	return { privateKey, publicKey }
}

const getAccessTokenKeyPair = () => {
	checkExistKeyFolder('secure')

	const accessTokenPrivateKeyExist = fs.existsSync(keyPath.accessTokenPrivate)
	const accessTokenPublicKeyExist = fs.existsSync(keyPath.accessTokenPublic)

	if (!accessTokenPrivateKeyExist || !accessTokenPublicKeyExist) {
		const { privateKey, publicKey } = genKey()

		fs.writeFileSync(keyPath.accessTokenPrivate, privateKey)
		fs.writeFileSync(keyPath.accessTokenPublic, publicKey)
	}

	const accessTokenPrivateKey = fs.readFileSync(
		keyPath.accessTokenPrivate,
		'utf-8'
	)

	const accessTokenPulicKey = fs.readFileSync(
		keyPath.accessTokenPublic,
		'utf-8'
	)

	return {
		accessTokenPrivateKey,
		accessTokenPulicKey
	}
}

const getRefreshTokenKeyPair = () => {
	checkExistKeyFolder('secure')

	const refreshTokenPrivateKeyExist = fs.existsSync(keyPath.refreshTokenPrivate)
	const refreshTokenPublicKeyExist = fs.existsSync(keyPath.refreshTokenPublic)

	if (!refreshTokenPrivateKeyExist || !refreshTokenPublicKeyExist) {
		const { privateKey, publicKey } = genKey()

		fs.writeFileSync(keyPath.refreshTokenPrivate, privateKey)
		fs.writeFileSync(keyPath.refreshTokenPublic, publicKey)
	}

	const refreshTokenPrivateKey = fs.readFileSync(
		keyPath.refreshTokenPrivate,
		'utf-8'
	)

	const refreshTokenPulicKey = fs.readFileSync(
		keyPath.refreshTokenPublic,
		'utf-8'
	)

	return {
		refreshTokenPrivateKey,
		refreshTokenPulicKey
	}
}

export const { accessTokenPrivateKey, accessTokenPulicKey } =
	getAccessTokenKeyPair()
export const { refreshTokenPrivateKey, refreshTokenPulicKey } =
	getRefreshTokenKeyPair()
