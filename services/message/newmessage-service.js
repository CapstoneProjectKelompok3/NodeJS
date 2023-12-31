import createEmergency from "../../helper/api/create-emergency.js";
import {
  createRoom,
  adminCount,
  sendMessage,
  adminPertama,
  adminBelumMenerimaMessage,
  getAllAdminId,
  getAllRoom,
  updateRoom,
  deleteRoom,
} from "../../repositories/message.js";
import { getUser } from "../../repositories/user.js";

export default async (request) => {
  let message;
  try {
    let room = await createRoom(request.user.id);

    let allAdmin = await getAllAdminId();
    const adminIds = allAdmin.map((admin) => admin.id);

    const allRoom = await getAllRoom();
    const adminRoomsCount = {};

    allRoom.forEach((room) => {
      const adminId = room.adminId;
      if (adminRoomsCount[adminId]) {
        adminRoomsCount[adminId]++;
      } else {
        adminRoomsCount[adminId] = 1;
      }
    });

    const result = adminIds.filter((adminId) => {
      return !adminRoomsCount[adminId] || adminRoomsCount[adminId] < 5;
    });

    if (result.length < 1) {
      await deleteRoom(room.id);
      throw new Error("Admin is busy right now, please try again later.");
    }

    const emergency = await createEmergency(result[0], request);
    let newUpdateRoom = await updateRoom(room.id, result[0], `room ${room.id}`, emergency.data.data.id);

    // create emergency after romm chat has been created

    let messageNew = await sendMessage(
      request.body.message,
      room.id,
      request.user.id
    );
    let getAdminRoom = await getUser(result[0]);
    message = { roomId: room.id, admin: getAdminRoom.email };
  } catch (error) {
    throw error;
  }
  return message;
};
