import { sendMessage } from "../../repositories/message.js";

export default async (request) => {
  try {
    await sendMessage(request.content, request.idroom, request.userid);
  } catch (error) {
    throw error;
  }
  return true;
};
