import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, ListGroup, Image, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import Loader from '../components/Loader'

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	cart.itemsPrice = cart.cartItems.reduce

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(0)
	}

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
	cart.taxPrice = addDecimals(Number((0.08 * cart.itemsPrice).toFixed(0)))
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(0)
	// cart.itemsPrice = cart.itemsPrice.toFixed(0)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error, loading: loadingOrder } = orderCreate
	// const orderDetails = useSelector((state) => state.orderDetails)
	// const { loading } = orderDetails

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
		// eslint-disable-next-line
	}, [history, success])

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				// paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}
	return (
		<>
			<Row>
				<CheckoutSteps step1 step2 step3 />
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h4>お届け先</h4>
							<p>
								{/* <strong>氏名: </strong> */}
								<strong>〒</strong>
								{cart.shippingAddress.postalCode &&
									cart.shippingAddress.postalCode.substring(
										0,
										3
									)}
								-
								{cart.shippingAddress.postalCode &&
									cart.shippingAddress.postalCode.substring(
										3,
										7
									)}
								<br />
								{/* <strong>住所: </strong> */}
								{cart.shippingAddress.prefecture}
								{cart.shippingAddress.address}
								<br />
								{cart.shippingAddress.building !== '' &&
									cart.shippingAddress.building}
								{cart.shippingAddress.fullName}
								<br />
								{cart.shippingAddress.phoneNumber && (
									<>
										<i
											className='fa fa-phone'
											style={{
												display: 'inline-block',
												transform: 'scaleX(-1)',
												marginRight: '5px',
											}}
											aria-hidden='true'
										></i>
										{cart.shippingAddress.phoneNumber}
									</>
								)}
							</p>
							{/* {cart && cart.shippingAddress.comment && (
								<p>
									<strong>ご要望: </strong>
									{cart.shippingAddress.comment}
								</p>
							)} */}
						</ListGroup.Item>
						{cart && cart.shippingAddress.isShipper && (
							<ListGroup.Item>
								<h4>依頼人住所</h4>
								<p>
									{/* <strong>氏名: </strong> */}
									<strong>〒</strong>
									{cart.shippingAddress.shipperPostalCode &&
										cart.shippingAddress.shipperPostalCode.substring(
											0,
											3
										)}
									-
									{cart.shippingAddress.shipperPostalCode &&
										cart.shippingAddress.shipperPostalCode.substring(
											3,
											7
										)}
									<br />
									{/* <strong>住所: </strong> */}
									{cart.shippingAddress.shipperPrefecture}
									{cart.shippingAddress.address}
									{cart.shippingAddress.building !== '' &&
										cart.shippingAddress.building}
									<br />
									{cart.shippingAddress.shipperFullName}
									<br />
									<i
										className='fa fa-phone'
										style={{
											display: 'inline-block',
											transform: 'scaleX(-1)',
											marginRight: '5px',
										}}
										aria-hidden='true'
									></i>
									{cart.shippingAddress.phoneNumber}
								</p>
							</ListGroup.Item>
						)}
						{cart && cart.shippingAddress.comment && (
							<ListGroup.Item>
								<p>
									<strong>ご要望: </strong>
									{cart.shippingAddress.comment}
								</p>
							</ListGroup.Item>
						)}

						{/* <ListGroup.Item>
							<h4>お支払い方法</h4>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item> */}
						<ListGroup.Item>
							<h4>注文内容を確認</h4>
							{cart.cartItems.length === 0 ? (
								<Message>カートが空です</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
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
							<ListGroup.Item>
								<h2>注文内容</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>商品の小計</Col>
									<Col>¥{cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>消費税</Col>
									<Col>¥{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>配送料</Col>
									<Col>¥{cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* <ListGroup.Item>
								<Row>
									<Col>税金</Col>
									<Col>¥{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item> */}
							<ListGroup.Item>
								<Row>
									<Col>合計</Col>
									<Col>¥{cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* <ListGroup.Item> */}
							{/* {error && (
									<Message variant='danger'>{error}</Message>
								)} */}
							{/* </ListGroup.Item> */}

							{error && (
								<ListGroup.Item>
									<Message varient='danger'>{error}</Message>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								{loadingOrder ? (
									<Loader />
								) : (
									<Button
										type='button'
										className='btn-block w-100'
										disabled={
											cart.cartItems === 0 || loadingOrder
										}
										onClick={placeOrderHandler}
									>
										支払いへ進む
									</Button>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
