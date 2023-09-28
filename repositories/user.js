import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const userRegister = async (request) => {
  let data;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(request.password, salt);

    data = await prisma.user.create({
      data: {
        email: request.email,
        username: request.username,
        password: hashPassword,
      },
    });
  } catch (err) {
    throw err;
  }

  return data;
};

export const userLogin = async (request) => {
  let data;
  try {
    data = await prisma.user.findFirst({
      where: {
        email: request.email,
      },
    });
  } catch (err) {
    throw err;
  }

  return data;
};
