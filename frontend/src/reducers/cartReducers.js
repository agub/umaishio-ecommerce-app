import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_ITEMS_RESET,
	CART_SAVE_SHIPPING_ADDRESS_REQUEST,
	CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_SUCCESS,
	CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_RESET,
} from '../constants/cartConstants'

export const cartReducer = (
	state = {
		cartItems: [],
		shippingAddress: {},
		loading: false,
		updated: false,
	},
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload

			const existItem = state.cartItems.find(
				(x) => x.product === item.product
			)

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(x) => x.product !== action.payload
				),
			}
		case CART_SAVE_SHIPPING_ADDRESS_SUCCESS:
			return {
				...state,
				shippingAddress: action.payload,
			}
		case CART_SAVE_SHIPPING_ADDRESS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_SUCCESS:
			return {
				...state,
				updated: true,
				loading: false,
			}
		case CART_SAVE_SHIPPING_ADDRESS_DATA_UPDATED_RESET:
			return {
				...state,
				updated: false,
			}
		case CART_ITEMS_RESET:
			return {
				...state,
				cartItems: [],
			}

		// case CART_SAVE_PAYMENT_METHOD:
		// 	return {
		// 		...state,
		// 		paymentMethod: action.payload,
		// 	}
		default:
			return state
	}
}
