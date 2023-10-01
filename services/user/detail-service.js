import { detailsUser } from "../../repositories/user.js"

export default async (request) => {
    const userId = parseInt(request.params.userId)
    const auth = request.user
    const user = await detailsUser(userId)

    // validate if user access another data user (login as user)
    if(auth.level == 'user' && user.id !== auth.id) throw new Error("data not found")
    // validate if admin access another data admin or superadmin (login as admin)
    if(auth.level == 'admin' && user.id !== auth.id && (user.level == 'admin' || user.level == 'superadmin')) throw new Error("data not found")

    return user
}