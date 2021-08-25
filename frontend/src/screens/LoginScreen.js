import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, getGoogleUserInfo } from '../actions/userActions'
import axios from 'axios'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

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

	// const signInWithGoogleHandler = async (e) => {
	// 	e.preventDefault()
	// 	// await axios.get('/api/auth/google')

	// 	// window.location.href = `/api/auth/google?redirect=${redirect}`

	// 	window.location.href = `http://127.0.0.1:5000/api/auth/google`

	// 	// dispatch(getGoogleUserInfo())
	// }

	return (
		<FormContainer>
			<h1>サインイン</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label className='mt-2'>パスワード</Form.Label>
					<Form.Control
						type='password'
						placeholder='パスワード'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary' className='mt-3'>
					サインイン
				</Button>
			</Form>
			{/* <Button
				type='button'
				variant='danger'
				onClick={signInWithGoogleHandler}
			>
				<i className='fab fa-google left'> Sign In With Google</i>
			</Button> */}

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
