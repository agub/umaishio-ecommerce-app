import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { saveShippingAddress } from '../actions/cartActions'
import ShippingForm from '../components/ShippingForm'
import ShipperForm from '../components/ShipperForm'

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { shippingAddress, updated } = cart

	const [fullName, setFullName] = useState(shippingAddress.fullName || '')

	const [furigana, setFurigana] = useState(shippingAddress.furigana || '')

	const [phoneNumber, setPhoneNumber] = useState(
		shippingAddress.phoneNumber || ''
	)
	const [address, setAddress] = useState(shippingAddress.address || '')
	const [building, setBuilding] = useState(shippingAddress.building || '')
	const [prefecture, setPrefecture] = useState(
		shippingAddress.prefecture || '北海道'
	)
	const [postalCode1, setPostalCode1] = useState(
		(shippingAddress.postalCode &&
			shippingAddress.postalCode.substring(0, 3)) ||
			''
	)
	const [postalCode2, setPostalCode2] = useState(
		(shippingAddress.postalCode &&
			shippingAddress.postalCode.substring(3, 7)) ||
			''
	)

	//shipper addditional
	const [comment, setComment] = useState(shippingAddress.comment || '')

	const [isShipper, setIsShipper] = useState(
		shippingAddress.isShipper || false
	)
	const [isComment, setIsComment] = useState(
		shippingAddress.isComment || false
	)

	//shipper info

	const [shipperFullName, setShipperFullName] = useState(
		shippingAddress.shipperFullName || ''
	)
	const [shipperFurigana, setShipperFurigana] = useState(
		shippingAddress.shipperFurigana || ''
	)
	const [shipperPhoneNumber, setShipperPhoneNumber] = useState(
		shippingAddress.phoneNumber || ''
	)
	const [shipperAddress, setShipperAddress] = useState(
		shippingAddress.shipperAddress || ''
	)
	const [shipperBuilding, setShipperBuilding] = useState(
		shippingAddress.shipperBuilding || ''
	)
	const [shipperPrefecture, setShipperPrefecture] = useState(
		shippingAddress.shipperPrefecture && '北海道'
	)
	const [shipperPostalCode1, setShipperPostalCode1] = useState(
		(shippingAddress.shipperPostalCode &&
			shippingAddress.shipperPostalCode.substring(0, 3)) ||
			''
	)
	const [shipperPostalCode2, setShipperPostalCode2] = useState(
		(shippingAddress.shipperPostalCode &&
			shippingAddress.shipperPostalCode.substring(3, 7)) ||
			''
	)

	const shipperCheck = () => {
		setIsShipper(!isShipper)
	}
	const commentCheck = () => {
		setIsComment(!isComment)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		let postalCode
		if (postalCode1 !== '' && postalCode2 !== '') {
			postalCode = postalCode1 + postalCode2
		}
		let shipperPostalCode
		if (shipperPostalCode1 !== '' && shipperPostalCode2 !== '') {
			shipperPostalCode = shipperPostalCode1 + shipperPostalCode2
		}

		if (isShipper && isComment) {
			dispatch(
				saveShippingAddress({
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
				saveShippingAddress({
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
				saveShippingAddress({
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
				saveShippingAddress({
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
		// history.push('/payment')
		// history.push('/placeorder')
	}

	useEffect(() => {
		if (updated) history.push('/placeorder')
	}, [updated])

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
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
				<Button type='submit' variant='primary' className='mt-3'>
					次へ進む
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
