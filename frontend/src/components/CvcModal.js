import React from 'react'
import { Modal, Image, Button } from 'react-bootstrap'
import cvc from '../data/images/cvc.png'

const CvcModal = ({ show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>CVCとは？</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Image
					src={cvc}
					alt='cvc'
					style={{
						width: '100%',
						marginBottom: '20px',
					}}
				/>
				CVC
				(セキュリティコード)はカードの署名欄の隅に印刷された3桁または4桁の数字です
				。
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={handleClose}>
					閉じる
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CvcModal
