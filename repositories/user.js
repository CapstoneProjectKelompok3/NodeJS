import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

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
      }
    })
  } catch (err) {
    throw err
  }

  return user


};

export const userUpdate = async (request) => {
  let updatedUser
  try {
    // Membuat objek kosong untuk menampung data baru
    const data = {};

    // Membuat array dari nama-nama field yang ingin diperbarui
    const fieldsToUpdate = ['email', 'username'];

    // Menggunakan forEach untuk memasukkan data dari request body
    fieldsToUpdate.forEach((fieldName) => {
      // Menguji masing-masing field di dalam body untuk dimasukkan ke dalam objek data
      if (request.body[fieldName]) { // Use request.body[fieldName] to access the request body
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