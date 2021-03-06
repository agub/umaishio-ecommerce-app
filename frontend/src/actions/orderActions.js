import axios from 'axios'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
	STRIPE_PAY_REQUEST,
	STRIPE_PAY_SUCCESS,
	STRIPE_PAY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_SUCCESS,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	BANKTRANSFER_FAIL,
	BANKTRANSFER_SUCCESS,
	BANKTRANSFER_REQUEST,
	ORDER_UPDATE_SHIPPER_FAIL,
	ORDER_UPDATE_SHIPPER_SUCCESS,
	ORDER_UPDATE_SHIPPER_REQUEST,
	ORDER_UPDATE_SHIPPINGFEE_REQUEST,
	ORDER_UPDATE_SHIPPINGFEE_SUCCESS,
	ORDER_UPDATE_SHIPPINGFEE_FAIL,
} from '../constants/orderConstants'

import { logout } from './userActions'
// import { updateShippingFee } from '../actions/orderActions'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/orders`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
		// dispatch({
		// 	type: CART_CLEAR_ITEMS,
		// 	payload: data,
		// })
		// localStorage.removeItem('cartItems')
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
		// dispatch({
		// 	type: CART_CLEAR_ITEMS,
		// 	payload: data,
		// })
		// localStorage.removeItem('cartItems')

		// idk
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
		// dispatch({
		// 	type: CART_CLEAR_ITEMS,
		// 	payload: data,
		// })
		// localStorage.removeItem('cartItems')
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: message,
		})
	}
}

export const payOnStirpe = (orderId, paymentDetails) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: STRIPE_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(
			`/api/orders/${orderId}/stripe`,
			paymentDetails,
			config
		)

		console.log(data)
		dispatch({
			type: STRIPE_PAY_SUCCESS,
			payload: data,
		})
		console.log('payment success')

		dispatch(
			updateShippingFee(orderId, {
				shippingFee: paymentDetails.metadata.shippingFee,
				totalPriceCal: paymentDetails.amount,
				shippingType: paymentDetails.shippingType,
			})
		)
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: STRIPE_PAY_FAIL,
			payload: message,
		})
	}
}

export const bankTransferOrder = (orderId, bankTransferInfo) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: BANKTRANSFER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(
			`/api/orders/${orderId}/banktransfer`,
			{ bankTransferInfo },
			config
		)

		console.log(data)
		dispatch({
			type: BANKTRANSFER_SUCCESS,
			payload: data,
		})
		dispatch(
			updateShippingFee(orderId, {
				shippingFee: bankTransferInfo.shippingFee,
				totalPriceCal: bankTransferInfo.amount,
				shippingType: bankTransferInfo.shippingType,
			})
		)
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: BANKTRANSFER_FAIL,
			payload: message,
		})
	}
}

export const deliverOrder = (order, emailInfo) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${order._id}/deliver`,
			{ emailInfo },
			config
		)

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: message,
		})
	}
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/orders/myorders`, config)

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/orders`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: message,
		})
	}
}

export const updateShipperInfo = (orderId, shippingAddress) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_UPDATE_SHIPPER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${orderId}/updateShipper`,
			shippingAddress,
			config
		)

		dispatch({
			type: ORDER_UPDATE_SHIPPER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_UPDATE_SHIPPER_FAIL,
			payload: message,
		})
	}
}

export const updateShippingFee = (orderId, shippingfee) => async (
	dispatch,
	getState
) => {
	console.log('fireUpdateShipping Fee')
	try {
		dispatch({
			type: ORDER_UPDATE_SHIPPINGFEE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${orderId}/updateFee`,
			shippingfee,
			config
		)

		dispatch({
			type: ORDER_UPDATE_SHIPPINGFEE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_UPDATE_SHIPPINGFEE_FAIL,
			payload: message,
		})
	}
}
