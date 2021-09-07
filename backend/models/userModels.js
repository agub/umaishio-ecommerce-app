import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
			// required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		//googleauth
		// password: {
		// 	type: String,
		// 	required: true,
		// },
		password: {
			type: String,
			required: false,
		},
		isGuest: {
			type: Boolean,
			required: true,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},

		shippingAddress: {
			fullName: { type: String },
			furigana: { type: String },
			phoneNumber: { type: Number },
			postalCode: { type: String || Number },
			prefecture: { type: String },
			address: { type: String },
			building: { type: String },
		},
		//googleauth
		googleId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
