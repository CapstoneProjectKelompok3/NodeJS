import { userLogin } from "../../repositories/user.js";
import jwt from "jsonwebtoken";

export default async (request) => {
  let token;
  try {
    const data = await userLogin(request);
    token = jwt.sign(
      { id: data.id, email: data.email, level: data.level },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return err;
  }

  return token;
};
