import roomService from "../services/message/newmessage-service.js";
import messageService from "../services/message/message-service.js";
import getroomService from "../services/message/getroom-service.js";
import getmessageService from "../services/message/getmessage-service.js";

export const roomMessage = async (req, res) => {
  try {
    // buat room baru dulu
    let room = await roomService(req);
    return res.status(200).json({
      status_code: 200,
      result: "success",
      message: "Succes create room and send message",
      room: room.roomId,
      admin: room.admin,
    });
  } catch (error) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message,
    });
  }
};

export const getRoom = async (req, res) => {
  try {
    // buat room baru dulu
    let room = await getroomService(req);
    return res.status(200).json({
      status_code: 200,
      result: "success",
      message: "Succes get all room by admin",
      data: room,
    });
  } catch (error) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    // buat room baru dulu
    let message = await getmessageService(req);
    return res.status(200).json({
      status_code: 200,
      result: "success",
      message: "Succes get message by room",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: error.message,
    });
  }
};

export const sendMessage = async (request) => {
  try {
    // buat room baru dulu
    let message = await messageService(request);
    console.log("berhasil kirim chat");
  } catch (error) {
    console.log(error);
  }
};
