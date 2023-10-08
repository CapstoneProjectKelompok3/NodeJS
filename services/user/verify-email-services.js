import cache from "../../config/cache.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { emailVerify } from "../../repositories/user.js"

class customError extends Error {
	constructor(message, code, result){
		super()
		this.message = message
		this.code = code,
		this.result = result
	}
}

export default async (params) => {
	if(!params) throw new customError('Key params does not provided', 400, 'bad request')

	const tempCache = cache.get(params)
	cache.del(params)
	let decoded

	try {
		decoded = jwt.verify(tempCache, process.env.TOKEN_SECRET)
		await emailVerify(decoded.id)
	} catch (err) {
		if(err instanceof jwt.JsonWebTokenError) {
			throw new customError("Invalid key or key already expired", 403, "forbidden")
		}
	}
}