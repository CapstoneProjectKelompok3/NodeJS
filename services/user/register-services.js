import { authenticationRegister } from "../../repositories/authentication.js";
import mailer, { contentMail } from '../../config/mailer.js'

export default async (request) => {
    try {
        let auth  = await authenticationRegister(request)
        mailer.sendMail({
            from: 'ecci-support@setsu.my.id',
            to: auth.email,
            subject: 'Emergency Call Center Indonesia',
            html: contentMail(auth.id)
        })
    } catch (err) {
        throw err
    }

    return true
}