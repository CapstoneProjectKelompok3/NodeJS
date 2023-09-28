import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getUser = async (userId) => {
  let data = await prisma.user.findFirst({
    where: {
      id: userId
    }
  })
  
  return data
}

export const userRegister = async (request) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(request.password, salt);

  let user

  try {
    user = await prisma.user.create({
      data: {
        email: request.email,
        username: request.username,
        password: hashPassword,
        level: request.level
      }
    })
  } catch (err) {
    throw err
  }

  return user
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


export const userVerify = async (userId) => {
  let user

  try {
      user = await prisma.user.update({
          where: {
              id: userId
          },
          data: {
              is_activated: true
          }
      })
  } catch (err) {
      throw err
  }
}

export const userDelete = async (userId) => {
  try {
    await prisma.user.update({
      data: {
        is_deleted: true
      },
      where: {
        id: userId
      }
    })
  } catch (err) {
    throw err.meta.cause
  }
}