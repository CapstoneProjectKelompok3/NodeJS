import nodemailer from 'nodemailer'
import 'dotenv/config'

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: process.env.EMAIL_SECURE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
})

export const contentMail = (uuid) => {
	return `
	<html>
		<head>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f2f2f2;
			}

			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				background-color: #ffffff;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
				text-align: center;
			}

			h1 {
				color: #333333;
			}

			img {
				margin-bottom: 10px;
			}

			p {
				color: #666666;
			}

			button {
				margin: auto;
				margin-bottom: 10px;
				background-color: #007bff;
				color: #ffffff;
				padding: 10px 20px;
				border: none;
				border-radius: 5px;
				text-decoration: none;
				display: inline-block;
				cursor: pointer;
			}

			button a {
				color: white;
				text-decoration: none;
			}

			b {
				font-weight: bold;
			}
  	</style>
		</head>
		<body>
			<div class="container">
				<h1>Verifikasi akun</h1>

				<img src="https://cdn.discordapp.com/attachments/1155851056740311081/1156266029429837885/logo_ecci.png?ex=651c4127&is=651aefa7&hm=59808162e351fa85b2d3d23d7b06e79ed9069fc617b2691d1b3eb2c759698d6d&">

				<p>Anda sedang melakukan register di layanan kami. Untuk mengkonfirmasi bahwa ini adalah anda, silahkan konfirmasi
				terlebih dahulu dengan meng-klik tombol di bawah ini.</p>

				<button>
					<a href='http://localhost:3000/users/verify-token?token=${uuid}'>Verifikasi akun</a>
				</button>

				<p>Harap segera menyelesaikan pendaftaran akun anda, link diatas akan segera kadaluarsa dalam waktu <b>30 Menit.</b></p>
			</div>
		</body>
	</html>
`
}

export default transport