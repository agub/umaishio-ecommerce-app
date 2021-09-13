import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
// import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

import GuestShippingScreen from './screens/GuestShippingScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
// import GuestScreen from './screens/GuestScreen'
import VerifyUserScreen from './screens/VerifyUserScreen'
import CheckEmailScreen from './screens/CheckEmailScreen'
import LandingScreen from './screens/LandingScreen'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

function App() {
	const PUBLIC_KEY =
		'pk_test_51IJyo2KVaW87j9kXOP9qNXMzZh4kXnF7aGEjohGwCfJlsS6XqHkTOii3ByC1CM1ypH8LYnk9iSk147lQklOJM7u900sGjrw6jH'

	const stripePromise = loadStripe(PUBLIC_KEY)

	return (
		<Router>
			<Header />
			<main className='py-3 main-bgc'>
				<Container>
					<Elements stripe={stripePromise}>
						<Route path='/order/:id' component={OrderScreen} />
					</Elements>
					<Route path='/shipping' component={ShippingScreen} />
					<Route
						path='/guestshipping'
						component={GuestShippingScreen}
					/>
					<Route path='/forgot' component={ForgotPasswordScreen} />
					<Route
						path='/password-reset/:id'
						component={ResetPasswordScreen}
					/>
					<Route path='/checkemail' component={CheckEmailScreen} />

					{/* <Route path='/payment' component={PaymentScreen} /> */}
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route
						path='/admin/user/:id/edit'
						component={UserEditScreen}
					/>
					<Route
						path='/admin/productlist'
						component={ProductListScreen}
						exact
					/>
					<Route
						path='/admin/product/:id/edit'
						component={ProductEditScreen}
					/>
					<Route
						path='/admin/orderlist'
						component={OrderListScreen}
					/>
					<Route
						path='/verify/:id/:token'
						component={VerifyUserScreen}
					/>
					<Route path='/list' component={HomeScreen} exact />
					<Route path='/' component={LandingScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
