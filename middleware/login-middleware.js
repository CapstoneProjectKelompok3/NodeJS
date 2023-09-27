import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default async (req, res, next) => {
  const findUser = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!findUser) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "User with this email not found.",
    });
  }

  const match = await bcrypt.compare(req.body.password, findUser.password);
  if (!match) {
    return res.status(400).json({
      status_code: 400,
      result: "bad request",
      message: "Invalid Password. Please check your password and try again.",
    });
  }

  return next();
};
