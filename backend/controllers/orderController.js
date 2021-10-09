import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'

import {
	sendOrderSuccessEmail,
	sendShippingStartedEmail,
	sendIdShippingStartedEmail,
	sendBankTransferInfo,
} from '../utils/email.js'

dotenv.config()
const stripe = Stripe(process.env.STRIPE_SECRET)
// @description   Create new order
// @route         POST /api/orders
// @access        Private

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		// paymentMethod,
		itemsPrice,
		// taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.lengh === 0) {
		res.status(400)
		throw new Error('No order Items')
		return
	} else {
		const orders = await Order.find({ user: req.user._id })
		const notOrders = orders.filter((o) => !o.isPaid && !o.isBankTransfer)
		for (let item of notOrders) {
			const unWantedProduct = await Order.findById(item._id)
			await unWantedProduct.remove()
		}
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			// paymentMethod,
			itemsPrice,
			// taxPrice,
			shippingPrice,
			totalPrice,
		})
		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})

// @description   Get order by ID
// @route         POST /api/orders/:id
// @access        Private

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)
	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error(
			'オーダーが見つかりません。ログインし直してもう一度お試しください。'
		)
	}
})

// @description   Update order to paid
// @route         POST /api/orders/:id/pay
// @access        Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		//coming from paypalresponse
		// order.paymentResult = {
		// 	id: req.body.id,
		// 	status: req.body.status,
		// 	update_time: req.body.update_time,
		// 	email_address: req.body.payer.email_address,
		// }
		order.paymentResult = {
			id: req.body.id,
			status: req.body.metadata.status,
			update_time: req.body.metadata.update_time,
			email_address: req.body.metadata.email_address,
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error(
			'オーダーが見つかりません。ログインし直してもう一度お試しください。'
		)
	}
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const {
		email,
		addressInfo,
		orderId,
		trackingId,
		orderInfo,
		amount,
		shippingType,
		isGuest,
	} = req.body.emailInfo

	const order = await Order.findById(req.params.id)
	if (order) {
		if (order.isPaid !== true) {
			order.isPaid = true
			order.paidAt = Date.now()
		}

		order.isDelivered = true
		order.deliveredAt = Date.now()
		if (shippingType === 'ヤマト運輸' && trackingId) {
			order.trackingId = trackingId
			const updatedOrder = await order.save()
			const mailInfo = {
				email,
				addressInfo,
				orderId,
				trackingId,
				shippingType,
				orderInfo,
				amount,
				shippingFee: order.shippingPrice,
				isGuest,
			}

			sendIdShippingStartedEmail(mailInfo)
			res.json(updatedOrder)
			return
		} else {
			const updatedOrder = await order.save()
			const mailInfo = {
				email,
				addressInfo,
				trackingId,
				shippingType,
				orderInfo,
				amount,
				shippingFee: order.shippingPrice,
				isGuest,
			}
			sendShippingStartedEmail(mailInfo)
			res.json(updatedOrder)
			return
		}
	} else {
		res.status(404)
		throw new Error(
			'オーダーが見つかりません。ログインし直してもう一度お試しください。'
		)
	}
})

// @description   Stripe call
// @route         POST /api/orders/:id/stripe
// @access        Private

const stripeApi = asyncHandler(async (req, res) => {
	const {
		id,
		amount,
		metadata,
		name,
		addressInfo,
		orderInfo,
		shippingType,
		isGuest,
	} = req.body
	const payment = await stripe.paymentIntents.create({
		amount: amount,
		currency: 'JPY',
		description: name,
		payment_method: id,
		confirm: true,
		receipt_email: metadata.email_address,
		metadata,
	})
	console.log(payment)
	// if (payment) {
	// 	console.log('Payment', payment)
	// 	// res.json({
	// 	// 	message: 'Payment successfull',
	// 	// 	success: true,
	// 	// })
	const order = await Order.findById(req.params.id)
	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id,
			status: metadata.status,
			update_time: metadata.update_time,
			email_address: metadata.email_address,
		}

		const updatedOrder = await order.save()

		for (let item of updatedOrder.orderItems) {
			const product = await Product.findById(item.product)
			product.countInStock -= item.qty
			await product.save()
		}

		const mailInfo = {
			email: metadata.email_address,
			orderId: metadata.orderId,
			isGuest,
			amount,
			orderInfo,
			addressInfo,
			// orderInfo: metadata.orderInfo,
			shippingFee: metadata.shippingFee,
			shippingType,
		}

		sendOrderSuccessEmail(mailInfo)

		console.log(order)
		res.json(updatedOrder)
		// } else {
		// 	res.status(404)
		// 	throw new Error('Order not found')
		// }
	} else {
		console.log(error)
		res.status(500).json({
			message: 'Payment failed',
			success: false,
		})
	}
})

// @description   Make it as bankTransfer
// @route         POST /api/orders/:id/banktransfer
// @access        Private

const bankTransferOrder = asyncHandler(async (req, res) => {
	const {
		email,
		orderInfo,
		shippingFee,
		orderId,
		amount,
		addressInfo,
		shippingType,
		isGuest,
	} = req.body.bankTransferInfo

	const order = await Order.findById(req.params.id)
	if (order) {
		order.isBankTransfer = true
		const updatedOrder = await order.save()

		for (let item of updatedOrder.orderItems) {
			const product = await Product.findById(item.product)
			product.countInStock -= item.qty
			await product.save()
		}

		const mailInfo = {
			email,
			isGuest,
			orderId,
			amount,
			addressInfo,
			orderInfo,
			shippingFee,
			shippingType,
		}
		console.log(mailInfo)

		sendBankTransferInfo(mailInfo)
		//sendEmail
		res.json(updatedOrder)
	} else {
		console.log(error)
		res.status(500).json({
			message: 'banktransfer Failed',
			success: false,
		})
	}
})

// @description   Update order to paid
// @route         POST /api/orders/myorders
// @access        Private

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
	res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})

// @desc    Update ordered shipper info
// @route   GET
// @access  Private/Admin
const updateOrderShippingInfo = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (req.body) {
		order.shippingAddress = {
			...req.body,
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error(
			'オーダーが見つかりません。ログインし最初からもう一度お試しください。'
		)
	}
})

// @desc    Update ordered shipper info
// @route   GET
// @access  Private/Admin  /updatefee
const updateShippingFee = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	console.log('___________________________')
	console.log(req.body)
	if (req.body) {
		order.shippingPrice = req.body.shippingFee
		order.totalPrice = req.body.totalPriceCal
		order.shippingType = req.body.shippingType

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404).json({
			message: 'failed',
			success: false,
		})
		throw new Error(
			'オーダーが見つかりません。ログインし最初からもう一度お試しください。'
		)
	}
})

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	stripeApi,
	bankTransferOrder,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	updateOrderShippingInfo,
	updateShippingFee,
}
