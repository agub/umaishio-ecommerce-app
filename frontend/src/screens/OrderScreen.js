import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, ListGroup, Image, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetails,
	payOnStirpe,
	deliverOrder,
	bankTransferOrder,
} from '../actions/orderActions'
import { STRIPE_PAY_RESET } from '../constants/orderConstants'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CheckoutSteps from '../components/CheckoutSteps'
import { CART_ITEMS_RESET } from '../constants/cartConstants'
import {
	ORDER_DELIVER_RESET,
	BANKTRANSFER_RESET,
} from '../constants/orderConstants'
import CvcModal from '../components/CvcModal'
import ModifyShippingInfoModal from '../components/ModifyShippingInfoModal'

const OrderScreen = ({ match, history, location }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [name, setName] = useState('')
	const [errorText, setErrorText] = useState(null)

	//Cvcmodal
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	//Cvcmodal

	//changeaddressmodal
	const [shippingModal, setShippingModal] = useState(false)
	const shippingModalClose = () => setShippingModal(false)
	const shippingModalShow = () => setShippingModal(true)
	//Cvcmodal

	//paymentMethod
	const [bankTransferState, setBankTransferState] = useState(false)
	//paymentMethod

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
	const bankTransfer = useSelector((state) => state.bankTransfer)
	const {
		loading: loadingBankTransfer,
		success: successBankTransfer,
	} = bankTransfer

	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
		if (
			successPay ||
			!order ||
			order._id !== orderId ||
			successDeliver ||
			successBankTransfer
		) {
			dispatch({ type: STRIPE_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch({ type: BANKTRANSFER_RESET })
			dispatch(getOrderDetails(orderId))
		}
		if (successPay || successBankTransfer) {
			localStorage.setItem('cartItems', [])
			dispatch({ type: CART_ITEMS_RESET })
		}
	}, [
		dispatch,
		order,
		orderId,
		successPay,
		successDeliver,
		successBankTransfer,
	])

	const submitHandler = async (e) => {
		e.preventDefault()

		setErrorText('')
		try {
			if (name !== '' && order && !bankTransferState) {
				if (!stripe || !elements) {
					return
				}
				const {
					error,
					paymentMethod,
				} = await stripe.createPaymentMethod({
					type: 'card',
					card: elements.getElement(CardElement),
				})
				const { id } = paymentMethod
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
			} else if (!bankTransferState) {
				setErrorText('正しく記入してください')
			} else {
				console.log('bankTransfer')
				dispatch(bankTransferOrder(orderId))
			}
		} catch (error) {
			console.log(error)
			setErrorText('正しく記入してください')
		}
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	const toBankTransfer = (boolean) => {
		setBankTransferState(boolean)
		setErrorText('')
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
				{(!order.isPaid || !order.isBankTransfer) && (
					<CheckoutSteps step1 step2 step3 step4 />
				)}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h4>配送先</h4>

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
							{order && order.shippingAddress.isShipper && (
								<>
									<h4 className='mt-5'>依頼人住所</h4>
									<p className='mt-3'>
										<strong>氏名: </strong>
										{order.shippingAddress.shipperFullName}
									</p>
									<p>
										<strong>電話番号: </strong>
										{
											order.shippingAddress
												.shipperPhoneNumber
										}
									</p>
									<p>
										<strong>郵便番号: </strong>
										{/* {order.shippingAddress.postalCode} */}
										{order.shippingAddress
											.shipperPostalCode &&
											order.shippingAddress.shipperPostalCode.substring(
												0,
												3
											)}
										-
										{order.shippingAddress
											.shipperPostalCode &&
											order.shippingAddress.shipperPostalCode.substring(
												3,
												7
											)}
									</p>
									<p>
										<strong>住所: </strong>
										{
											order.shippingAddress
												.shipperPrefecture
										}
										{order.shippingAddress.shipperAddress}
									</p>
								</>
							)}
							{order && order.shippingAddress.comment && (
								<p>
									<strong>ご要望: </strong>
									{order.shippingAddress.comment}
								</p>
							)}
							{userInfo &&
								order &&
								!order.isDelivered &&
								!order.isBankTransfer &&
								!order.isPaid && (
									<div
										style={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Button
											variant='danger'
											onClick={shippingModalShow}
										>
											変更する
										</Button>
									</div>
								)}

							<ModifyShippingInfoModal
								match={match}
								show={shippingModal}
								handleClose={shippingModalClose}
								history={history}
							/>
							{order.isDelivered ? (
								<Message variant='success'>
									配送完了
									{order.deliveredAt.substring(0, 10)}
								</Message>
							) : null}
							{!order.isPaid && order.isBankTransfer && (
								<Message variant='danger'>
									注文ありがとうございした。
									<br />
									振り込み確認後の配送になります。
								</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item className='mt-3'>
							<h4>お支払い方法</h4>
							{order && !order.isPaid && !order.isBankTransfer ? (
								<Col>
									<Form.Check
										className='mt-3'
										type='radio'
										label='クレジットカード'
										id='Stripe'
										name='paymentMethod'
										onClick={() => toBankTransfer(false)}
										defaultChecked
									></Form.Check>
									<Form.Check
										className='mt-3'
										type='radio'
										label='銀行振り込み'
										id='bank'
										name='paymentMethod'
										onClick={() => toBankTransfer(true)}
									></Form.Check>
								</Col>
							) : null}

							{order &&
							!order.isPaid &&
							!order.isBankTransfer &&
							!bankTransferState ? (
								<>
									<Form.Group
										controlId='address'
										className='mt-2'
									>
										{/* <Form.Label>クレジットカード名義人</Form.Label> */}
										<Form.Control
											type='text'
											required
											disabled={bankTransferState}
											placeholder='カード名義人'
											onChange={(e) =>
												setName(e.target.value)
											}
										></Form.Control>
									</Form.Group>
									<CardElement
										className='mt-3 mb-3'
										disabled={true}
										required
										hidePostalCode={true}
										options={{
											style: {
												base: {
													fontSize: '16px',
													'::placeholder': {
														color: '#919AA1',
													},
												},
												invalid: {
													color: '#919AA1',
												},
											},
										}}
									/>
									{/* <div>
										<span
											style={{
												fontSize: '13px',
												display: 'block',
												width: '80px',
												marginLeft: 'auto',
											}}
											onClick={handleShow}
										>
											CVCとは
											<i className='far fa-question-circle'></i>
										</span>
									</div> */}

									<div
										style={{
											display: 'flex',
											justifyContent: 'flex-end',
											alignItems: 'center',
										}}
									>
										<Button
											variant='flush'
											onClick={handleShow}
										>
											CVCとは
											<i className='far fa-question-circle'></i>
										</Button>
									</div>
									<CvcModal
										show={show}
										handleClose={handleClose}
									/>
								</>
							) : null}
							{bankTransferState || order.isBankTransfer ? (
								<p className='mt-3'>
									銀行振り込み口座
									<br />
									口座番号: XXXXXXXXXXX
									<br />
									名前: XXXXXXXXXXX
									<br />
									振込額: ¥{order.totalPrice}
								</p>
							) : null}
							{order && order.isPaid && (
								<Message variant='success'>
									お支払い済み {order.paidAt.substring(0, 10)}
								</Message>
							)}
							{errorText && (
								<Message variant='danger'>{errorText}</Message>
							)}
							{errorPay && (
								<Message variant='danger'>
									{errorPay}
									<br />
									<a href='mailto: abc@example.com'>
										カスタマーサービスへお問い合わせはこちらへ
									</a>
								</Message>
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
												<Col md={1} xs={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col xs={5}>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4} xs={5}>
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
									<Col>消費税</Col>
									<Col>¥&nbsp;{order.taxPrice}</Col>
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
							{!order.isPaid && !order.isBankTransfer && (
								<ListGroup.Item>
									{loadingPay || loadingBankTransfer ? (
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
								order &&
								userInfo.isAdmin &&
								!order.isDelivered &&
								(order.isBankTransfer || order.isPaid) && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block w-100'
											onClick={deliverHandler}
										>
											入金確認＆配送ボタン
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
