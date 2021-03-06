import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import cartType from '../data/images/available_cards.png'
import cartType from '../data/images/card-types.png'
import {
	getOrderDetails,
	payOnStirpe,
	deliverOrder,
	bankTransferOrder,
} from '../actions/orderActions'
import {
	STRIPE_PAY_RESET,
	STRIPE_PAY_REQUEST,
	ORDER_DELIVER_RESET,
	BANKTRANSFER_RESET,
	STRIPE_PAY_LOADING_STOP,
	ORDER_UPDATE_SHIPPINGFEE_RESET,
} from '../constants/orderConstants'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CheckoutSteps from '../components/CheckoutSteps'
import { CART_ITEMS_RESET } from '../constants/cartConstants'

import CvcModal from '../components/CvcModal'
import ModifyShippingInfoModal from '../components/ModifyShippingInfoModal'
import {
	prefecture_600,
	prefecture_700,
	prefecture_750,
	prefecture_950,
	prefecture_1050,
} from '../data/Prefecture'
import PaymentRecieve from '../components/PaymentRecieve'

import '../styles/OrderScreen.scss'

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
	const [trackingId, setTrackingId] = useState('')

	//shippingOption
	const [shippingOption, setShippingOption] = useState({
		shippingOptionFee: null,
		shippingType: '',
	})

	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	const orderId = match.params.id

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const orderShippingFee = useSelector((state) => state.orderShippingFee)
	const {
		success: orderShippingFeeSuccess,
		loading: orderShippingFeeLoading,
	} = orderShippingFee

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
	const { success: successDeliver } = orderDeliver

	const getOrderDetailsHandler = () => {
		dispatch({ type: STRIPE_PAY_RESET })
		dispatch({ type: ORDER_DELIVER_RESET })
		dispatch({ type: BANKTRANSFER_RESET })
		dispatch(getOrderDetails(orderId))
	}

	useEffect(() => {
		if (!userInfo) {
			history.push(`/login?redirect=order/${orderId}`)
		}
		if (
			successPay ||
			!order ||
			order._id !== orderId ||
			successDeliver ||
			successBankTransfer
		) {
			getOrderDetailsHandler()
		}
		if (successPay || successBankTransfer) {
			// setTimeout(getOrderDetailsHandler(), 1000)
			// getOrderDetailsHandler()
			localStorage.setItem('cartItems', [])
			dispatch({ type: CART_ITEMS_RESET })
			// window.location.reload()
		}
	}, [
		// eslint-disable-line react-hooks/exhaustive-deps
		dispatch,
		order,
		orderId,
		successPay,
		successDeliver,
		successBankTransfer,
	])

	useEffect(() => {
		if (orderShippingFeeSuccess) {
			// setTimeout(getOrderDetailsHandler(), 1000)
			dispatch(getOrderDetails(orderId))
			dispatch({ type: ORDER_UPDATE_SHIPPINGFEE_RESET })
			localStorage.setItem('cartItems', [])
			dispatch({ type: CART_ITEMS_RESET })
			// window.location.reload()
		}
	}, [orderShippingFeeSuccess, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

	// __________________________________________________________________________________________________________________

	const parcelFeeHandler = () => {
		if (Number(getCartCount()) > 6) {
			if (order && order.shippingAddress.prefecture) {
				// let prefectureWWW = order.shippingAddress.prefecture.toString()
				if (prefecture_600.includes(order.shippingAddress.prefecture)) {
					return 600
				}
				if (prefecture_700.includes(order.shippingAddress.prefecture)) {
					return 700
				}
				if (prefecture_750.includes(order.shippingAddress.prefecture)) {
					return 750
				}
				if (prefecture_950.includes(order.shippingAddress.prefecture)) {
					return 950
				}
				if (
					prefecture_1050.includes(order.shippingAddress.prefecture)
				) {
					return 1050
				}
			}
		}
		return 400
	}
	const letterFeeHandler = () => {
		if (Number(getCartCount()) === 1) {
			return 140
		} else if (Number(getCartCount()) === 2) {
			return 210
		} else if (
			Number(getCartCount()) === 3 ||
			Number(getCartCount()) === 4 ||
			Number(getCartCount()) === 5 ||
			Number(getCartCount()) === 6
		) {
			return 390
		} else {
			return null
		}
	}

	const getCartCount = () => {
		if (order) {
			return order.orderItems.reduce(
				(qty, item) => Number(item.qty) + qty,
				0
			)
		}
	}

	const totalPriceCal = () => {
		return Number(order.totalPrice) + Number(shippingFee)
	}

	let shippingFee = shippingOption.shippingOptionFee

	// __________________________________________________________________________________________________________________

	const submitHandler = async (e) => {
		e.preventDefault()

		if (shippingOption.shippingOptionFee === null) {
			setErrorText('????????????????????????????????????????????????')
			return
		}
		setErrorText('')

		const addressInfo = {
			fullName: order.shippingAddress.fullName,
			postalCode: order.shippingAddress.postalCode,
			prefecture: order.shippingAddress.prefecture,
			address: order.shippingAddress.address,
			building: order.shippingAddress.building,
			phoneNumber: order.shippingAddress.phoneNumber,
		}
		const orderInfo = () => {
			return order.orderItems
		}
		try {
			if (name !== '' && order && !bankTransferState) {
				dispatch({
					type: STRIPE_PAY_REQUEST,
				})
				if (!stripe || !elements) {
					return
				}
				const { paymentMethod } = await stripe.createPaymentMethod({
					type: 'card',
					card: elements.getElement(CardElement),
				})
				const { id } = paymentMethod

				const paymentDetails = {
					id: id,
					amount: totalPriceCal(),
					orderInfo: orderInfo(),
					name: name,
					addressInfo,
					isGuest: userInfo.isGuest,
					shippingType: shippingOption.shippingType,
					metadata: {
						//fixme add more shipper info
						orderedPersonName: userInfo.name,
						shippingFee,
						email_address: order.user.email,
						userId: order.user._id,
						orderId: orderId,
						status: 'COMPLETED',
						update_time: Date.now(),
					},
				}

				dispatch(payOnStirpe(orderId, paymentDetails))
			} else if (!bankTransferState) {
				setErrorText('?????????????????????????????????')
			} else {
				console.log('bankTransfer')
				const banckTransferInfo = {
					orderedPersonName: userInfo.name,
					orderId,
					amount: totalPriceCal(),
					orderInfo: orderInfo(),
					email: order.user.email,
					shippingFee,
					addressInfo,
					shippingType: shippingOption.shippingType,
				}
				dispatch(bankTransferOrder(orderId, banckTransferInfo))
			}
		} catch (error) {
			console.log(error)
			setErrorText('?????????????????????????????????')
			dispatch({ type: STRIPE_PAY_LOADING_STOP })
		}
	}

	const deliverHandler = () => {
		const addressInfo = {
			fullName: order.shippingAddress.fullName,
			postalCode: order.shippingAddress.postalCode,
			prefecture: order.shippingAddress.prefecture,
			address: order.shippingAddress.address,
			building: order.shippingAddress.building,
			phoneNumber: order.shippingAddress.phoneNumber,
		}
		const orderInfo = () => {
			return order.orderItems
		}
		const emailInfo = {
			orderedPersonName: userInfo.name,
			email: order.user.email,
			addressInfo,
			orderId,
			trackingId,
			orderInfo: orderInfo(),
			amount: totalPriceCal(),
			shippingType: order.shippingType,
			isGuest: userInfo.isGuest,
		}
		dispatch(deliverOrder(order, emailInfo))
	}

	const toBankTransfer = (boolean) => {
		setBankTransferState(boolean)
		setErrorText('')
	}

	function addDays(date, days) {
		var result = new Date(date)
		result.setDate(result.getDate() + days)
		return result
	}

	// console.log(`${new Date().getMonth() + 1}???${new Date().getDate()}???`)

	return loading || orderShippingFeeLoading ? (
		<>
			<Loader />
			{/* <h3>???????????????????????????????????????????????????</h3> */}
		</>
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<Row>
				{!order.isPaid && !order.isBankTransfer ? (
					<CheckoutSteps number={50} />
				) : (
					<CheckoutSteps number={100} />
				)}
				{order && order.isPaid && !order.isDelivered && (
					// <Message variant='success'>
					// 	?????????????????? {order.paidAt.substring(0, 10)}
					// </Message>
					<PaymentRecieve delivered={order.isDelivered} date={null} />
				)}
				{order && order.isPaid && order.isDelivered && (
					// <Message variant='success'>
					// 	?????????????????? {order.paidAt.substring(0, 10)}
					// </Message>
					<PaymentRecieve
						delivered={order.isDelivered}
						date={order.deliveredAt.substring(0, 10)}
					/>
				)}
				{!order.isPaid && order.isBankTransfer && (
					<Message variant='danger'>
						??????????????????????????????????????????
						<br />
						??????????????????????????????????????????????????????????????????????????????????????????
						<br />
						????????????????????????????????????????????????????????????
						<a href='mailto: info@umaishio.com'>
							info@umaishio.com
						</a>
						?????????????????????????????????
					</Message>
				)}
				{/* {!order.isPaid && order.isBankTransfer && (
					<Message variant='danger'>
						???????????????????????????????????????
						<br />
						????????????????????????????????????????????????
					</Message>
				)} */}
				<Col lg={order && order.isPaid ? '12' : '6'}>
					<div className='item-responsive-wrap__g order-left-wrap'>
						<div className='mt-3'>
							<h4>????????????</h4>
							<p style={{ fontSize: '0.8rem' }}>
								ID: {order._id.slice(-10)}
							</p>
							<p className='underline__g'></p>
							{order.orderItems.length === 0 ? (
								<Message>????????????????????????</Message>
							) : (
								<div variant='flush'>
									{order.orderItems.map((item, index) => (
										<div key={index}>
											<div className='order-list-item-wrap'>
												<Col md={2} xs={2}>
													<Image
														src={item.image}
														alt='???????????????'
														fluid
														rounded
													/>
												</Col>
												<Col md={5} xs={5}>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={5} xs={5}>
													<span className='d-flex justify-content-between'>
														<span>
															x {item.qty}
														</span>
														<span>
															??
															{item.price.toLocaleString()}
														</span>
													</span>
												</Col>
											</div>
										</div>
									))}
									<p className='underline__g'></p>
								</div>
							)}
						</div>

						<div>
							<p className='d-flex justify-content-between'>
								<span>???????????????</span>
								<span>
									??&nbsp;{order.itemsPrice.toLocaleString()}
								</span>
							</p>
						</div>
						{/* <div>
							<p className='d-flex justify-content-between'>
								<span>?????????</span>
								<span>??&nbsp;{order.taxPrice}</span>
							</p>
						</div> */}
						<div>
							<p className='d-flex justify-content-between'>
								<span>?????????</span>
								{order &&
								(order.isPaid || order.isBankTransfer) ? (
									<span>
										??&nbsp;
										{order.shippingPrice.toLocaleString()}
									</span>
								) : (
									<span>
										??&nbsp;
										{shippingFee === null
											? '??????'
											: shippingFee}
									</span>
								)}
							</p>
						</div>
						<div>
							<p className='d-flex justify-content-between'>
								<span>????????????</span>
								{order &&
								(order.isPaid || order.isBankTransfer) ? (
									<span>
										??&nbsp;
										{order.totalPrice.toLocaleString()}
									</span>
								) : (
									<span>
										??&nbsp;
										{totalPriceCal().toLocaleString()}
									</span>
								)}
							</p>
						</div>
						<p className='underline__g'></p>
						{/* <div>
							 {error && (
									<Message variant='danger'>{error}</Message>
				
							</div> */}

						<div>
							<h4>????????????</h4>
							<p className='mt-3'>
								<strong>???</strong>
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
								<br />
								{order.shippingAddress.prefecture}
								{order.shippingAddress.address}
								{order.shippingAddress.building !== '' &&
									order.shippingAddress.building}
								<br />
								{order.shippingAddress.fullName}(
								{order.shippingAddress.furigana})
								<br />
								{order.shippingAddress.phoneNumber && (
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
										{order.shippingAddress.phoneNumber}
									</>
								)}
								<br />
							</p>
							{order && order.shippingAddress.isShipper && (
								<>
									<h4 className='mt-5'>???????????????</h4>
									<p className='mt-3'>
										<strong>???</strong>
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
										<br />
										{
											order.shippingAddress
												.shipperPrefecture
										}
										{order.shippingAddress.shipperAddress}
										{order.shippingAddress
											.shipperBuilding !== '' &&
											order.shippingAddress
												.shipperBuilding}
										<br />
										{order.shippingAddress.shipperFullName}(
										{order.shippingAddress.shipperFurigana}
										)
										<br />
										{order.shippingAddress
											.shipperPhoneNumber && (
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
												{
													order.shippingAddress
														.shipperPhoneNumber
												}
											</>
										)}
										<br />
									</p>
								</>
							)}
							{order && order.shippingAddress.comment && (
								<p>
									<strong>?????????: </strong>
									{order.shippingAddress.comment}
								</p>
							)}
							{userInfo &&
								order &&
								!order.isDelivered &&
								!order.isBankTransfer &&
								!order.isPaid && (
									<div className='modify-btn-wrap'>
										<button
											className='modify-btn'
											type='button'
											onClick={shippingModalShow}
										>
											<span className='modify-text'>
												????????????&nbsp;&nbsp;
												<i className='fas fa-chevron-right'></i>
											</span>
										</button>
									</div>
								)}
							<ModifyShippingInfoModal
								match={match}
								show={shippingModal}
								handleClose={shippingModalClose}
								history={history}
							/>
							<Form.Group controlId='prefecture' className='mt-2'>
								<h4>
									?????????????????????
									{userInfo &&
										order &&
										!order.shippingType && (
											<span className='form-asterisk__g'>
												*
											</span>
										)}
								</h4>
								{/* <p className='mt-3'>
									???????????????:???????????????????????????
								</p> */}
								{/* <Form.Label></Form.Label> */}
								{/*__________________________ //shippingDetails ______________________________ */}
								{userInfo && order && order.shippingType && (
									<>
										{order && order.isBankTransfer ? (
											<p className='mt-3'>
												????????????:{'  '}
												{order.isDelivered
													? '?????????????????????'
													: '?????????'}
												<br />
												????????????:???
												{order.shippingType}
												<br />
												??????????????????:{' '}
												{order.isDelivered &&
												order.isPaid ? (
													<>
														{/* {addDays(
															order.paidAt,
															4
														).getMonth() + 1}
														???
														{addDays(
															order.paidAt,
															4
														).getDate()}
														??? ~ ??? */}
														?????????????????????????????????????????????
													</>
												) : (
													'???????????????'
												)}
												<br />
												{/* ////otherconditional */}
												{order.shippingType ===
													'???????????????' &&
													order.trackingId && (
														<>
															?????????????????????:{' '}
															{order.trackingId}
															&nbsp;&nbsp;
															<button
																className='copy-button'
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		order.trackingId
																	)
																	alert(
																		'??????????????????????????????????????????'
																	)
																}}
															>
																COPY
															</button>
															<br />
															<span
																className='d-flex justify-content-end'
																// className='modify-text'
															>
																<a
																	className='text-end'
																	href='https://toi.kuronekoyamato.co.jp/cgi-bin/tneko'
																>
																	????????????????????????&nbsp;&nbsp;
																</a>
																<i className='fas fa-chevron-right'></i>
															</span>
														</>
													)}
											</p>
										) : (
											<p className='mt-3'>
												????????????:{' '}
												{order.isDelivered
													? '?????????????????????'
													: '?????????'}
												<br />
												????????????:???
												{order.shippingType}
												<br />
												??????????????????:{' '}
												?????????????????????????????????????????????
												{/* {addDays(
													order.paidAt,
													4
												).getMonth() + 1}
												???
												{addDays(
													order.paidAt,
													4
												).getDate()}
												?????? */}
												<br />
												{order.shippingType ===
													'???????????????' &&
													order.trackingId && (
														<>
															?????????????????????:{' '}
															{order.trackingId}
															&nbsp;&nbsp;
															<button
																className='copy-button'
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		order.trackingId
																	)
																	alert(
																		'??????????????????????????????????????????'
																	)
																}}
															>
																COPY
															</button>
															<br />
															<p
																className='text-end'
																// className='modify-text'
															>
																<a href='https://toi.kuronekoyamato.co.jp/cgi-bin/tneko'>
																	????????????????????????&nbsp;&nbsp;
																</a>
																<i className='fas fa-chevron-right'></i>
															</p>
														</>
													)}
											</p>
										)}
									</>
								)}
								{/*__________________________ //shippingDetails ______________________________ */}
								{userInfo &&
									order &&
									!order.isDelivered &&
									!order.isBankTransfer &&
									!order.isPaid && (
										<div className='form-container-pw-icon__g'>
											<Form.Control
												disabled={order.isPaid}
												className='form-select'
												as='select'
												placeholder='????????????????????????'
												required
												defaultValue={
													order && shippingOption
												}
												onChange={(e) =>
													setShippingOption(
														JSON.parse(
															e.target.value
														)
													)
												}
											>
												<option
													value={JSON.stringify({
														shippingOptionFee: null,
														shippingType: '',
													})}
												>
													????????????????????????
												</option>

												{Number(getCartCount()) < 7 && (
													<option
														value={JSON.stringify({
															shippingOptionFee: letterFeeHandler(),
															shippingType:
																'??????',
														})}
													>
														?????? + ??
														{letterFeeHandler()}
													</option>
												)}
												<option
													value={JSON.stringify({
														shippingOptionFee: parcelFeeHandler(),
														shippingType:
															'???????????????',
													})}
												>
													??????????????? + ??
													{parcelFeeHandler()}
												</option>
											</Form.Control>
										</div>
									)}
							</Form.Group>

							{userInfo &&
								order &&
								userInfo.isAdmin &&
								!order.isDelivered &&
								(order.isBankTransfer || order.isPaid) && (
									<>
										{order.shippingType === '??????' ? (
											<Button
												type='button'
												className='mt-2 btn btn-block w-100'
												onClick={deliverHandler}
											>
												??????????????????????????????????????????
											</Button>
										) : (
											<div>
												<Form>
													<Form.Group className='mt-2'>
														{/* <Form.Label>?????????????????????????????????</Form.Label> */}

														<div className='form-container-pw-icon__g'>
															<Form.Control
																type='number'
																required
																value={
																	trackingId
																}
																placeholder='*??????????????????????????????????????????'
																onChange={(e) =>
																	setTrackingId(
																		e.target
																			.value
																	)
																}
															></Form.Control>
														</div>
													</Form.Group>
													<Button
														type='button'
														className='mt-2 btn btn-block w-100'
														disabled={
															trackingId === ''
														}
														onClick={deliverHandler}
													>
														??????????????????????????????????????????
													</Button>
												</Form>
											</div>
										)}
									</>
								)}
						</div>
					</div>
				</Col>
				{order && !order.isPaid && (
					<Col lg={6}>
						<div className='item-responsive-wrap__g order-left-wrap order-left'>
							<div className='mt-3'>
								<h4>
									??????????????????
									<span className='form-asterisk__g'>*</span>
								</h4>
								{order &&
								!order.isPaid &&
								!order.isBankTransfer ? (
									<Col>
										<Form.Check
											className='mt-3'
											type='radio'
											label='????????????????????????'
											id='cardpayment'
											name='paymentMethodForm'
											onClick={() =>
												toBankTransfer(false)
											}
											defaultChecked
										></Form.Check>
										<Form.Check
											className='mt-3'
											type='radio'
											label='??????????????????'
											id='bank'
											name='paymentMethodForm'
											onClick={() => toBankTransfer(true)}
										></Form.Check>
									</Col>
								) : null}

								{order &&
								!order.isPaid &&
								!order.isBankTransfer &&
								!bankTransferState ? (
									<>
										<div className='mt-3'>
											<div>????????????????????????????????????</div>
										</div>
										<div className='d-flex justify-content-end'>
											<span>
												<Image
													src={cartType}
													alt='cartType'
													fluid
													width={250}
												/>
											</span>
										</div>
										<Form.Group
											controlId='address'
											className='mt-2'
										>
											{/* <Form.Label>?????????????????????????????????</Form.Label> */}
											<div className='form-container-pw-icon__g'>
												<Form.Control
													type='text'
													required
													disabled={bankTransferState}
													placeholder='??????????????????'
													onChange={(e) =>
														setName(e.target.value)
													}
												></Form.Control>
											</div>
										</Form.Group>
										{/* <div className='form-container-pw-icon__g'> */}
										<CardElement
											// className='mt-3 mb-3'
											className='cardElementCss'
											// disabled={true}
											required
											hidePostalCode={true}
											options={{
												style: {
													base: {
														fontSize: '17px',

														'::placeholder': {
															color: '#55595c',
															fontSize: '17px',
															fontWeight: '100',
														},
													},
													invalid: {
														color: '#919AA1',
													},
												},
											}}
										/>
										{/* </div> */}

										<div className='mb-2 modify-btn-wrap'>
											<button
												className='modify-btn'
												onClick={handleShow}
											>
												<span className='modify-text'>
													CVC??????
													<i className='far fa-question-circle'></i>
												</span>
											</button>
										</div>

										<CvcModal
											show={show}
											handleClose={handleClose}
										/>
									</>
								) : null}

								{bankTransferState || order.isBankTransfer ? (
									<p className='mt-3'>
										??????????????????????????????
										<br />
										????????????: ?????????????????????????????????
										<br />
										?????????: ?????????????????????
										<br />
										????????????: ?????? 3869283
										<br />
										{order &&
										(order.isPaid || order.isBankTransfer)
											? `?????????: ??${order.totalPrice}`
											: `?????????: ??${totalPriceCal().toLocaleString()}`}
										<br />
										<br />
										*?????????????????????????????????????????????????????????????????????????????????????????????
									</p>
								) : null}

								{/* {order && order.isPaid && (
								<Message variant='success'>
									?????????????????? {order.paidAt.substring(0, 10)}
								</Message>
							)} */}
								{errorText && (
									<Message variant='danger'>
										{errorText}
									</Message>
								)}
								{errorPay && (
									<Message variant='danger'>
										{errorPay}
										<br />
										{/* <a href='mailto: info@umaishio.com'> */}
										<Link to='/contact'>
											??????????????????????????????????????????????????????????????????
										</Link>

										{/* </a> */}
									</Message>
								)}
								{!order.isPaid && !order.isBankTransfer && (
									<div>
										{loadingPay ||
										loading ||
										loadingBankTransfer ||
										orderShippingFeeLoading ? (
											<Loader />
										) : (
											<>
												{/* <p className='text-center'>
													*
													?????????????????????????????????????????????
												</p> */}
												<Button
													type='submit'
													className='btn-block w-100 borderRadius__g'
													// style={{ borderRadius: '20px' }}
													disabled={
														!stripe ||
														cart.cartItems === 0 ||
														Object.keys(
															order.orderItems
														).length === 0 ||
														loadingPay ||
														successPay
													}
													onClick={submitHandler}
												>
													?????????????????????
												</Button>
											</>
										)}
									</div>
								)}
							</div>
						</div>
					</Col>
				)}
			</Row>
		</>
	)
}

export default OrderScreen
