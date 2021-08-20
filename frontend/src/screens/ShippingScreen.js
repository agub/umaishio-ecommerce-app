import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'

import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [phoneNumber, setPhoneNumber] = useState(
		shippingAddress.phoneNumber || ''
	)
	const [address, setAddress] = useState(shippingAddress.address || '')
	const [prefecture, setPrefecture] = useState(
		shippingAddress.prefecture || '北海道'
	)
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	)
	console.log(prefecture)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			saveShippingAddress({
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
					<Form.Label>電話番号</Form.Label>
					<Form.Control
						type='number'
						value={phoneNumber}
						required
						onChange={(e) => setPhoneNumber(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode' className='mt-2'>
					<Form.Label>郵便番号</Form.Label>
					<Form.Control
						type='number'
						value={postalCode}
						maxLength='7'
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

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
