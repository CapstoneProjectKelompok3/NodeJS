import {
  createBackupMessageMongoodb,
  deleteMessage,
  deleteRoom,
  getMessagebyRoom,
  getRoomAdminUser,
} from "../../repositories/message.js";

export default async (request) => {
  try {
    let room = await getRoomAdminUser(
      request.body.userId,
      request.body.adminId
    );
    let message = await getMessagebyRoom(room.id);
    let messages = [];
    message.map((item) => {
      messages.push({ sender: item.senderId, message: item.content });
    });
    await createBackupMessageMongoodb(
      room.name,
      room.userId.toString(),
      room.adminId.toString(),
      messages
    );

    await Promise.all(
      message.map(async (message) => {
        await deleteMessage(message.id);
      })
    );
    await deleteRoom(room.id);
  } catch (error) {
    throw error;
  }
};
