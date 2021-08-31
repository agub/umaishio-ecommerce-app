import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'
import { updateShipperInfo } from '../actions/orderActions'
import Loader from '../components/Loader'

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
	const [phoneNumber, setPhoneNumber] = useState(
		order.shippingAddress.phoneNumber || ''
	)
	const [address, setAddress] = useState(order.shippingAddress.address || '')
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

	const [shipperFullName, setShipperFullName] = useState(
		order.shippingAddress.shipperFullName || ''
	)
	const [shipperPhoneNumber, setShipperPhoneNumber] = useState(
		order.shippingAddress.phoneNumber || ''
	)
	const [shipperAddress, setShipperAddress] = useState(
		order.shippingAddress.shipperAddress || ''
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
					phoneNumber,
					postalCode,
					prefecture,
					address,
					isComment,
					comment,
					isShipper,
					shipperFullName,
					shipperPhoneNumber,
					shipperPostalCode,
					shipperPrefecture,
					shipperAddress,
				})
			)
		} else if (isShipper) {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					isShipper,
					isComment,
					shipperFullName,
					shipperPhoneNumber,
					shipperPostalCode,
					shipperPrefecture,
					shipperAddress,
				})
			)
		} else if (isComment) {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					phoneNumber,
					postalCode,
					prefecture,
					address,
					isComment,
					comment,
					isShipper,
				})
			)
		} else {
			dispatch(
				updateShipperInfo(productId, {
					fullName,
					phoneNumber,
					postalCode,
					prefecture,
					address,
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
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>氏名</Form.Label>
						<Form.Control
							type='string'
							value={fullName}
							required
							onChange={(e) => setFullName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>電話番号</Form.Label>
						<Form.Control
							type='number'
							value={phoneNumber}
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Row>
						<Form.Group
							controlId='postalCode'
							className='mt-2'
							as={Col}
							sm={3}
							xs={4}
						>
							<Form.Label>郵便番号</Form.Label>
							<Form.Control
								type='string'
								value={postalCode1}
								maxLength='3'
								minLength='3'
								required
								onChange={(e) => setPostalCode1(e.target.value)}
							></Form.Control>
						</Form.Group>
						<div
							style={{
								width: '10px',
								height: '100%',
								display: 'flex',
								marginTop: 'auto',
								paddingBottom: '15px',
							}}
						>
							{/* <h3 style={{ marginTop: '6px' }}>-</h3> */}-
						</div>
						<Form.Group
							controlId='postalCode'
							className='mt-2'
							as={Col}
							sm={3}
							xs={4}
						>
							<Form.Label>&nbsp;</Form.Label>

							<Form.Control
								type='string'
								value={postalCode2}
								maxLength='4'
								minLength='4'
								required
								onChange={(e) => setPostalCode2(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Row>
					<Form.Group controlId='prefecture' className='mt-2'>
						<Form.Label>都道府県</Form.Label>
						<Form.Control
							className='form-select'
							as='select'
							value={prefecture}
							placeholder='選択してください'
							required
							onChange={(e) => setPrefecture(e.target.value)}
						>
							{PREF_OPTIONS.map((x) => (
								<option key={x} value={x}>
									{x}
								</option>
							))}
						</Form.Control>
					</Form.Group>

					<Form.Group controlId='address' className='mt-2'>
						<Form.Label>住所</Form.Label>
						<Form.Control
							type='text'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Check
						className='mt-3'
						label='申し込み人と送り主が異なる場合'
						onChange={() => shipperCheck()}
						// value={isShipper}
						checked={isShipper}
					/>

					{isShipper && (
						<>
							<h1 className='mt-3'>依頼人情報</h1>
							<Form.Group controlId='postalCode' className='mt-2'>
								<Form.Label>送り主氏名</Form.Label>
								<Form.Control
									type='string'
									value={shipperFullName}
									required
									onChange={(e) =>
										setShipperFullName(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='postalCode' className='mt-2'>
								<Form.Label>電話番号</Form.Label>
								<Form.Control
									type='number'
									value={shipperPhoneNumber}
									required
									onChange={(e) =>
										setShipperPhoneNumber(e.target.value)
									}
								></Form.Control>
							</Form.Group>
							<Row>
								<Form.Group
									controlId='postalCode'
									className='mt-2'
									as={Col}
									sm={3}
									xs={4}
								>
									<Form.Label>郵便番号</Form.Label>
									<Form.Control
										type='string'
										value={shipperPostalCode1}
										maxLength='3'
										minLength='3'
										required
										onChange={(e) =>
											setShipperPostalCode1(
												e.target.value
											)
										}
									></Form.Control>
								</Form.Group>
								<div
									style={{
										width: '10px',
										height: '100%',
										display: 'flex',
										marginTop: 'auto',
										paddingBottom: '15px',
									}}
								>
									{/* <h3 style={{ marginTop: '6px' }}>-</h3> */}
									-
								</div>
								<Form.Group
									controlId='postalCode'
									className='mt-2'
									as={Col}
									sm={3}
									xs={4}
								>
									<Form.Label>&nbsp;</Form.Label>

									<Form.Control
										type='string'
										value={shipperPostalCode2}
										maxLength='4'
										minLength='4'
										required
										onChange={(e) =>
											setShipperPostalCode2(
												e.target.value
											)
										}
									></Form.Control>
								</Form.Group>
							</Row>
							<Form.Group controlId='prefecture' className='mt-2'>
								<Form.Label>都道府県</Form.Label>
								<Form.Control
									className='form-select'
									as='select'
									value={shipperPrefecture}
									placeholder='選択してください'
									required
									onChange={(e) =>
										setShipperPrefecture(e.target.value)
									}
								>
									{PREF_OPTIONS.map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId='address' className='mt-2'>
								<Form.Label>住所</Form.Label>
								<Form.Control
									type='text'
									value={shipperAddress}
									required
									onChange={(e) =>
										setShipperAddress(e.target.value)
									}
								></Form.Control>
							</Form.Group>
						</>
					)}
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
