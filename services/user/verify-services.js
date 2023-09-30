import { userVerify } from "../../repositories/user.js"

export default async (request) => {

    let updateUser
    let params = parseInt(request.userId)

    try {
        updateUser = await userVerify(params)
    } catch (err) {
        const error = new Error(err)
        
        error.code = 500,
        error.result = 'internal server error'
        throw error
    }

    return updateUser

} 