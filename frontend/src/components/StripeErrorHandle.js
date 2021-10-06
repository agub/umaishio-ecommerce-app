import React from 'react'

const StripeErrorHandle = (message) => {
	if (
		message ===
		'An error occurred while processing your card. Try again in a little bit.'
	) {
		return 'クレジットカード番号が正しくありません。'
	}
	if (message === 'Your card has expired.') {
		return 'クレジットカードが有効期限切れです。'
	}
	if (message === 'Your card was declined.') {
		return 'クレジットカードへの請求が拒否されました。'
	}
	if (message === `Your card's security code is incorrect.`) {
		return 'クレジットカードセキュリティコードが正しくありません。'
	}

	return message
}

export default StripeErrorHandle
