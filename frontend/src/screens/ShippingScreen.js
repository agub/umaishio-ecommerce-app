import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { saveShippingAddress } from '../actions/cartActions'
import ShippingForm from '../components/ShippingForm'
import ShipperForm from '../components/ShipperForm'
import AddressHistory from '../components/AddressHistory'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

import EditableCartItems from '../components/EditableCartItems'

import '../styles/ShippingScreen.scss'

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	const cart = useSelector((state) => state.cart)
	const { shippingAddress, updated, loading, cartItems } = cart

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

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

	const submitHandler = (e) => {
		e.preventDefault()
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
		// history.push('/payment')
		// history.push('/placeorder')
	}

	//modal
	const [show, setShow] = useState(true)
	const handleClose = () => setShow(false)
	const [useAddressHistory, setUseAddressHistory] = useState(false)

	//modal

	//PlaceOrderScreen

	const addDecimals = (num) => {
		return Math.round(num * 100) / 100
	}

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
	// cart.taxPrice = addDecimals(Number((0.08 * cart.itemsPrice).toFixed(0)))
	cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)
	// +Number(cart.taxPrice)
	// .toFixed(0)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error, loading: loadingOrder } = orderCreate

	//PlaceOrderScreen

	//Shipping Address History
	useEffect(() => {
		if (
			userInfo &&
			!userInfo.isGuest &&
			Object.keys(userInfo.shippingAddress).length === 0 &&
			userInfo.shippingAddress.constructor === Object
		) {
			handleClose()
		}
		if (
			useAddressHistory &&
			Object.keys(userInfo.shippingAddress).length !== 0
		) {
			setFullName(userInfo.shippingAddress.fullName || '')
			setFurigana(userInfo.shippingAddress.furigana || '')
			setPhoneNumber(userInfo.shippingAddress.phoneNumber || '')
			setPostalCode1(
				(userInfo.shippingAddress.postalCode &&
					userInfo.shippingAddress.postalCode.substring(0, 3)) ||
					''
			)
			setPostalCode2(
				(userInfo.shippingAddress.postalCode &&
					userInfo.shippingAddress.postalCode.substring(3, 7)) ||
					''
			)
			setPrefecture(userInfo.shippingAddress.prefecture || '')
			setAddress(userInfo.shippingAddress.address || '')
			setBuilding(userInfo.shippingAddress.building || '')
		}
	}, [userInfo, useAddressHistory])

	//Shipping Address History

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
	}, [history, userInfo])

	//submit order and move to order
	useEffect(() => {
		if (updated) {
			dispatch(
				createOrder({
					orderItems: cart.cartItems,
					shippingAddress: cart.shippingAddress,
					// paymentMethod: cart.paymentMethod,
					itemsPrice: cart.itemsPrice,
					shippingPrice: cart.shippingPrice,
					// taxPrice: cart.taxPrice,
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

	// shoppingcart modal

	const [showCart, setShowCart] = useState(false)
	const showCartClose = () => {
		setShowCart(!showCart)
	}
	// useEffect(() => {
	// 	dispatch(addToCart(productId, qty))
	// }, [dispatch, productId, qty])
	// shoppingcart modal

	return (
		// <FormContainer>
		<>
			<Form
				onSubmit={submitHandler}
				// className='shippingContainer shipping-form-container'
			>
				<Row>
					<CheckoutSteps number={0} />
					<h1>お届け先の住所</h1>

					<Col lg={8} md={12}>
						{userInfo && !userInfo.isGuest ? (
							<AddressHistory
								show={show}
								handleClose={handleClose}
								userInfo={userInfo}
								setUseAddressHistory={setUseAddressHistory}
							/>
						) : null}

						{error && <Message varient='danger'>{error}</Message>}
						<div className='shippingContainer shipping-form-container'>
							{/* responsiveCss */}
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
								label='お届け先住所と発送元が異なる場合'
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
								<EditableCartItems
									item={item}
									key={item.product}
								/>
							))}
							<p className='underline__g'></p>
							<p className='d-flex justify-content-between'>
								<span>商品合計:</span>
								<span>
									¥&nbsp;
									{cart.itemsPrice.toLocaleString()}
								</span>
							</p>
							<p className='d-flex justify-content-between'>
								<span>送料:</span>
								<span>未定</span>
							</p>
							{/* <p className='d-flex justify-content-between'>
								<span>消費税:</span>
								<span>¥&nbsp; ????</span>
							</p> */}
							<p className='underline__g'></p>
							<p className='d-flex justify-content-between'>
								<span>合計:</span>
								<span>
									¥&nbsp;{cart.totalPrice.toLocaleString()}
								</span>
							</p>
							{/* fix this to 0 for yen */}
						</div>
						<div>
							{loading || loadingOrder ? (
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
										<Button
											// variant='secondary'
											className='cart-back-btn mt-4'
											// type='button'
											// className='btn-block w-100'
										>
											買い物を続ける
										</Button>
									</Link>
								</>
							)}
						</div>
					</Col>
				</Row>
			</Form>

			{/* <button
				className='stickyBottom'
				onClick={() => setShowCart(!showCart)}
			>
				買い物カゴ　<i className='fas fa-shopping-cart'></i>
				{getCartCount()}点
			</button> */}
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

			{/* ________________________________________________________________________________ */}
			<Modal show={showCart} onHide={showCartClose} centered>
				{/* <div> */}
				<div className='item-modal-wrap__g'>
					{cartItems.map((item) => (
						<EditableCartItems item={item} key={item.product} />
					))}
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>商品合計:</span>
						<span>
							¥&nbsp;
							{cart.itemsPrice.toLocaleString()}
						</span>
					</p>
					<p className='d-flex justify-content-between'>
						<span>送料:</span>
						<span>未定</span>
					</p>
					<p className='underline__g'></p>
					<p className='d-flex justify-content-between'>
						<span>合計:</span>
						<span>¥&nbsp;{cart.totalPrice.toLocaleString()}</span>
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
		</>
		// </FormContainer>
	)
}

export default ShippingScreen
