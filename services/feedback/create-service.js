import getEmergencyApi from '../../helper/api/get-emergency.js'
import { createFeedback } from "../../repositories/feedback.js";
import { getUser } from "../../repositories/user.js";

export default async (req) => {
  try {
    const findUser = await getUser(Number(req.params.userId));
    if (!findUser) {
      throw new Error(`User with id ${req.params.userId} not found.`);
    }

    const request = await getEmergencyApi(req)
    if(request.code === 'ERR_BAD_RESPONSE') throw new Error("Emergencies id not found")

    try {
      await createFeedback(req)
    } catch (err) {
      if(err.code === "P2002" && err.meta.target === "feedback_emergencies_id_key") {
        throw new Error("Feedback for this emergencies ID already exist")
      }
    }
  } catch (err) {
    throw err;
  }
};
