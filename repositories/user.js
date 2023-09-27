import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userRegister = async (request) => {

    let data

    try {
        data = await prisma.user.create({
            data: {
                email: request.email,
                username: request.username,
                password: request.password,
            }
        })
    } catch (err) {
         throw err
    }

    return data

}