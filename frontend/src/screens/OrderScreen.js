import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, div, Image, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createOrder } from '../actions/orderActions'
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
} from '../constants/orderConstants'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CheckoutSteps from '../components/CheckoutSteps'
import { CART_ITEMS_RESET } from '../constants/cartConstants'

import CvcModal from '../components/CvcModal'
import ModifyShippingInfoModal from '../components/ModifyShippingInfoModal'
import fontFamily from '../fonts/AxisStd/AxisStd-ExtraLight.otf'
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
			history.push(`/login?redirect=order/${orderId}`)
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
			dispatch(
				updateShippingFee(orderId, {
					shippingFee,
					totalPriceCal: order.totalPrice + shippingFee,
				})
			)
			localStorage.setItem('cartItems', [])
			dispatch({ type: CART_ITEMS_RESET })
			window.location.reload()
		}
	}, [
		dispatch,
		order,
		orderId,
		successPay,
		successDeliver,
		successBankTransfer,
	])

	const prefecture_600 = [
		'宮城県',
		'山形県',
		'福島県',
		'茨城県',
		'栃木県',
		'群馬県',
		'埼玉県',
		'千葉県',
		'東京県',
		'神奈川県',
		'山梨県',
		'新潟県',
		'長野県',
		'富山県',
		'石川県',
		'福井県',
		'岐阜県',
		'静岡県',
		'愛知県',
		'三重県',
	]

	const prefecture_700 = [
		'青森県',
		'岩手県',
		'秋田県',
		'滋賀県',
		'京都県',
		'大阪県',
		'兵庫県',
		'奈良県',
		'和歌山県',
	]

	const prefecture_750 = [
		'鳥取県',
		'島根県',
		'岡山県',
		'広島県',
		'山口県',
		'徳島県',
		'香川県',
		'愛媛県',
		'高知県',
	]

	const prefecture_950 = [
		'福岡県',
		'佐賀県',
		'長崎県',
		'熊本県',
		'大分県',
		'宮崎県',
		'鹿児島県',
		'北海道',
	]

	const prefecture_1050 = ['沖縄県']

	const shippingFeeCalc = () => {
		if (getCartCount() > 6) {
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

	const getCartCount = () =>
		order.orderItems.reduce((qty, item) => Number(item.qty) + qty, 0)

	let shippingFee = 450

	const totalPriceCal = () => {
		return Number(order.totalPrice) + Number(shippingFee)
	}

	// let totalPriceCal = (
	// 	Number(cart.itemsPrice) + Number(cart.shippingPrice)
	// ).toFixed(0)
	// useEffect(() => {
	// 	if (order) {
	// 		dispatch(
	// 			updateShippingFee(orderId, {
	// 				shippingFee,
	// 				totalPriceCal: order.totalPrice + shippingFee,
	// 			})
	// 		)
	// 	}
	// }, [order])

	const submitHandler = async (e) => {
		e.preventDefault()

		setErrorText('')
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
					//fixme
					name: name,
					metadata: {
						//fixme add more shipper info
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
			} else if (!bankTransferState) {
				setErrorText('正しく記入してください')
			} else {
				console.log('bankTransfer')
				const banckTransferInfo = {
					email: order.user.email,
					name: order.shippingAddress.fullName,
					orderId,
					price: order.totalPrice,
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
		}
		dispatch(deliverOrder(order, emailInfo))
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
						銀行振り込み確認後の配送になります。
						<br />
						また発送後に
						<a href='mailto: info@umaishio.com'>
							info@umaishio.com
						</a>
						から発送完了メールを送らせていただきます。
					</Message>
				)}
				{/* {!order.isPaid && order.isBankTransfer && (
					<Message variant='danger'>
						注文ありがとうございした。
						<br />
						振り込み確認後の配送になります。
					</Message>
				)} */}
				<Col md={order && order.isPaid ? '12' : '6'}>
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
									<span>¥&nbsp;{shippingFee}</span>
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
						<div>
							<p className='d-flex justify-content-between'>
								<span>内消費税</span>
								<span>¥&nbsp;xxxx</span>
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
							{/* {order.isDelivered ? (
								<Message variant='success'>
									発送手配の完了
									{order.deliveredAt.substring(0, 10)}
								</Message>
							) : null}
							{!order.isPaid && order.isBankTransfer && (
								<Message variant='danger'>
									注文ありがとうございした。
									<br />
									振り込み確認後の配送になります。
								</Message>
							)} */}
							<Form.Group controlId='prefecture' className='mt-2'>
								<h4>配送オプション</h4>
								<p className='mt-3'>
									お届け予定:　入金確認後２日後
								</p>
								{/* <Form.Label></Form.Label> */}
								<div className='form-container-pw-icon__g'>
									<Form.Control
										disabled={order.isPaid}
										className='form-select'
										as='select'
										placeholder='選択してください'
										required
									>
										<option>郵便 + ¥140</option>
										<option>
											ヤマト運輸 + ¥{shippingFeeCalc()}
										</option>
									</Form.Control>
								</div>
							</Form.Group>
							{userInfo &&
								order &&
								userInfo.isAdmin &&
								!order.isDelivered &&
								(order.isBankTransfer || order.isPaid) && (
									<>
										<div>
											<Form>
												<Form.Group className='mt-2'>
													{/* <Form.Label>クレジットカード名義人</Form.Label> */}
													<div className='form-container-pw-icon__g'>
														<Form.Control
															type='number'
															required
															value={trackingId}
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
													disabled={trackingId === ''}
													onClick={deliverHandler}
												>
													管理者：入金確認＆配送ボタン
												</Button>
											</Form>
										</div>
									</>
								)}
						</div>
					</div>
				</Col>
				{order && !order.isPaid && (
					<Col md={6}>
						<div className='item-responsive-wrap__g order-left-wrap order-left'>
							<div className='mt-3'>
								<h4>お支払い方法</h4>
								{order &&
								!order.isPaid &&
								!order.isBankTransfer ? (
									<Col>
										<Form.Check
											className='mt-3'
											type='radio'
											label='クレジットカード'
											id='Stripe'
											name='paymentMethod'
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
											disabled={true}
											required
											hidePostalCode={true}
											options={{
												style: {
													fonts: [
														{
															src: `url(${fontFamily})`,
															family: 'AxisStd',
														},
													],
													base: {
														fontSize: '17px',
														border:
															'1px solid #909090',
														fontWeight: 'lighter',
														'::placeholder': {
															color: '#55595c',
															fontSize: '17px',
															fontWeight:
																'lighter',
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
										銀行振り込み口座
										<br />
										口座番号: XXXXXXXXXXX
										<br />
										名前: XXXXXXXXXXX
										<br />
										振込額: ¥{order.totalPrice}
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
										loadingBankTransfer ? (
											<Loader />
										) : (
											<>
												{/* <p className='text-center'>
													*
													このボタンで購入が完了します。
												</p> */}
												<Button
													type='button'
													className='btn-block w-100 borderRadius__g'
													// style={{ borderRadius: '20px' }}
													disabled={
														!stripe ||
														cart.cartItems === 0 ||
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
