import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const documentRegister = async (request, userId) => {
	try {
		await prisma.document.create({
			data: {
				user_id: userId,
				nik: request.nik
			}
		})
	} catch (err) {
		throw err
	}
}

export const documentDelete = async (userId) => {
	try {
		await prisma.document.update({
			data: {
				is_deleted: true
			},
			where: {
				user_id: userId
			}
		})
	} catch (err) {
		throw err.meta.cause
	}
}