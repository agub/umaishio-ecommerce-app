import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logout())
		window.location = '/'
	}

	return (
		<header>
			<Navbar collapseOnSelect bg='dark' variant='dark' expand='lg'>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>旨い塩</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<LinkContainer
								to='/cart'
								style={{
									position: 'relative',
									justifyContent: 'center',
								}}
							>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>{' '}
									<span className='header-cartnumber'>
										{getCartCount()}
									</span>
									&nbsp; Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>{' '}
										&nbsp;サインイン
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='管理者' id='adminmenu'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>
											ユーザー
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>
											在庫
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>
											注文一覧
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
