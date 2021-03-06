import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Aos from 'aos'
import 'aos/dist/aos.css'
import ScrollToTop from './hooks/ScrollToTop'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
// import OrderScreen from './screens/OrderScreen'
import OrderScreenParent from './components/OrderScreenParent'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ContactScreen from './screens/ContactScreen'

import CompanyScreen from './screens/CompanyScreen'

import GuestShippingScreen from './screens/GuestShippingScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import VerifyUserScreen from './screens/VerifyUserScreen'
import CheckEmailScreen from './screens/CheckEmailScreen'
import LandingScreen from './screens/LandingScreen'

import ResetPasswordScreen from './screens/ResetPasswordScreen'
import RulesScreen from './screens/RulesScreen'

function App() {
	// const PUBLIC_KEY =
	// 	'pk_live_51JhBtOGBYewul3wwTHX1ZbJENfmXoKL18EVaztjUIiaSXtEBdoYRo91cDTkA0KfDdWFejJgTQYe25T7y6nQnpHrD007CpugwIf'
	// // const PUBLIC_KEY =
	// // 	'pk_test_51IJyo2KVaW87j9kXOP9qNXMzZh4kXnF7aGEjohGwCfJlsS6XqHkTOii3ByC1CM1ypH8LYnk9iSk147lQklOJM7u900sGjrw6jH'

	// const stripePromise = loadStripe(PUBLIC_KEY)

	useEffect(() => {
		Aos.init({ duration: 3000 })
	}, [])

	return (
		<Router>
			{/* <ScrollToTop> */}
			<ScrollToTop />
			<Header />
			<main className='py-3 main-bgc'>
				<Container>
					<Route path='/' component={LandingScreen} exact />

					{/* <span style={{ color: 'red' }}>
							??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
						</span> */}
					{/* <Elements stripe={stripePromise}> */}
					{/* <Route path='/order/:id' component={OrderScreen} /> */}
					<Route path='/order/:id' component={OrderScreenParent} />
					{/* </Elements> */}
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
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/contact' component={ContactScreen} />
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
					<Route path='/company' component={CompanyScreen} />
					<Route path='/rules' component={RulesScreen} />
					<Route path='/shop' component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
