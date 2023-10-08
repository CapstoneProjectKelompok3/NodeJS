import { passChange } from "../../repositories/user.js";

export default async (request) => {
    try {
        await passChange(request);
    } catch (err) {
        return err
    }
};