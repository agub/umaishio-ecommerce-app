import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'

import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [fullName, setFullName] = useState(shippingAddress.fullName || '')
	const [phoneNumber, setPhoneNumber] = useState(
		shippingAddress.phoneNumber || ''
	)
	const [address, setAddress] = useState(shippingAddress.address || '')
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

	console.log(prefecture)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		let postalCode
		if (postalCode1 !== '' && postalCode2 !== '') {
			postalCode = postalCode1 + postalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
		}
		console.log(postalCode)
		dispatch(
			saveShippingAddress({
				fullName,
				phoneNumber,
				postalCode,
				prefecture,
				address,
			})
		)
		// history.push('/payment')
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
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

				<Button type='submit' variant='primary' className='mt-3'>
					次へ進む
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
