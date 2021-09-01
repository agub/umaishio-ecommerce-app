import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const productDetails = useSelector((state) => state.productDetails)
	const { loading } = productDetails

	console.log(cartItems)

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
		// history.push('/register?redirect=shipping')
	}

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	return (
		<Row>
			<Col md={8}>
				<h1>ショッピングカート</h1>
				{cartItems.length === 0 ? (
					<Message variant='info'>
						カートが空です
						<Link to='/' className='ms-3'>
							戻る
						</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={4}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>¥ {item.price}</Col>
									<Col md={2} sm={10} xs={9}>
										<Form.Control
											as='select'
											value={item.qty}
											className='form-select form-control-select-checkout'
											style={{
												padding:
													'0.75rem 0.2rem 0.75rem 0.4rem',
											}}
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[
												...Array(
													item.countInStock
												).keys(),
											].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={1} sm={2} xs={3}>
										<Button
											type='button'
											variant='light'
											onClick={() =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<p className='subtotal-text'>
								カートの小計:　(
								{/* {cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)} */}
								{getCartCount()}
								個の商品)
							</p>
							¥&nbsp;
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(0)}
							{/* fix this to 0 for yen */}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block w-100'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								レジに進む
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
