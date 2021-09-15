import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
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

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { shippingAddress, updated, loading } = cart

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

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error, loading: loadingOrder } = orderCreate

	//PlaceOrderScreen

	//Shipping Address History
	useEffect(() => {
		if (
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
					taxPrice: cart.taxPrice,
					totalPrice: cart.totalPrice,
				})
			)
		}
		if (success) {
			history.push(`/order/${order._id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
	}, [updated, success, history])

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			{!userInfo.isGuest ? (
				<AddressHistory
					show={show}
					handleClose={handleClose}
					userInfo={userInfo}
					setUseAddressHistory={setUseAddressHistory}
				/>
			) : null}

			<h1>お届け先の住所</h1>
			{error && <Message varient='danger'>{error}</Message>}
			<Form onSubmit={submitHandler} className='shippingContainer'>
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
					<Form.Group controlId='comment' className='mt-3'>
						<Form.Label>ご要望内容</Form.Label>
						<Form.Control
							as='textarea'
							required
							row='3'
							onChange={(e) => setComment(e.target.value)}
							value={comment}
						></Form.Control>
					</Form.Group>
				)}
				{loading || loadingOrder ? (
					<Loader />
				) : (
					<Button type='submit' variant='primary' className='mt-3'>
						次へ進む
					</Button>
				)}
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
