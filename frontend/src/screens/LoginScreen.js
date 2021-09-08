import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, redirect, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1 style={{ fontSize: '1.5rem' }}>ログイン</h1>
			<div className='login-forgot'>
				<Link
					// to={redirect ? `/guest?redirect=${redirect}` : '/guest'}
					to={'/forgot'}
				>
					<Button style={{ padding: '3px 8px' }} variant='secondary'>
						パスワードをお忘れた方
					</Button>
				</Link>
			</div>
			{error && <Message variant='danger'>{error}</Message>}

			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>
						<div className='shipping-form-lable'>
							Email{' '}
							{/* <span className='shipping-form-icon'>必須</span> */}
						</div>
					</Form.Label>
					<Form.Control
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>
					例: umaishio@gmail.com
				</p>
				<Form.Group controlId='password'>
					<Form.Label>
						<div className='shipping-form-lable'>
							パスワード{' '}
							{/* <span className='shipping-form-icon'>必須</span> */}
						</div>
					</Form.Label>
					<Form.Control
						type='password'
						placeholder='パスワード'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>&nbsp;</p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Button type='submit' variant='primary'>
						サインイン
					</Button>
					{Array.isArray(cartItems) && cartItems.length !== 0 && (
						<Link
							// to={redirect ? `/guest?redirect=${redirect}` : '/guest'}
							to={'/guestshipping'}
						>
							<Button
								className='login-guest-btn'
								variant='secondary'
							>
								ゲストして次へ進む&nbsp;&nbsp;&nbsp;
								<i className='fas fa-chevron-right'></i>
							</Button>
						</Link>
					)}
				</div>
			</Form>

			<Row className='py-3'>
				<Col>
					未登録の方は{' '}
					<Link
						to={
							redirect
								? `/register?redirect=${redirect}`
								: '/register'
						}
					>
						新規登録
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
