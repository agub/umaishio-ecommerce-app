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

const sendEmailBcc = asyncHandler(async (mailObj) => {
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
			bcc: ['sales@tobira.page', 'info@umaishio.com'],
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
		from: '旨い塩オンラインショップ　<info@umaishio.com>',
		recipients: [email],
		subject: '旨い塩オンラインショップの登録のご案内',
		// message: `<p>${name}様, 旨い塩オンラインショップの登録ありがとうございます。 <a href="${process.env.API_URI}/verify/${id}/${token}">こちら</a>から登録完了・・・</p>`,
		message: `<p>${name}様、
		<br/>
		旨い塩オンラインショップのご登録ありがとうございます。
		<br/>
		<a href="${process.env.API_URI}/verify/${id}/${token}">こちら</a>をクリック後、会員登録が完了いたします。
		<br/>
		※会員登録に心当たりがない場合は、こちらの対応は不要となります。
		<br/>
		<br/>
		またアクセスできない場合は、以下のURLからアクセスください。
		<br/>
		${process.env.API_URI}/verify/${id}/${token}
		</p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

const sendResetEmail = asyncHandler(async (email, name, token) => {
	const mailObj = {
		from: '旨い塩オンラインショップ　<info@umaishio.com>',
		recipients: [email],
		subject: '旨い塩オンラインショップ　パスワードリセットのご案内',
		// message: `<p>${name} 様, 旨い塩オンラインショップをご利用いただきありがとうございます。<br/><a href="${process.env.API_URI}/password-reset/${token}">ここ</a>からパスワードをリセットしてください  </p>`,
		message: `<p>旨い塩オンラインショップをいつもご利用いただきありがとうございます。
		<br/>
		パスワードリセットの申請を受け付けました。
		<br/>
		パスワードの再設定をご希望の場合は、<a href="${process.env.API_URI}/password-reset/${token}">こちら</a>をクリックし新しいパスワードをご登録ください。
		<br/>
		※パスワードリセットの申請に心当たりがない場合は、対応は不要となります。
		<br/>
		<br/>
		もしアクセスできない場合は、以下のURLからアクセスください。
		<br/>
		${process.env.API_URI}/password-reset/${token}
		<br/>
		<br/>
		</p>`,
	}

	sendEmail(mailObj).then((res) => {
		console.log(res)
	})
})

const sendOrderSuccessEmail = asyncHandler(async (mailInfo) => {
	const {
		name,
		email,
		orderId,
		amount,
		addressInfo,
		orderInfo,
		shippingFee,
	} = mailInfo
	let results = orderInfo.map((order) => {
		return `<span>商品名： ${order.name}</span><br/><span>商品価格（税込）：${order.price}円</span><br/><span>数量：${order.qty}個</span>`
	})

	const mailObj = {
		from: '旨い塩オンラインショップ　<info@umaishio.com>',
		bcc: 'sales@tobira.page',
		recipients: [email],
		subject: '旨い塩オンラインショップ　注文内容',
		// message: `<p>${name}様, 旨い塩オンラインショップをご利用いただきありがとうございます。<br/>ご注文いただいた商品を営業日３〜５日中に発送準備いたします。注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a>。また配送手続きが完了したら配送状況やトラッキングナンバーをお送りいたします。</p>`,
		message: `<p>${addressInfo.fullName}様, 
		<br/>
		旨い塩オンラインショップをご利用いただきありがとうございます。
		<br/>
		以下の内容でご注文を承りました。
		<br/>
		<br/>
		【配送先・商品情報】
		<br/>
		お名前：${addressInfo.fullName}様
		<br/>
		ご住所：${addressInfo.prefecture}${addressInfo.address}${addressInfo.building}
		<br/>
		電話番号：${addressInfo.phoneNumber}
		<br/>
		<br/>
		【商品詳細】
		<br/>
		${results}
		<br/>
		配送料：${shippingFee}円
		<br/>
		合計（税込）：${amount}円
		<br/>
		<br/>
		また注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a>からこ覧になれます。
		<br/>
		<br/>
		*ご注文いただいた商品を営業日３〜５日中に発送準備いたします。また配送手続きが完了後こちらからヤマトの送り番号などをお送りいたします。
		</p>`,
	}

	sendEmailBcc(mailObj).then((res) => {
		console.log(res)
	})
})

const sendBankTransferInfo = asyncHandler(
	async (email, name, orderId, price) => {
		const mailObj = {
			from: '旨い塩オンラインショップ　<info@umaishio.com>',
			recipients: [email],
			subject: '旨い塩オンラインショップ　銀行振り込み',
			message: `<p>${name}　様, 旨い塩オンラインショップをご利用いただきありがとうございます。
								<br/>
								以下の内容でご注文を承りました。
								<br/>
								<br/>
								【配送先・商品情報】
								<br/>
								お名前：
								<br/>
								ご住所：
								<br/>
								電話番号：
								<br/>
								<br/>
								<br/>
								【商品詳細】
								商品価格（税込）：
								<br/>
								数量：
								<br/>
								配送料：
								<br/>
								合計（税込）：
								<br/>
								<br/>
								また注文内容の確認は<a href="${process.env.API_URI}/order/${orderId}">こちらから</a>からもご覧になれます。
								<br/>
								<br/>
								ご注文商品（ご注文番号：${orderId}）の銀行振り込みのご案内をいたします。
								<br/>
								<br/>
								【銀行振り込み詳細】
								金融機関: 三井住友銀行 小田原支店
								<br/>
								口座名: 株式会社トビラ
								<br/>
								口座番号: 3869283
								<br/>
								振込額: ¥${price}
								<br/>
								<br/>
								※お振込手数料は恐れ入りますがお客様にご負担いただいております。よろしくお願いいたします。
								<br/>
								お振込いただき、確認後できるだけ早く送付させていただき振り込み確認後発送開始のご案内を改めてメールをお送りいたします。
								<br/>
								また領収書をご希望の場合、宛先の名前をご記入いただき、ご連絡下さい。
								<br/>
								</p>`,
		}
		sendEmailBcc(mailObj).then((res) => {
			console.log(res)
		})
	}
)

const sendShippingStartedEmail = asyncHandler(
	async (email, name, orderId, trackingId) => {
		const mailObj = {
			from: '旨い塩オンラインショップ　<info@umaishio.com>',
			recipients: [email],
			subject: '旨い塩オンラインショップ 配送手続きメール',
			message: `<p>
								${name}様、
								<br/>
								旨い塩オンラインショップをご利用いただきありがとうございます。 
								<br/>
								<br/>
								<a href="${process.env.API_URI}/order/${orderId}">こちら</a>の商品の入金確認と発送手続きが完了しましたのでお伝えいたします。
								<br/>
								<br/>
								【配送情報】
								<br/>
								配送会社: ヤマト運輸
								<br/>
								伝票番号: [xxxxxxxx]
								<br/>
								<br/>
								ヤマト運輸HPの以下のリンクから荷物お問い合わせシステム配送状況を確認できます。
								<br/>
								https://toi.kuronekoyamato.co.jp/cgi-bin/tneko
								</p>`,
		}
		// const mailObj = {
		// 	from: '旨い塩オンラインショップ　<info@umaishio.com>',
		// 	recipients: [email],
		// 	subject: '旨い塩オンラインショップ 配送手続きメール',
		// 	message: `<p>
		// 						${name}様、
		// 						<br/>
		// 						旨い塩オンラインショップをご利用いただきありがとうございます。
		// 						<br/>
		// 						<br/>
		// 						<a href="${process.env.API_URI}/order/${orderId}">こちら</a>の商品の入金確認と発送手続きが完了しましたのでお伝えいたします。
		// 						<br/>
		// 						<br/>
		// 						【配送情報】
		// 						<br/>
		// 						配送方法: 郵便 ラクポスBOX
		// 						<br/>
		// 						配送予定: １〜２日後
		// 						<br/>
		// 						このたびは旨い塩オンライン覧ショップでのご注文いただき誠にありがとうございました。またのご利用を心よりお待ち申し上げております。
		// 						</p>`,
		// }
		sendEmailBcc(mailObj).then((res) => {
			console.log(res)
		})
	}
)

const sendContactEmail = asyncHandler(async (email, name, content) => {
	const mailObj = {
		from: '旨い塩オンラインショップ　<info@umaishio.com>',
		recipients: [email],
		subject: '旨い塩オンラインショップのお問い合わせ',
		message: `${name}様からのお問い合わせ内容: 
		<br/>
		${content}
		`,
	}
	sendEmailBcc(mailObj).then((res) => {
		console.log(res)
	})
})

export {
	sendEmail,
	sendEmailBcc,
	sendWelcomeEmail,
	sendResetEmail,
	sendOrderSuccessEmail,
	sendShippingStartedEmail,
	sendBankTransferInfo,
	sendContactEmail,
}
