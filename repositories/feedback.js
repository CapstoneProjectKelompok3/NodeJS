import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createFeedback = async (request) => {
  try {
    await prisma.feedback.create({
      data: {
        user_id: Number(request.params.userId),
        content: request.body.content,
        rating: request.body.rating,
        emergencies_id: Number(request.body.emergencies_id),
      },
    });
  } catch (error) {
    throw error;
  }
  return true;
};
