import { sendResetPassword } from "../../repositories/mail.js";
import { resetPassword } from "../../repositories/user.js";

export default async (request) => {
    let password;
    try {
        password = await resetPassword(request);
        sendResetPassword(request.body.email, password);
    } catch (err) {
        return err
    }
    return password
};