import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Shin',
		email: 'shintrfc@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Yasu',
		email: 'yasu@example',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
