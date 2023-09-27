import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const documentRegister = async (request, userId) => {

    let data

    try {
        data = await prisma.document.create({
            data: {
                user_id: userId,
                nik: request.nik
            }
        })
    } catch (err) {
        throw err
    }

    return data

}