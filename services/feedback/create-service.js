import axios from "axios";
import { createFeedback } from "../../repositories/feedback.js";
import { getUser } from "../../repositories/user.js";

export default async (request) => {
  try {
    const authHeader = request.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    const findUser = await getUser(Number(request.params.userId));
    if (!findUser) {
      throw new Error(`User with id ${request.params.userId} not found.`);
    }

    await axios
      .get(
        `${process.env.PROTOKOL_HTTP}/emergencies/${request.body.emergencies_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        const data = await createFeedback(request);
        return true;
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          throw new Error(
            `Emergencies id ${request.body.emergencies_id} Not Found`
          );
        } else if (err.code === "P2002") {
          throw new Error(
            `Feedback for this emergencies ID has already been created.`
          );
        } else {
          throw err;
        }
      });
  } catch (err) {
    throw err;
  }
};
