import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export default transport;
