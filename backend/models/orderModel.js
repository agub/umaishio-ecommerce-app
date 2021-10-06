import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			fullName: { type: String, required: true },
			furigana: { type: String, required: true },
			phoneNumber: { type: String },
			postalCode: { type: String || Number, required: true },
			prefecture: { type: String, required: true },
			address: { type: String, required: true },
			building: { type: String },

			isShipper: { type: Boolean, default: false },
			isComment: { type: Boolean, default: false },
			comment: { type: String },
			shipperFullName: { type: String },
			shipperFurigana: { type: String },
			shipperPhoneNumber: { type: String },
			shipperPostalCode: { type: String || Number },
			shipperPrefecture: { type: String },
			shipperAddress: { type: String },
			shipperBuilding: { type: String },
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		itemsPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		shippingType: {
			type: String,
		},
		trackingId: {
			type: Number,
		},
		// taxPrice: {
		// 	type: Number,
		// 	required: true,
		// 	default: 0,
		// },
		shippingPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		isBankTransfer: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)
const Order = mongoose.model('Order', orderSchema)

export default Order
