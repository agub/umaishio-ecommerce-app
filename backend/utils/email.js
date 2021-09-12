import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()

const sendEmail = asyncHandler(async (mailObj) => {
	const { from, recipients, subject, message } = mailObj

	try {
		// Create a transporter
		let transporter = nodemailer.createTransport({
			host: 'smtp.zoho.eu',
			secure: true,
			port: 465,
			auth: {
				user: 'info@umaishio.com',
				pass: process.env.ZOHO_PASSWORD,
			},
		})

		// send mail with defined transport object
		let mailStatus = await transporter.sendMail({
			from: from, // sender address
			to: recipients, // list of recipients
			subject: subject, // Subject line
			html: message, // plain text
		})

		console.log(`Message sent: ${mailStatus.messageId}`)
		return `Message sent: ${mailStatus.messageId}`
	} catch (error) {
		console.error(
			`Something went wrong in the sendmail method. Error: ${error.message}`
		)
	}
})

const sendWelcomeEmail = asyncHandler(async (email, name, id, token) => {
	const mailObj = {
		from: 'info@umaishio.com',
		recipients: [email],
		subject: 'Welcome',
		message: `<p>${name}様, 旨い塩ショップの登録ありがとうございます。 <a href="${process.env.API_URI}/verify/${id}/${token}">こちら</a>から登録完了・・・</p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

const sendResetEmail = asyncHandler(async (email, name, token) => {
	const mailObj = {
		from: 'info@umaishio.com',
		recipients: [email],
		subject: '旨い塩ショップ　パスワードリセット',
		message: `<p>${name}様, 旨い塩ショップをご利用いただきありがとうございます。<br/><a href="${process.env.API_URI}/password-reset/${token}">ここ</a>からパスワードをリセットしてください  りあるリンク<a href="http://umaishio.com/password-reset/${token}">ここ</a></p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

export { sendEmail, sendWelcomeEmail, sendResetEmail }
