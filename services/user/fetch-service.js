import { fetchUser } from "../../repositories/user.js"

export default async (request) => {
	let query

	console.log(request.user);
	// filter user data based on their role
	(request.user.level == 'admin') ? query = 'user' : query = 'admin'

	const user = await fetchUser(query)

	return user
}