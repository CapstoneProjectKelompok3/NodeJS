import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { userRegister } from '../../repositories/user.js'
import { documentRegister } from '../../repositories/document.js'
import { sendRegisterMail } from '../../repositories/mail.js'
import cache from '../../config/cache.js'

export default async (request) => {
    if(request.level === 'admin') request.is_activated = true

    try {
        let user = await userRegister(request)
        await documentRegister(request, user.id)

        // decoded user data
        const payload=  {
            id: user.id
        }
        const decoded = jwt.sign(payload, process.env.TOKEN_SECRET)

        // create a cache
        const uuid = uuidv4()
        cache.set(uuid, decoded, 30 * 60) // cache expired in 30 minutes

        sendRegisterMail(user.email, uuid)
    } catch (err) {
        return err
    }

    return true
}