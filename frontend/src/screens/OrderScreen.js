import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, ListGroup, Image, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetail,
	getOrderDetails,
	payOnStirpe,
	payOrder,
	deliverOrder,
} from '../actions/orderActions'
import { STRIPE_PAY_RESET } from '../constants/orderConstants'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CheckoutSteps from '../components/CheckoutSteps'
import { CART_ITEMS_RESET } from '../constants/cartConstants'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [name, setName] = useState('')
	const [errorText, setErrorText] = useState(null)

	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	const orderId = match.params.id

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const stripePay = useSelector((state) => state.stripePay)
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = stripePay
	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
		if (successPay || !order || order._id !== orderId || successDeliver) {
			dispatch({ type: STRIPE_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(orderId))
		}
		if (successPay) {
			localStorage.setItem('cartItems', [])
			dispatch({ type: CART_ITEMS_RESET })
		}
	}, [dispatch, order, orderId, successPay, successDeliver])

	const submitHandler = async (e) => {
		e.preventDefault()
		setErrorText('')
		try {
			if (name !== '' && order) {
				const {
					error,
					paymentMethod,
				} = await stripe.createPaymentMethod({
					type: 'card',
					card: elements.getElement(CardElement),
				})
				const { id } = paymentMethod
				console.log(orderId)
				console.log(error)

				//api connect to stripe
				// const { paymentResult } = axios.put()
				// const paymentResult = {
				// 	id: 'idsample',
				// 	status: 'completed',
				// 	update_time: 'updatetime',
				// 	payer: { email_address: 'fasdfas' },
				// }
				const paymentDetails = {
					id: id,
					amount: order.totalPrice,
					name: name,
					metadata: {
						email_address: order.user.email,
						userId: order.user._id,
						orderId: orderId,
						fullName: order.shippingAddress.fullName,
						postalCode: order.shippingAddress.postalCode,
						prefecture: order.shippingAddress.prefecture,
						address: order.shippingAddress.address,
						status: 'COMPLETED',
						update_time: Date.now(),
					},
				}
				dispatch(payOnStirpe(orderId, paymentDetails))
				// console.log(paymentResult)
				// dispatch(payOrder(orderId, paymentDetails))
			}
		} catch (error) {
			console.log(error)
			setErrorText('正しく記入してください')
		}
		// const paymentResult = {
		// 	id: req.body.id,
		// 	status: req.body.status,
		// 	update_time: req.body.update_time,
		// 	email_address: req.body.payer.email_address,
		// }
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	return loading ? (
		<>
			<Loader />
			{/* <h3>少しお時間がかかることがあります。</h3> */}
		</>
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<Row>
				{!order.isPaid && <CheckoutSteps step1 step2 step3 step4 />}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h4>配送</h4>
							<p className='mt-3'>
								<strong>氏名: </strong>
								{order.shippingAddress.fullName}
							</p>
							<p>
								<strong>電話番号: </strong>
								{order.shippingAddress.phoneNumber}
							</p>
							<p>
								<strong>郵便番号: </strong>
								{/* {order.shippingAddress.postalCode} */}
								{order.shippingAddress.postalCode &&
									order.shippingAddress.postalCode.substring(
										0,
										3
									)}
								-
								{order.shippingAddress.postalCode &&
									order.shippingAddress.postalCode.substring(
										3,
										7
									)}
							</p>
							<p>
								<strong>住所: </strong>
								{order.shippingAddress.prefecture}
								{order.shippingAddress.address}
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									配送完了
									{order.deliveredAt.substring(0, 10)}
								</Message>
							) : null}
						</ListGroup.Item>
						<ListGroup.Item className='mt-3'>
							<h4>お支払い方法</h4>
							<Col>
								<Form.Check
									className='mt-3'
									type='radio'
									label='クレジットカード'
									id='PayPal'
									name='paymentMethod'
									defaultChecked
								></Form.Check>
							</Col>
							{!order.isPaid && (
								<>
									<Form.Group
										controlId='address'
										className='mt-2'
									>
										{/* <Form.Label>クレジットカード名義人</Form.Label> */}
										<Form.Control
											type='text'
											required
											placeholder='カード名義人'
											onChange={(e) =>
												setName(e.target.value)
											}
										></Form.Control>
									</Form.Group>
									<CardElement
										className='mt-3 mb-3'
										// disabled={true}
										// onBlur
										required
										hidePostalCode={true}
										options={{
											style: {
												base: {
													fontSize: '16px',
													'::placeholder': {
														color: '#aab7c4',
													},
												},
												invalid: {
													color: '#9e2146',
												},
											},
										}}
									/>
								</>
							)}
							{order.isPaid && (
								<Message variant='success'>
									お支払い済み {order.paidAt.substring(0, 10)}
								</Message>
							)}
							{errorText && (
								<Message variant='danger'>{errorText}</Message>
							)}
							{errorPay && (
								<Message variant='danger'>{errorPay}</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item className='mt-3'>
							<Form.Group controlId='prefecture' className='mt-2'>
								<h4>配送オプション</h4>
								<p className='mt-3'>お届け予定日: </p>
								{/* <Form.Label></Form.Label> */}
								<Form.Control
									disabled={order.isPaid}
									className='form-select'
									as='select'
									placeholder='選択してください'
									required
									defaultValue={'aa'}
								>
									<option>ヤマトとか？ + ¥200</option>
								</Form.Control>
							</Form.Group>
						</ListGroup.Item>
						<ListGroup.Item className='mt-3'>
							<h4>注文内容を確認</h4>
							{order.orderItems.length === 0 ? (
								<Message>注文がありません</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													¥{item.price} x {item.qty} =
													¥{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item className='mt-3'>
								<h2>注文内容</h2>
								<p>ID:{order._id}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>商品の小計</Col>
									<Col>¥&nbsp;{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>配送料</Col>
									<Col>¥&nbsp;{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>税込合計</Col>
									<Col>¥&nbsp;{order.totalPrice}　</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay ? (
										<Loader />
									) : (
										<Button
											type='button'
											className='btn-block w-100'
											disabled={
												!stripe ||
												cart.cartItems === 0 ||
												loadingPay ||
												successPay
											}
											onClick={submitHandler}
										>
											注文を確定する
										</Button>
									)}
								</ListGroup.Item>
							)}

							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block w-100'
											onClick={deliverHandler}
										>
											配送済み
										</Button>
									</ListGroup.Item>
								)}
							{/* <ListGroup.Item>
							 {error && (
									<Message variant='danger'>{error}</Message>
				
							</ListGroup.Item> */}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
