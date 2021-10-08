import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import EditableCartItems from '../components/EditableCartItems'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { saveShippingAddress } from '../actions/cartActions'
import ShippingForm from '../components/ShippingForm'
import ShipperForm from '../components/ShipperForm'

import Loader from '../components/Loader'
import { registerGuest } from '../actions/userActions'
import Message from '../components/Message'

import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const GuestShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	const cart = useSelector((state) => state.cart)
	const { shippingAddress, updated, loading, cartItems } = cart

	const userRegister = useSelector((state) => state.userRegister)
	const {
		loading: registerLoading,
		error: registerError,
		userInfo: registerUserInfo,
	} = userRegister

	const [email, setEmail] = useState('')

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

	//guest signin

	const submitHandler = (e) => {
		e.preventDefault()
		try {
			guestHandler()
		} catch (error) {
			console.log(error)
		}
	}

	const guestHandler = () => {
		if (email !== '') {
			dispatch(registerGuest(email))
		}
	}

	useEffect(() => {
		if (registerUserInfo) {
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
		}

		//registered
	}, [registerUserInfo]) // eslint-disable-line react-hooks/exhaustive-deps

	//PlaceOrderScreen

	// cart.itemsPrice = cart.cartItems.reduce

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(0)
	}

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 0)
	cart.taxPrice = addDecimals(Number((0.08 * cart.itemsPrice).toFixed(0)))
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(0)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error, loading: loadingOrder } = orderCreate

	//PlaceOrderScreen

	useEffect(() => {
		if (updated) {
			dispatch(
				createOrder({
					orderItems: cart.cartItems,
					shippingAddress: cart.shippingAddress,
					itemsPrice: cart.itemsPrice,
					shippingPrice: cart.shippingPrice,
					totalPrice: cart.totalPrice,
				})
			)
		}
		if (success) {
			history.push(`/order/${order._id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
	}, [updated, success, history]) // eslint-disable-line react-hooks/exhaustive-deps

	const [showCart, setShowCart] = useState(false)
	const showCartClose = () => {
		setShowCart(!showCart)
	}

	return (
		<>
			<Form onSubmit={submitHandler}>
				<Meta />
				<Row>
					<CheckoutSteps number={0} />
					{registerError && (
						<Message variant='danger'>{registerError}</Message>
					)}
					{error && <Message variant='danger'>{error}</Message>}
					<h1>お届け先の住所</h1>
					<Col lg={8} md={12}>
						<div className='shippingContainer shipping-form-container'>
							{/* responsiveCss */}
							<Form.Group controlId='postalCode' className='mt-2'>
								<Form.Label>
									<div className='shipping-form-lable__g'>
										メールアドレス{' '}
										<span className='form-asterisk__g'>
											*
										</span>
									</div>
								</Form.Label>
								<div className='form-container-pw-icon__g'>
									<Form.Control
										type='email'
										value={email}
										placeholder='メールアドレス'
										required
										onChange={(e) =>
											setEmail(e.target.value)
										}
									></Form.Control>
								</div>
							</Form.Group>
							<p className='m-2 shipping-form-example__g'>
								例: umaishio@gmail.com
							</p>
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
								<Form.Group
									controlId='comment'
									className='mt-3'
								>
									<Form.Label>ご要望内容</Form.Label>
									<div className='form-container-pw-icon__g'>
										<Form.Control
											as='textarea'
											required
											row='3'
											onChange={(e) =>
												setComment(e.target.value)
											}
											value={comment}
										></Form.Control>
									</div>
								</Form.Group>
							)}
						</div>
					</Col>
					<Col lg={4} md={12}>
						<div className='shipper-wrap__g cart-price-wrap'>
							{cartItems.map((item) => (
								<EditableCartItems item={item} key={item} />
							))}
							<p className='underline__g'></p>
							<p className='d-flex justify-content-between'>
								<span>商品合計:</span>
								<span>
									¥&nbsp;
									{cart.itemsPrice}
								</span>
							</p>
							<p className='d-flex justify-content-between'>
								<span>送料:</span>
								<span>未定</span>
							</p>
							<p className='underline__g'></p>
							<p className='d-flex justify-content-between'>
								<span>合計:</span>
								<span>¥&nbsp;{cart.totalPrice}</span>
							</p>
							{/* fix this to 0 for yen */}
						</div>
						<div>
							{loading || loadingOrder || registerLoading ? (
								<Loader />
							) : (
								<>
									<Button
										type='submit'
										className='next-gradient-btn__g cart-next-btn mt-4'
										disabled={cart.length === 0}
										// onClick={submitHandler}
									>
										レジに進む
									</Button>
									<Link to='/cart'>
										<Button className='cart-back-btn mt-4'>
											買い物を続ける
										</Button>
									</Link>
								</>
							)}
						</div>
					</Col>
				</Row>
			</Form>
			<Modal show={showCart} onHide={showCartClose} centered>
				{/* <div> */}
				<div className='item-modal-wrap__g'>
					{cartItems.map((item) => (
						<EditableCartItems item={item} key={item} />
					))}
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>商品合計:</span>
						<span>
							¥&nbsp;
							{cart.itemsPrice}
						</span>
					</p>
					<p className='d-flex justify-content-between'>
						<span>送料:</span>
						<span>未定</span>
					</p>
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>合計:</span>
						<span>¥&nbsp;{cart.totalPrice}</span>
					</p>

					<Button
						// variant='secondary'
						className='cart-back-btn mt-4'
						onClick={() => showCartClose()}
						// type='button'
						// className='btn-block w-100'
					>
						閉じる
					</Button>
				</div>
			</Modal>
			{!showCart && (
				<button
					className='cartTo shipping-cart-btn'
					onClick={() => setShowCart(!showCart)}
					style={{ borderWidth: 0 }}
				>
					<div className='home-cartButton'>
						<i
							style={{ marginRight: '4px', marginTop: '5px' }}
							className='fas fa-shopping-cart'
						></i>{' '}
						<span
							style={{ marginLeft: '6px', marginTop: '3px' }}
							className='header-cartnumber'
						>
							{getCartCount()}
						</span>
					</div>
				</button>
			)}
		</>
	)
}

export default GuestShippingScreen
