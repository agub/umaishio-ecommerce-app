import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'
import { updateShipperInfo } from '../actions/orderActions'
import Loader from '../components/Loader'

import ShippingForm from '../components/ShippingForm'
import ShipperForm from '../components/ShipperForm'

const ModifyShippingInfoModal = ({ match, show, handleClose }) => {
	const dispatch = useDispatch()
	const productId = match.params.id

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order } = orderDetails

	const orderShippingUpdate = useSelector(
		(state) => state.orderShippingUpdate
	)
	const { success, loading } = orderShippingUpdate

	const [fullName, setFullName] = useState(
		order.shippingAddress.fullName || ''
	)

	const [furigana, setFurigana] = useState(
		order.shippingAddress.furigana || ''
	)

	const [phoneNumber, setPhoneNumber] = useState(
		order.shippingAddress.phoneNumber || ''
	)
	const [address, setAddress] = useState(order.shippingAddress.address || '')
	const [building, setBuilding] = useState(
		order.shippingAddress.building || ''
	)
	const [prefecture, setPrefecture] = useState(
		order.shippingAddress.prefecture || '北海道'
	)
	const [postalCode1, setPostalCode1] = useState(
		(order.shippingAddress.postalCode &&
			order.shippingAddress.postalCode.substring(0, 3)) ||
			''
	)
	const [postalCode2, setPostalCode2] = useState(
		(order.shippingAddress.postalCode &&
			order.shippingAddress.postalCode.substring(3, 7)) ||
			''
	)
	//shipper addditional

	const [comment, setComment] = useState(order.shippingAddress.comment || '')

	const [isShipper, setIsShipper] = useState(
		order.shippingAddress.isShipper || false
	)

	const [isComment, setIsComment] = useState(
		order.shippingAddress.isComment || false
	)

	//shipper addditional

	const [shipperFullName, setShipperFullName] = useState(
		order.shippingAddress.shipperFullName || ''
	)
	const [shipperFurigana, setShipperFurigana] = useState(
		order.shippingAddress.shipperFurigana || ''
	)
	const [shipperPhoneNumber, setShipperPhoneNumber] = useState(
		order.shippingAddress.phoneNumber || ''
	)
	const [shipperAddress, setShipperAddress] = useState(
		order.shippingAddress.shipperAddress || ''
	)
	const [shipperBuilding, setShipperBuilding] = useState(
		order.shippingAddress.shipperBuilding || ''
	)
	const [shipperPrefecture, setShipperPrefecture] = useState(
		order.shippingAddress.shipperPrefecture && '北海道'
	)
	const [shipperPostalCode1, setShipperPostalCode1] = useState(
		(order.shippingAddress.shipperPostalCode &&
			order.shippingAddress.shipperPostalCode.substring(0, 3)) ||
			''
	)
	const [shipperPostalCode2, setShipperPostalCode2] = useState(
		(order.shippingAddress.shipperPostalCode &&
			order.shippingAddress.shipperPostalCode.substring(3, 7)) ||
			''
	)
	const submitHandler = async (e) => {
		e.preventDefault()
		let postalCode
		if (postalCode1 !== '' && postalCode2 !== '') {
			postalCode = postalCode1 + postalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
		}
		let shipperPostalCode
		if (shipperPostalCode1 !== '' && shipperPostalCode2 !== '') {
			shipperPostalCode = shipperPostalCode1 + shipperPostalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
		}

		if (isShipper && isComment) {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					furigana,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					building,
					isComment,
					comment,
					isShipper,
					shipperFullName,
					shipperFurigana,
					shipperPhoneNumber,
					shipperPostalCode,
					shipperPrefecture,
					shipperAddress,
					shipperBuilding,
				})
			)
		} else if (isShipper) {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					furigana,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					building,
					isShipper,
					isComment,
					shipperFullName,
					shipperFurigana,
					shipperPhoneNumber,
					shipperPostalCode,
					shipperPrefecture,
					shipperAddress,
					shipperBuilding,
				})
			)
		} else if (isComment) {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					furigana,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					building,
					isComment,
					comment,
					isShipper,
				})
			)
		} else {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					furigana,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					building,
					isShipper,
				})
			)
		}
	}

	useEffect(() => {
		if (success) {
			window.location.reload()
		}
	}, [success])

	const shipperCheck = () => {
		setIsShipper(!isShipper)
	}
	const commentCheck = () => {
		setIsComment(!isComment)
		// setComment('')
	}
	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>お届け先の変更</Modal.Title>
			</Modal.Header>
			<Modal.Body className='p-20'>
				<h1>お届け先の住所</h1>
				<Form onSubmit={submitHandler} className='shippingContainer'>
					<ShippingForm
						fullName={fullName}
						furigana={furigana}
						phoneNumber={phoneNumber}
						postalCode1={postalCode1}
						postalCode2={postalCode2}
						prefecture={prefecture}
						address={address}
						building={building}
						setFullName={setFullName}
						setFurigana={setFurigana}
						setPhoneNumber={setPhoneNumber}
						setPostalCode1={setPostalCode1}
						setPostalCode2={setPostalCode2}
						setPrefecture={setPrefecture}
						setAddress={setAddress}
						setBuilding={setBuilding}
					/>
					<Form.Check
						className='mt-3'
						label='申し込み人と送り主が異なる場合'
						onChange={() => shipperCheck()}
						// value={isShipper}
						checked={isShipper}
					/>
					<ShipperForm
						isShipper={isShipper}
						shipperFullName={shipperFullName}
						shipperFurigana={shipperFurigana}
						shipperPhoneNumber={shipperPhoneNumber}
						shipperPostalCode1={shipperPostalCode1}
						shipperPostalCode2={shipperPostalCode2}
						shipperPrefecture={shipperPrefecture}
						shipperAddress={shipperAddress}
						shipperBuilding={shipperBuilding}
						setShipperFullName={setShipperFullName}
						setShipperFurigana={setShipperFurigana}
						setShipperPhoneNumber={setShipperPhoneNumber}
						setShipperPostalCode1={setShipperPostalCode1}
						setShipperPostalCode2={setShipperPostalCode2}
						setShipperPrefecture={setShipperPrefecture}
						setShipperAddress={setShipperAddress}
						setShipperBuilding={setShipperBuilding}
					/>
					<Form.Check
						className='mt-3'
						label='配送者へのご要望'
						onChange={() => commentCheck()}
						checked={isComment}
					/>
					{isComment && (
						<Form.Group controlId='comment' className='mt-3'>
							<Form.Label>ご要望内容</Form.Label>
							<Form.Control
								as='textarea'
								required
								row='3'
								onChange={(e) => setComment(e.target.value)}
								value={comment}
							></Form.Control>
						</Form.Group>
					)}
					{/* <div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					> */}
					{loading ? (
						<Loader />
					) : (
						<>
							<Button
								type='submit'
								variant='primary'
								className='mt-3 w-100'
							>
								変更する
							</Button>
							<Button
								variant='flush'
								onClick={handleClose}
								className='mt-3 w-100'
							>
								キャンセル
							</Button>
						</>
					)}
					{/* </div> */}
				</Form>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button variant='primary' onClick={handleClose}>
					閉じる
				</Button>
			</Modal.Footer> */}
		</Modal>
	)
}

export default ModifyShippingInfoModal
