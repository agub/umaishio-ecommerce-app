import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS_REQUEST,
	CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS_FAIL,
	CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_RESET,
} from '../constants/cartConstants'

import { USER_LOGIN_SUCCESS } from '../constants/userConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (objects) => async (dispatch, getState) => {
	//only for !isGuest
	try {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS_REQUEST,
		})

		localStorage.setItem('shippingAddress', JSON.stringify(objects))
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
			payload: objects,
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
			`/api/users/shipping/${userInfo._id}`,
			objects,
			config
		)
		localStorage.setItem('userInfo', JSON.stringify(data))
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_SUCCESS,
			payload: data,
		})
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_RESET,
		})

		//save to user data
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS_FAIL,
			payload: message,
		})
	}
}
// export const saveShippingAddress = (objects) => async (dispatch, getState) => {
// 	dispatch({
// 		type: CART_SAVE_SHIPPING_ADDRESS,
// 		payload: objects,
// 	})

// 	//save to user data

// 	localStorage.setItem('shippingAddress', JSON.stringify(objects))
// }
