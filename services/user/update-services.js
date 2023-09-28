import { documentUpdate } from "../../repositories/document.js"
import { userUpdate } from "../../repositories/user.js"

export default async (request) => {
    let user;
    try {
        user  = await userUpdate(request);
        await documentUpdate(request, user.id);
    } catch (err) {
        return err
    }
};