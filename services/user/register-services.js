import { documentRegister } from "../../repositories/document.js"
import { userRegister } from "../../repositories/user.js"

export default async (request) => {

    try {
        let user  = await userRegister(request)
        await documentRegister(request, user.id)
    } catch (err) {
        return err
    }

    return true

}