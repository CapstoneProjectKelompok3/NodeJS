import 'dotenv/config'
import mailer, { contentMail } from '../../config/mailer.js'

export default async (request) => {
    try {
        mailer.sendMail({
            from: process.env.EMAIL_USER,
            to: 'fann.fann771@gmail.com',
            subject: '[Register] Emergency Call Center Indonesia',
            html: contentMail('berak')
        })
    } catch (err) {
        throw err
    }

    return true
}