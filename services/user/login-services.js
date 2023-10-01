import { userLogin } from "../../repositories/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async (request) => {
  let token;
  try {
    const data = await userLogin(request);
    if (!data) {
      throw new Error("User with this email not found.");
    }

    const match = await bcrypt.compare(request.password, data.password);
    if (!match) {
      throw new Error(
        "Invalid Password. Please check your password and try again."
      );
    } else if (data.is_activated === false && data.level === 'user') {
      throw new Error("Pending Admin Approval.");
    } else {
      token = jwt.sign(
        {
          id: data.id,
          email: data.email,
          level: data.level,
          username: data.username,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );
      
      const response = {
        user: {
          level: data.level
        },
        token: token
      }
        
      return response;
    }
  } catch (err) {
    throw err;
  }
};
