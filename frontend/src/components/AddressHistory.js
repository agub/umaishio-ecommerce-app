import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'

import Loader from '../components/Loader'
import { Modal, Image, Button } from 'react-bootstrap'

const AddressHistory = ({
	show,
	handleClose,
	userInfo,
	setUseAddressHistory,
}) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			{/* <Modal.Header>
				<Modal.Title>過去のお届け先</Modal.Title>
			</Modal.Header> */}
			{/* <Modal.Body> */}
			<div
				className='item-modal-wrap__g'
				style={{ padding: '50px 50px' }}
			>
				<h1>
					<i className='fas fa-home'>&nbsp;</i>過去のお届け先
				</h1>
				<p className='underline__g'></p>
				<p>
					{/* <strong>氏名: </strong> */}
					<strong>〒</strong>
					{userInfo.shippingAddress.postalCode &&
						userInfo.shippingAddress.postalCode.substring(0, 3)}
					-
					{userInfo.shippingAddress.postalCode &&
						userInfo.shippingAddress.postalCode.substring(3, 7)}
					<br />
					{/* <strong>住所: </strong> */}
					{userInfo.shippingAddress.prefecture}
					{userInfo.shippingAddress.address}
					<br />
					{userInfo.shippingAddress.building !== '' && (
						<>
							{userInfo.shippingAddress.building}
							<br />
						</>
					)}
					{userInfo.shippingAddress.fullName}
					<br />
					{userInfo.shippingAddress.phoneNumber && (
						<>
							<i
								className='fa fa-phone'
								style={{
									display: 'inline-block',
									transform: 'scaleX(-1)',
									marginRight: '5px',
								}}
								aria-hidden='true'
							></i>
							{userInfo.shippingAddress.phoneNumber}
						</>
					)}
				</p>
				<p className='underline__g'></p>
				<Button
					className='next-gradient-btn__g mb-4'
					// className='w-100'
					// variant='primary'
					onClick={() => {
						setUseAddressHistory(true)
						handleClose()
					}}
				>
					この住所を使用または修正する
				</Button>

				<Button
					className='w-100 borderRadius__g'
					// variant='secondary'
					onClick={handleClose}
				>
					新しい住所を入力する
				</Button>
			</div>
			{/* </Modal.Body>
			<Modal.Footer>
				<Button
					className='next-gradient-btn__g'
					// className='w-100'
					// variant='primary'
					onClick={() => {
						setUseAddressHistory(true)
						handleClose()
					}}
				>
					この住所を使用または修正する
				</Button>

				<Button
					className='w-100 borderRadius__g'
					// variant='secondary'
					onClick={handleClose}
				>
					新しい住所を入力する
				</Button>
			</Modal.Footer> */}
		</Modal>
	)
}

export default AddressHistory
