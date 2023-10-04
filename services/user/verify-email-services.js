import cache from "../../config/cache.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { emailVerify } from "../../repositories/user.js"

export default async (params) => {
	if(!params) throw new Error("Key params does not provided")

	const tempCache = cache.get(params)
	cache.del(params)
	let decoded

	try {
		decoded = jwt.verify(tempCache, process.env.TOKEN_SECRET)
		await emailVerify(decoded.id)
	} catch (err) {
		if(err instanceof jwt.JsonWebTokenError) throw new Error("Invalid key or key already expired")
		else throw new Error(err)
	}
}