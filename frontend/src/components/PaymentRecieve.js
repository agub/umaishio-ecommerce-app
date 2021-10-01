import React from 'react'
import { Image } from 'react-bootstrap'
import checkIcon from '../data/images/check icon green 1.png'
const PaymentRecieve = ({ delivered, date }) => {
	return (
		<>
			<p className='text-center mb-1'>お支払い済み</p>
			<Image
				src={checkIcon}
				alt='checkIcon'
				fluid
				className='check-image'
			/>
			<p className='text-center'>
				ご購入ありがとうございます。
				<br />
				{!delivered
					? '2営業日以内に発送いたします。'
					: `${date}に発送手続き完了`}
			</p>

			{/* <p className='text-center'>{`オーダーID: ${orderId}`}</p> */}
		</>
	)
}

export default PaymentRecieve
