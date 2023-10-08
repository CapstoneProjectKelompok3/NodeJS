import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Message } from "../models/message.js";

export const createBackupMessageMongoodb = async (
  room,
  adminId,
  userId,
  message
) => {
  try {
    await Message.create({
      room: room,
      adminId: adminId,
      userId: userId,
      message: message,
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    await prisma.chatRoom.delete({
      where: {
        id: Number(roomId),
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const createRoom = async (userId) => {
  let room;
  try {
    room = await prisma.chatRoom.create({
      data: {
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }

  return room;
};

export const updateRoom = async (idRoom, adminId, name) => {
  try {
    await prisma.chatRoom.update({
      where: {
        id: idRoom,
      },
      data: {
        adminId: adminId,
        name: name,
      },
    });
  } catch (error) {
    throw error;
  }
  return true;
};

export const getAllRoom = async (request) => {
  let room;
  try {
    room = await prisma.chatRoom.findMany();
  } catch (error) {
    throw error;
  }
  return room;
};

export const getRoomAdminUser = async (userId, adminId) => {
  let room;
  try {
    room = await prisma.chatRoom.findFirst({
      where: {
        AND: [{ userId: Number(userId) }, { adminId: Number(adminId) }],
      },
    });
  } catch (error) {
    throw error;
  }
  return room;
};

export const getAllRoomAdmin = async (request) => {
  let room;
  try {
    room = await prisma.chatRoom.findMany({
      where: {
        adminId: request,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw error;
  }
  return room;
};

export const getMessagebyRoom = async (roomId) => {
  let message;
  try {
    message = await prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    throw error;
  }
  return message;
};

export const sendMessage = async (content, roomId, senderId) => {
  let message;
  try {
    message = await prisma.message.create({
      data: {
        content: content,
        roomId: roomId,
        senderId: senderId,
      },
    });
  } catch (error) {
    throw error;
  }
  return message;
};

export const deleteMessage = async (idMessage) => {
  try {
    await prisma.message.delete({
      where: {
        id: Number(idMessage),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getMessage = async (roomId) => {
  let message;
  try {
    message = await prisma.message.findMany({
      where: {
        roomId: Number(roomId),
      },
      select: {
        content: true,
        senderId: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    throw error;
  }
  return message;
};

export const adminCount = async (request) => {
  let find;
  try {
    find = await prisma.user.findFirst({
      where: {
        level: "admin",
        messages: {
          some: {
            senderId: request,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
  return find;
};

export const adminPertama = async (request) => {
  let data;
  try {
    data = await prisma.user.findFirst({
      where: {
        level: "admin",
      },
    });
  } catch (error) {
    throw error;
  }
  return data;
};

export const adminBelumMenerimaMessage = async (request) => {
  let data;
  try {
    data = await prisma.user.findFirst({
      where: {
        level: "admin",
        messages: {
          none: {
            senderId: request,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
  return data;
};

export const getAllAdminId = async (request) => {
  let data;
  try {
    data = await prisma.user.findMany({
      where: {
        level: "admin",
      },
    });
  } catch (error) {
    throw error;
  }
  return data;
};
