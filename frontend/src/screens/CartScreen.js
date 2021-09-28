import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
	Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Rating from '../components/Rating'
import '../styles/CartScreen.scss'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const [countQty, setCountQty] = useState(1)

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const productDetails = useSelector((state) => state.productDetails)
	const { loading } = productDetails

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		if (userInfo) {
			history.push('/shipping')
		} else {
			history.push('/login?redirect=shipping')
		}

		// history.push('/register?redirect=shipping')
	}

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	console.log(cartItems)
	return (
		<Row>
			<h1>ショッピングカート</h1>
			<Col lg={8} md={12}>
				{cartItems.length === 0 ? (
					<Message variant='info'>
						カートが空です
						<Link to='/shop' className='ms-3'>
							戻る
						</Link>
					</Message>
				) : (
					<div>
						{cartItems.map((item) => (
							<div
								className='item-responsive-wrap__g mb-3'
								key={item.product}
							>
								<Row className='cart-row'>
									<Col xs={4} md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col
										xs={8}
										md={10}
										className='cart-row-right'
									>
										{/* <Row> */}
										<Col md={6} xs={12}>
											<div>
												<Link
													to={`/product/${item.product}`}
												>
													{item.name}
												</Link>
												<div>
													<div
														style={{
															fontSize: '10px',
														}}
													>
														<Rating
															value={4}
															text={`( xx )`}
														/>
													</div>
												</div>
											</div>
										</Col>
										{/* <Col
										md={1}
										sm={2}
										xs={3}
										style={{ textAlign: 'center' }}
									>
										<button
											className='cart-delete-btn'
											onClick={() =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											<i className='fas fa-trash'></i>
										</button>
									</Col> */}
										<Col
											md={2}
											xs={12}
											// sm={10}
											// xs={9}
											className='cart-select-wrap cart-row-mg__mobile'
										>
											<span className='cart-select-top'>
												数量
											</span>
											{/* <Form.Control */}
											{/* <select
												as='select'
												value={item.qty}
												className='cart-select-form'
												// className='cart-select-form form-select'
												onChange={(e) =>
													dispatch(
														addToCart(
															item.product,
															Number(
																e.target.value
															)
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
											</select> */}
											<div
												className='crement-wrap__g'
												// className='product-page-crement-wrap'
											>
												<button
													className='product-page-crement'
													onClick={() => {
														if (item.qty === 1) {
															return
														} else {
															dispatch(
																addToCart(
																	item.product,
																	Number(
																		item.qty
																	) - 1
																)
															)
														}
													}}
												>
													<i className='fa fa-minus'></i>
												</button>
												<select
													className='form-select form-control-select__g'
													value={item.qty}
													onChange={(e) =>
														dispatch(
															addToCart(
																item.product,
																Number(
																	e.target
																		.value
																)
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
												</select>
												<button
													className='product-page-crement'
													onClick={() =>
														dispatch(
															addToCart(
																item.product,
																Number(
																	item.qty
																) + 1
															)
														)
													}
												>
													<i className='fas fa-plus'></i>
												</button>
											</div>
										</Col>

										<Col
											md={4}
											xs={12}
											className='cart-row-mg__mobile cart-row-total__mobile'
										>
											<button
												className='cart-delete-btn'
												onClick={() =>
													removeFromCartHandler(
														item.product
													)
												}
											>
												<i
													style={{
														fontWeight: 'normal',
													}}
													className='far fa-trash-alt'
												></i>
											</button>
											小計:
											<span className='cart-price'>
												¥{item.price}
											</span>
										</Col>
										{/* </Row> */}
									</Col>
								</Row>
							</div>
						))}
					</div>
				)}
			</Col>
			<Col lg={4} md={12}>
				<div className='item-responsive-wrap__g cart-price-wrap'>
					<p className='d-flex justify-content-between'>
						<span>注文内容:</span>
						<span>{`${getCartCount()}件`}</span>
					</p>
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>商品合計:</span>
						<span>
							¥&nbsp;
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(0)}
						</span>
					</p>
					<p className='d-flex justify-content-between'>
						<span>送料:</span>
						<span>¥&nbsp; ????</span>
					</p>
					<p className='d-flex justify-content-between'>
						<span>消費税:</span>
						<span>¥&nbsp; ????</span>
					</p>
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>商品合計:</span>
						<span>¥&nbsp; ????</span>
					</p>

					{/* fix this to 0 for yen */}
				</div>
				<div>
					<Button
						className='next-gradient-btn__g cart-next-btn mt-4'
						disabled={cartItems.length === 0}
						onClick={checkoutHandler}
						type='button'
					>
						レジに進む
					</Button>
					<Link to='/shop'>
						<Button
							// variant='secondary'
							className='cart-back-btn mt-4'
							type='button'
							// className='btn-block w-100'
						>
							戻る
						</Button>
					</Link>
				</div>
			</Col>
		</Row>
	)
}

export default CartScreen
