import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'

import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import logo from '../data/images/logo.png'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList
	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	return (
		<>
			<Meta />
			<h3 className='my-3'>商品一覧</h3>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col
							className='align-items-stretch d-flex'
							key={product._id}
							sm={12}
							md={6}
							lg={4}
							xl={3}
						>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
			<LinkContainer
				exact
				to='/cart'
				// style={{
				// 	position: 'relative',
				// 	justifyContent: 'center',
				// }}
				className='cartTo'
			>
				<Nav.Link className='home-cartButton'>
					<i className='fas fa-shopping-cart'></i>{' '}
					<span className='header-cartnumber'>{getCartCount()}</span>
				</Nav.Link>
			</LinkContainer>
		</>
	)
}

export default HomeScreen
