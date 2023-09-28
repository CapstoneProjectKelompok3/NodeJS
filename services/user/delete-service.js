import { documentDelete } from "../../repositories/document.js"
import { getUser, userDelete } from "../../repositories/user.js"

export default async (request) => {
	const userId = parseInt(request.params.userId)
	const user = await getUser(userId)
	if(!user) throw "data user not found"

	// validate if admin trying to delete another data admin or superadmin
	if(request.user.level == "admin" && (user.level == "admin" || user.level == "superadmin")) {
		throw "data user not found"
	}

	try {
		await userDelete(userId)
		await documentDelete(userId)
	} catch (err) {
		throw err
	}
}