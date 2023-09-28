import { documentDelete } from "../../repositories/document.js"
import { userDelete } from "../../repositories/user.js"

export default async (request) => {
	const userId = parseInt(request.userId)

	try {
		await userDelete(userId)
		await documentDelete(userId)
	} catch (err) {
		throw err
	}
}