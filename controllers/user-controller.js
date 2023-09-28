import { Prisma } from '@prisma/client'
import registerServices from "../services/user/register-services.js"
import verifyServices from '../services/user/verify-services.js'

export const userRegister = async (req, res) => {

    const user = await registerServices(req.body)

    if(user instanceof Prisma.PrismaClientKnownRequestError) return res.status(400).json({
        status_code: 400,
        result: 'bad request',
        error: {
            path: user.meta.target,
            message: user.message
        }
    })

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'record has been created'
    })


}

export const verifyUser = async (req, res) => {

    try {
        await verifyServices(req.user)
    } catch (err) {
        return res.status(err.code).json({
            status_code: err.code,
            result: err.result,
            message: err.message
        })
    }

    return res.json({
        status_code: 200,
        result: 'success',
        message: 'user has been activated'
    })

}