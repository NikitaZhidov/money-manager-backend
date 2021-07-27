const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationLink(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_HOST,
			to,
			subject: `Активации аккаунта на ${process.env.CLIENT_URL}`,
			html: `
				<div>
					<h1>Подтверждение регистрации</h1>
					<p>Для подтверждения регистрации перейдите по ссылке
						<a href="${link}">${link}</a>
					</p>
				</div>
			`,
		});
	}
}

module.exports = new MailService();
