import { getAllRoomAdmin } from "../../repositories/message.js";
import { getUser } from "../../repositories/user.js";

export default async (request) => {
  let room;
  try {
    let datas = [];
    room = await getAllRoomAdmin(request.user.id);

    let maproom = room.map(async (item) => {
      const get = await getUser(item.userId);
      datas.push({ username: get.username, idRoom: item.id });
    });

    const datasss = await Promise.all(maproom);
    return datas;
  } catch (error) {
    throw error;
  }
};
