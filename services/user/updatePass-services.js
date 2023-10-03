import { passChange } from "../../repositories/user.js";
import { PrismaClient } from "@prisma/client";

export default async (request) => {
    try {
        await passChange(request);
    } catch (err) {
        return err
    }
};