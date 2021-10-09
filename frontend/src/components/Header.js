import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import logo from '../data/images/logo.png'

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
			<Navbar
				collapseOnSelect
				style={{ backgroundColor: '#f5f5f5', zIndex: 1000 }}
				// bg='dark'
				// variant='dark'
				// fixed='top'
				expand='lg'
			>
				<Container>
					{/* <LinkContainer to='/'> */}
					<Navbar.Brand href='/'>
						<Image
							src={logo}
							alt='logo'
							style={{ width: '200px' }}
						/>
					</Navbar.Brand>
					{/* </LinkContainer> */}
					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<LinkContainer exact to='/'>
								<Nav.Link>ホーム</Nav.Link>
							</LinkContainer>
							<LinkContainer exact to='/shop'>
								<Nav.Link>ショップ</Nav.Link>
							</LinkContainer>
							<LinkContainer exact to='/contact'>
								<Nav.Link>お問い合わせ</Nav.Link>
							</LinkContainer>
							<LinkContainer
								exact
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

							{userInfo && !userInfo.isGuest ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											注文履歴 & 設定
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										ログアウト
									</NavDropdown.Item>
								</NavDropdown>
							) : userInfo && userInfo.isGuest ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
								>
									<NavDropdown.Item onClick={logoutHandler}>
										ログアウト
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
								<NavDropdown
									title='管理者メニュー'
									id='adminmenu'
								>
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
