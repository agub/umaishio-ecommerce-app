import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetails,
	payOnStirpe,
	deliverOrder,
	bankTransferOrder,
	updateShippingFee,
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
	console.log(shippingOption)
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
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

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
	}, [orderShippingFeeSuccess])

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
			Number(getCartCount()) === 4
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
			setErrorText('配送オプションを選択してください')
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
					amount: totalPriceCal(),
					orderInfo: orderInfo(),
					name: name,
					addressInfo,
					shippingType: shippingOption.shippingType,
					metadata: {
						//fixme add more shipper info
						shippingFee,
						email_address: order.user.email,
						userId: order.user._id,
						orderId: orderId,
						// orderInfo: orderInfo(),
						// addressInfo,
						// fullName: order.shippingAddress.fullName,
						// postalCode: order.shippingAddress.postalCode,
						// prefecture: order.shippingAddress.prefecture,
						// address: order.shippingAddress.address,
						// building: order.shippingAddress.building,
						status: 'COMPLETED',
						update_time: Date.now(),
					},
				}

				dispatch(payOnStirpe(orderId, paymentDetails))
			} else if (!bankTransferState) {
				setErrorText('正しく記入してください')
			} else {
				console.log('bankTransfer')
				const banckTransferInfo = {
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
			dispatch({ type: STRIPE_PAY_LOADING_STOP })
			setErrorText('正しく記入してください')
		}
	}

	const deliverHandler = () => {
		const emailInfo = {
			email: order.user.email,
			name: order.shippingAddress.fullName,
			orderId,
			trackingId,
			shippingType: order.shippingType,
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

	return loading || orderShippingFeeLoading ? (
		<>
			<Loader />
			{/* <h3>少しお時間がかかることがあります。</h3> */}
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
					// 	お支払い済み {order.paidAt.substring(0, 10)}
					// </Message>
					<PaymentRecieve delivered={order.isDelivered} date={null} />
				)}
				{order && order.isPaid && order.isDelivered && (
					// <Message variant='success'>
					// 	お支払い済み {order.paidAt.substring(0, 10)}
					// </Message>
					<PaymentRecieve
						delivered={order.isDelivered}
						date={order.deliveredAt.substring(0, 10)}
					/>
				)}
				{!order.isPaid && order.isBankTransfer && (
					<Message variant='danger'>
						ご注文ありがとうございした。
						<br />
						お振込いただき、確認後できるだけ早く送付させていただきます。
						<br />
						また確認後発送開始のご案内を改めてメール
						<a href='mailto: info@umaishio.com'>
							info@umaishio.com
						</a>
						からお送りいたします。
					</Message>
				)}
				{/* {!order.isPaid && order.isBankTransfer && (
					<Message variant='danger'>
						注文ありがとうございした。
						<br />
						振り込み確認後の配送になります。
					</Message>
				)} */}
				<Col lg={order && order.isPaid ? '12' : '6'}>
					<div className='item-responsive-wrap__g order-left-wrap'>
						<div className='mt-3'>
							<h4>注文内容</h4>
							<p style={{ fontSize: '0.8rem' }}>ID:{order._id}</p>
							<p className='underline__g'></p>
							{order.orderItems.length === 0 ? (
								<Message>注文がありません</Message>
							) : (
								<div variant='flush'>
									{order.orderItems.map((item, index) => (
										<div key={index}>
											<div className='order-list-item-wrap'>
												<Col md={2} xs={2}>
													<Image
														src={item.image}
														alt={item.name}
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
															¥{item.price}
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
								<span>商品の小計</span>
								<span>¥&nbsp;{order.itemsPrice}</span>
							</p>
						</div>
						{/* <div>
							<p className='d-flex justify-content-between'>
								<span>消費税</span>
								<span>¥&nbsp;{order.taxPrice}</span>
							</p>
						</div> */}
						<div>
							<p className='d-flex justify-content-between'>
								<span>配送料</span>
								{order &&
								(order.isPaid || order.isBankTransfer) ? (
									<span>¥&nbsp;{order.shippingPrice}</span>
								) : (
									<span>
										¥&nbsp;
										{shippingFee === null
											? '未定'
											: shippingFee}
									</span>
								)}
							</p>
						</div>
						<div>
							<p className='d-flex justify-content-between'>
								<span>税込合計</span>
								{order &&
								(order.isPaid || order.isBankTransfer) ? (
									<span>¥&nbsp;{order.totalPrice}</span>
								) : (
									<span>¥&nbsp;{totalPriceCal()}</span>
								)}
							</p>
						</div>
						<p className='underline__g'></p>
						{/* <div>
							 {error && (
									<Message variant='danger'>{error}</Message>
				
							</div> */}

						<div>
							<h4>お届け先</h4>
							<p className='mt-3'>
								<strong>〒</strong>
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
									<h4 className='mt-5'>依頼人住所</h4>
									<p className='mt-3'>
										<strong>〒</strong>
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
										{order.shippingAddress.shipperFurigana})
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
									<strong>ご要望: </strong>
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
												変更する&nbsp;&nbsp;
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
									配送オプション
									{userInfo &&
										order &&
										!order.shippingType && (
											<span className='form-asterisk__g'>
												*
											</span>
										)}
								</h4>
								{/* <p className='mt-3'>
									お届け予定:　入金確認後２日後
								</p> */}
								{/* <Form.Label></Form.Label> */}
								{/*__________________________ //shippingDetails ______________________________ */}
								{userInfo && order && order.shippingType && (
									<>
										{order && order.isBankTransfer ? (
											<p className='mt-3'>
												配送状況:{'  '}
												{order.isDelivered
													? '発送手続き完了'
													: '未発送'}
												<br />
												配送方法:　{order.shippingType}
												<br />
												お届け予定:{' '}
												{order.isDelivered &&
												order.isPaid ? (
													<>
														{addDays(
															order.paidAt,
															4
														).getMonth() + 1}
														月
														{addDays(
															order.paidAt,
															4
														).getDate()}
														日頃
													</>
												) : (
													'入金確認後'
												)}
												<br />
												{/* ////otherconditional */}
												{order.shippingType ===
													'ヤマト運輸' &&
													order.trackingId && (
														<>
															ヤマト送り番号:{' '}
															{order.trackingId}
															&nbsp;&nbsp;
															<button
																className='copy-button'
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		order.trackingId
																	)
																	alert(
																		'送り番号がコピーされました。'
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
																	荷物お問い合わせ&nbsp;&nbsp;
																</a>
																<i className='fas fa-chevron-right'></i>
															</p>
														</>
													)}
											</p>
										) : (
											<p className='mt-3'>
												配送状況:{' '}
												{order.isDelivered
													? '発送手続き完了'
													: '未発送'}
												<br />
												配送方法:　
												{order.shippingType}
												<br />
												お届け予定:　
												{addDays(
													order.paidAt,
													4
												).getMonth() + 1}
												月
												{addDays(
													order.paidAt,
													4
												).getDate()}
												日頃
												<br />
												{order.shippingType ===
													'ヤマト運輸' &&
													order.trackingId && (
														<>
															ヤマト送り番号:{' '}
															{order.trackingId}
															&nbsp;&nbsp;
															<button
																className='copy-button'
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		order.trackingId
																	)
																	alert(
																		'送り番号がコピーされました。'
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
																	荷物お問い合わせ&nbsp;&nbsp;
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
												placeholder='選択してください'
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
													選択してください
												</option>

												{Number(getCartCount()) < 5 && (
													<option
														value={JSON.stringify({
															shippingOptionFee: letterFeeHandler(),
															shippingType:
																'郵便',
														})}
													>
														郵便 + ¥
														{letterFeeHandler()}
													</option>
												)}
												<option
													value={JSON.stringify({
														shippingOptionFee: parcelFeeHandler(),
														shippingType:
															'ヤマト運輸',
													})}
												>
													ヤマト運輸 + ¥
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
										{order.shippingType === '郵便' ? (
											<Button
												type='button'
												className='mt-2 btn btn-block w-100'
												onClick={deliverHandler}
											>
												管理者：入金確認＆配送ボタン
											</Button>
										) : (
											<div>
												<Form>
													<Form.Group className='mt-2'>
														{/* <Form.Label>クレジットカード名義人</Form.Label> */}

														<div className='form-container-pw-icon__g'>
															<Form.Control
																type='number'
																required
																value={
																	trackingId
																}
																placeholder='*ヤマトのトラッキングナンバー'
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
														管理者：入金確認＆配送ボタン
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
									お支払い方法
									<span className='form-asterisk__g'>*</span>
								</h4>
								{order &&
								!order.isPaid &&
								!order.isBankTransfer ? (
									<Col>
										<Form.Check
											className='mt-3'
											type='radio'
											label='クレジットカード'
											// id='Stripe'
											name='paymentMethodForm'
											onClick={() =>
												toBankTransfer(false)
											}
											defaultChecked
										></Form.Check>
										<Form.Check
											className='mt-3'
											type='radio'
											label='銀行振り込み'
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
										<Form.Group
											controlId='address'
											className='mt-2'
										>
											{/* <Form.Label>クレジットカード名義人</Form.Label> */}
											<div className='form-container-pw-icon__g'>
												<Form.Control
													type='text'
													required
													disabled={bankTransferState}
													placeholder='カード名義人'
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
													CVCとは
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
										【銀行振り込み口座】
										<br />
										金融機関: 三井住友銀行小田原支店
										<br />
										口座名: 株式会社トビラ
										<br />
										口座番号: 3869283
										<br />
										{order &&
										(order.isPaid || order.isBankTransfer)
											? `振込額: ¥${order.totalPrice}`
											: `振込額: ¥${totalPriceCal()}`}
										<br />
										<br />
										*お振込手数料は恐れ入りますがお客様にご負担いただいております。
									</p>
								) : null}

								{/* {order && order.isPaid && (
								<Message variant='success'>
									お支払い済み {order.paidAt.substring(0, 10)}
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
										<a href='mailto: info@umaishio.com'>
											カスタマーサービスへお問い合わせはこちらへ
										</a>
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
													このボタンで購入が完了します。
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
													注文を完了する
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
