import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../actions/userActions'

const VerifyUserScreen = ({ match, history }) => {
	const dispatch = useDispatch()
	const { id, token } = match.params

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const userVerify = useSelector((state) => state.userVerify)
	const { success } = userVerify

	useEffect(() => {
		if (!success) {
			dispatch(verifyUser(id, token))
			if (cartItems.length === 0) {
				history.push('/shop')
			} else {
				history.push('/login?redirect=shipping')
			}
		}
	}, [success])
	return null
}

export default VerifyUserScreen
