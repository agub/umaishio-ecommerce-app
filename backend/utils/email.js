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
		subject: '旨い塩ショップの登録ありがとうございます',
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
		message: `<p>${name}様, 旨い塩ショップをご利用いただきありがとうございます。<br/><a href="${process.env.API_URI}/password-reset/${token}">ここ</a>からパスワードをリセットしてください  </p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

const sendOrderSuccessEmail = asyncHandler(async (email, name, orderId) => {
	const mailObj = {
		from: 'info@umaishio.com',
		recipients: [email],
		subject: '旨い塩ショップ　注文内容',
		message: `<p>${name}様, 旨い塩ショップをご利用いただきありがとうございます。<br/>ご注文いただいた商品を営業日３〜５日中に発送準備いたします。注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a>。また配送手続きが完了したら配送状況やトラッキングナンバーをお送りいたします。</p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

const sendBankTransferInfo = asyncHandler(
	async (email, name, orderId, price) => {
		const mailObj = {
			from: 'info@umaishio.com',
			recipients: [email],
			subject: '旨い塩ショップ　銀行振り込み',
			message: `<p>${name}　様, 旨い塩ショップをご利用いただきありがとうございます。<br/>
								ご注文商品（ご注文番号：${orderId}）の銀行振り込みのご案内をいたします。
								<br/>
								銀行振り込み口座
								<br/>
								口座番号: XXXXXXXXXXX
								<br/>
								名前: XXXXXXXXXXX
								<br/>
								振込額: ¥${price}
								<br/>
								*振り込み確認後の配送になります。振り込み確認後発送開始のご案内を。。。何日以内など。。。
								<br/>
								注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a></p>`,
		}
		sendEmail(mailObj).then((res) => {
			console.log(res)
		})
	}
)

const sendShippingStartedEmail = asyncHandler(
	async (email, name, orderId, trackingId) => {
		const mailObj = {
			from: 'info@umaishio.com',
			recipients: [email],
			subject: '旨い塩ショップ　発送開始',
			message: `<p>${name}様, 旨い塩ショップをご利用いただきありがとうございます。<br/>ご注文商品（ご注文番号：${orderId}）の発送手配が完了いたしましたので
								ご案内させていただきます。<br/>
								[お荷物伝票番号]
								<br/>
								ヤマト: ${trackingId}
								<br/>
								*注意事項など
								<br/>
								注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a></p>`,
		}
		sendEmail(mailObj).then((res) => {
			console.log(res)
		})
	}
)

export {
	sendEmail,
	sendWelcomeEmail,
	sendResetEmail,
	sendOrderSuccessEmail,
	sendShippingStartedEmail,
	sendBankTransferInfo,
}
