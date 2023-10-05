import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const getAllRoomAdmin = async (request) => {
  let room;
  try {
    room = await prisma.chatRoom.findMany({
      where: {
        adminId: request,
      },
    });
  } catch (error) {
    throw error;
  }
  return room;
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
    console.log(find);
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
