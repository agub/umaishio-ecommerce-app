import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, getGoogleUserInfo } from '../actions/userActions'
import axios from 'axios'
import { registerGuest } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [guestEmail, setGuestEmail] = useState('')
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const userRegister = useSelector((state) => state.userRegister)
	const {
		loading: registerLoading,
		error: registerError,
		userInfo: registerUserInfo,
	} = userRegister

	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, redirect, userInfo])

	// useEffect(() => {
	// 	if (!userInfo) {
	// 		dispatch(getGoogleUserInfo())
	// 	}
	// 	// eslint-disable-next-line
	// }, [])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>ログイン</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{registerError && (
				<Message variant='danger'>{registerError}</Message>
			)}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>
						<div className='shipping-form-lable'>
							Email{' '}
							<span className='shipping-form-icon'>必須</span>
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
							<span className='shipping-form-icon'>必須</span>
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

					<Link
						to={redirect ? `/guest?redirect=${redirect}` : '/guest'}
					>
						<Button variant='secondary'>
							ゲストして次へ進む&nbsp;&nbsp;&nbsp;
							<i className='fas fa-chevron-right'></i>
						</Button>
					</Link>
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
