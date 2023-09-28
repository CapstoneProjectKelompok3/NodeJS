import { userUpdate } from "../../repositories/user"

export default async (user) => {

    if(user.level === 'user') {
        const error = new Error("you don't have any permission to access this route")

        error.code = 401,
        error.result = 'unauthorized'
        throw error
    }

    let updateUser

    try {
        updateUser = await userUpdate(user)
    } catch (err) {
        const error = new Error(err.message)
        
        error.code = 500,
        error.result = 'internal server error'
        throw error
    }

    return updateUser

} 