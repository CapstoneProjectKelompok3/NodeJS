import { fetchUser } from "../../repositories/user.js"

export default async (request) => {
	let skip = 0, take = 5;
	
	const currentPage = parseInt(request.query.page) || 1;

	// filter user data based on their role
	const query = request.user.level === 'admin' ? 'user' : 'admin';

	const users = await fetchUser(query, skip);
	const totalPages = Math.ceil(users.length / take);
	const startIdx = (currentPage - 1) * take;
	const endIdx = startIdx + take;
	const usersToShow = users.slice(startIdx, endIdx);

	return { 
		users: usersToShow,
		pagination: {
			currentPage,
			totalPages,
			hasNextPage: currentPage < totalPages,
		},
	};
}