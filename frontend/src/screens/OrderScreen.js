import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, ListGroup, Image, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetail,
	getOrderDetails,
	payOrder,
} from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import axios from 'axios'

const OrderScreen = ({ match }) => {
	const orderId = match.params.id

	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	// useEffect(() => {
	// 	dispatch(getOrderDetails(orderId))
	// }, [dispatch, orderId])

	useEffect(() => {
		if (!order || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch(getOrderDetails(orderId))
		}
	}, [order, orderId, dispatch])

	const submitHandler = async () => {
		try {
			//api connect to stripe
			// const { paymentResult } = axios.put()
			const paymentResult = {
				id: 'idsample',
				status: 'completed',
				update_time: 'updatetime',
				payer: { email_address: 'fasdfas' },
			}
			console.log(paymentResult)
			dispatch(payOrder(orderId, paymentResult))
		} catch (error) {
			console.log(error)
		}
		// const paymentResult = {
		// 	id: req.body.id,
		// 	status: req.body.status,
		// 	update_time: req.body.update_time,
		// 	email_address: req.body.payer.email_address,
		// }
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
				{/* <CheckoutSteps step1 step2 step3 step4 /> */}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h4>配送</h4>

							<p>
								<strong>お名前: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>電話番号: </strong>
								{order.shippingAddress.phoneNumber}
							</p>
							<p>
								<strong>郵便番号: </strong>
								{order.shippingAddress.postalCode}
							</p>
							<p>
								<strong>住所: </strong>
								{order.shippingAddress.prefecture}
								{order.shippingAddress.address}
							</p>
							{order.isDelievered ? (
								<Message variant='success'>
									配送中です {order.delieveredAt}
								</Message>
							) : (
								<Message variant='danger'>配送中です</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h4>お支払い方法</h4>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>
									paid on {order.paidAt}
								</Message>
							) : (
								<Message variant='danger'>not paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
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
							<ListGroup.Item>
								<h2>注文内容</h2>
								<p>ID:{order._id}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>商品の小計</Col>
									<Col>￥{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>配送料</Col>
									<Col>¥{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							{/* <ListGroup.Item>
								<Row>
									<Col>税金</Col>
									<Col>¥{order.taxPrice}</Col>
								</Row>
							</ListGroup.Item> */}
							<ListGroup.Item>
								<Row>
									<Col>合計</Col>
									<Col>¥{order.totalPrice}　*税込</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block w-100'
									disabled={cart.cartItems === 0}
									onClick={submitHandler}
								>
									注文を確定する
								</Button>
							</ListGroup.Item>
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
