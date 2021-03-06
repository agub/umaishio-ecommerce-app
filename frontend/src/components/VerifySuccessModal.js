import React from 'react'
import { Modal, Button, Image } from 'react-bootstrap'
import verifiedLogo from '../data/images/verified mail logo.png'

const VerifySuccessModal = ({ show, handleClose, text }) => {
	return (
		<Modal
			centered
			// size='lg'
			// style={{ width: '600px' }}
			show={show}
			onHide={handleClose}
		>
			<div
				className='item-modal-wrap__g'
				style={{ padding: '80px 50px' }}
			>
				<div className='d-flex flex-row justify-content-center'>
					<Image
						src={verifiedLogo}
						alt='旨い塩チェック'
						style={{ maxWidth: '50%' }}
						fluid
					/>
				</div>
				<h3 className='text-center mt-5'>{text}</h3>
				<p className='text-center mt-3'>
					ログインをしてショッピングをお楽しみください
				</p>
				<Button
					onClick={handleClose}
					className='next-gradient-btn__g mt-4'
				>
					OK
				</Button>
			</div>
		</Modal>
	)
}

export default VerifySuccessModal
