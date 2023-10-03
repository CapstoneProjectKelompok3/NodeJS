import { passChange } from "../../repositories/user.js";
import { PrismaClient } from "@prisma/client";

export default async (request) => {
    try {
        await passChange(request);
        // const data = await prisma.user.findUnique({
        //     where: request.user.email
        // });
        // const match = await bcrypt.compare(request.body.currentPass, data.password);
        // if (match) {
        // }
    } catch (err) {
        return err
    }
};