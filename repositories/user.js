import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userRegister = async (request) => {

    let user

    try {
        user = await prisma.user.create({
            data: {
                email: request.email,
                username: request.username,
                password: request.password,
            }
        })
    } catch (err) {
         throw err
    }

    return user

}

export const userVerify = async (request) => {

    let user

    try {
        user = await prisma.user.update({
            where: {
                email: request.email
            },
            data: {
                is_activated: true
            }
        })
    } catch (err) {
        throw err
    }

    return user

}