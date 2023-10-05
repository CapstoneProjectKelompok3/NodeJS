import { getMessage } from "../../repositories/message.js";

export default async (request) => {
  let message;
  try {
    message = await getMessage(request.params.roomid);
  } catch (error) {
    throw error;
  }
  return message;
};
