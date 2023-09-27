import { Prisma } from '@prisma/client'
import registerServices from "../services/user/register-services.js"

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