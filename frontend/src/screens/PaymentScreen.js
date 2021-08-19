import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { PREF_OPTIONS } from '../data/Prefecture'

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('paypal')

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<>
			<FormContainer>
				<CheckoutSteps step1 step2 step3 />
				<h1>Payment Method</h1>
				<Form onClick={submitHandler}>
					<Form.Group>
						<Form.Label as='legend'>select method</Form.Label>
						<Col>
							<Form.Check
								type='radio'
								label='paypal or credit card'
								checked
								id='paypal'
								name='paymentMethod'
								value='Paypal'
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}
							></Form.Check>
						</Col>
					</Form.Group>
					<Button type='submit' variant='primary' className='mt-3'>
						次へ進む
					</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default PaymentScreen
