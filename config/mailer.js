import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
	host: 'mail.setsu.my.id',
	port: 465,
	secure: true,
	auth: {
		user: 'ecci-support@setsu.my.id',
		pass: '@Capstone01'
	}
})

export default transport