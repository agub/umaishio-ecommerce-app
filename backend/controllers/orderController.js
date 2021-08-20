import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
const stripe = Stripe(process.env.STRIPE_SECRET)
// @description   Create new order
// @route         POST /api/orders
// @access        Private

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.lengh === 0) {
		res.status(400)
		throw new Error('No order Items')
		return
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
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
		throw new Error('Order not found')
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
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// @description   Stripe call
// @route         POST /api/orders/:id/stripe
// @access        Private

const stripeApi = asyncHandler(async (req, res) => {
	const { id, amount, metadata, name } = req.body

	try {
		if (amount && id) {
			const payment = await stripe.paymentIntents.create({
				amount: amount,
				currency: 'JPY',
				description: name,
				payment_method: id,
				confirm: true,
				metadata,
			})

			console.log('Payment', payment)
			res.json({
				message: 'Payment successfull',
				success: true,
			})
		}
	} catch (error) {
		console.log(error)
		res.json({
			message: 'Payment failed',
			success: false,
		})
	}
})

export { addOrderItems, getOrderById, updateOrderToPaid, stripeApi }