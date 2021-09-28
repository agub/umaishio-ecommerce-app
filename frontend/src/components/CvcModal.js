import React from 'react'
import { Modal, Image, Button } from 'react-bootstrap'
import cvc from '../data/images/CVV.png'

const CvcModal = ({ show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			{/* <Modal.Header closeButton>
				<Modal.Title>CVCとは？</Modal.Title>
			</Modal.Header> */}
			<div
				className='item-modal-wrap__g'
				style={{ padding: '50px 50px' }}
			>
				<h1>CVCとは？</h1>
				<p className='underline__g'></p>
				<Image
					src={cvc}
					alt='cvc'
					style={{
						width: '100%',
						marginBottom: '20px',
					}}
				/>
				<p>
					CVC
					(セキュリティコード)はカードの署名欄の隅に印刷された3桁または4桁の数字です
				</p>
				<p className='underline__g'></p>
				<Button
					className='btn-block w-100 borderRadius__g'
					onClick={handleClose}
				>
					閉じる
				</Button>
			</div>
		</Modal>
	)
}

export default CvcModal
