import { PrismaClient } from "@prisma/client";
import 'dotenv/config'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

export const getUser = async (userId) => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return data;
  } catch (err) {
    throw err;
  }
};

export const detailsUser = async (userId) => {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      document: true,
    },
  });
  delete data["password"];

  return data;
};

export const fetchUser = async (level, skip, take) => {
  const data = await prisma.user.findMany({
    where: {
      level: level,
      is_deleted: false,
    },
    skip: skip,
    take: take,
    select: {
      id: true,
      email: true,
      username: true,
      level: true,
      is_activated: true,
      created_at: true,
      updated_at: true,
    },
  });

  return data;
};

export const userRegister = async (request) => {
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email: request.email,
        username: request.username,
        password: await bcrypt.hash(request.password, 10),
        level: request.level,
        is_activated: request.is_activated
      }
    })
  } catch (err) {
    throw err
  }

  return user
}

export const userUpdate = async (request) => {
  let updatedUser;
  try {
    // Membuat objek kosong untuk menampung data baru
    const data = {};

    // Membuat array dari nama-nama field yang ingin diperbarui
    const fieldsToUpdate = ["email", "username"];

    // Menggunakan forEach untuk memasukkan data dari request body
    fieldsToUpdate.forEach((fieldName) => {
      // Menguji masing-masing field di dalam body untuk dimasukkan ke dalam objek data
      if (request.body[fieldName]) {
        // Use request.body[fieldName] to access the request body
        data[fieldName] = request.body[fieldName];
      }
    });

    updatedUser = await prisma.user.update({
      where: {
        email: request.user.email,
      },
      data: data,
    });
  } catch (error) {
    throw error;
  }
  return updatedUser;
};

export const passChange = async (request) => {
  let data;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(request.body.newPass, salt);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: request.user.email,
      }
    });
    const match = await bcrypt.compare(request.body.currentPass, user.password);
    if (match) {
      data = await prisma.user.update({
        where: {
          email: request.user.email,

        },
        data: {
          password: hashPassword,
        },
      });
    }
  } catch (error) {
    throw error;
  }
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
  try {
      await prisma.user.update({
          where: {
              id: userId
          },
          data: {
              is_activated: true
          }
      })
  } catch (err) {
      throw err.meta.cause
  }
};

export const userDelete = async (userId) => {
  try {
    await prisma.user.update({
      data: {
        is_deleted: true,
      },
      where: {
        id: userId,
      },
    });
  } catch (err) {
    throw err.meta.cause;
  }
};
