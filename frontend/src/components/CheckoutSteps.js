import React from 'react'
import { Nav, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav
			className='checkoutStepBar justify-content-center align-items-center mb-4 mt-4'
			style={
				{
					// 'width': '100%',
					// 'display': 'flex',
					// 'fontSize': '0.9rem',
					// 'textAlign': 'center',
					// 'justifyContent': 'space-evenly',
				}
			}
		>
			{/* <Nav.Item>
				{step1 ? (
					<LinkContainer to='/login' className='p-0'>
						<Nav.Link>ログイン</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className='p-0'>
						ログイン
					</Nav.Link>
				)}
			</Nav.Item> */}

			<Nav.Item className='checkoutStep'>
				{step2 ? (
					<LinkContainer to='/shipping' className='p-0'>
						<Nav.Link>お届け先住所</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className='p-0'>
						お届け先住所
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item className='checkoutStep'>
				{step3 ? (
					<LinkContainer to='/payment' className='p-0'>
						<Nav.Link>お支払い方法</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className='p-0'>
						お支払い方法
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item className='checkoutStep'>
				{step4 ? (
					<LinkContainer to='/placeorder' className='p-0'>
						<Nav.Link>ご注文の確認</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled className='p-0'>
						ご注文の確認
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	)
}

export default CheckoutSteps
