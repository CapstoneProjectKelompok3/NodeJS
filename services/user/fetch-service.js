import { fetchUser } from "../../repositories/user.js"

export default async (request) => {
	let query;
	let skip = 0, take = 5;
	let page = parseInt(request.query.page)

	if(page && page > 1) skip = (take * page) - take;

	// filter user data based on their role
	(request.user.level == 'admin') ? query = 'user' : query = 'admin';

	const user = await fetchUser(query, skip, take);

	return user;
}