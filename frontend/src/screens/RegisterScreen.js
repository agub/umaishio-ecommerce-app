import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, redirect, userInfo])

	const submitHandler = (e) => {
		setMessage('')
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('パスワードが一致しません')
		} else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<FormContainer>
			<h1>新規登録</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>名前</Form.Label>
					<Form.Control
						type='name'
						placeholder='名前'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
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
				<Form.Group controlId='confirmPassword'>
					<Form.Label className='mt-2'>確認パスワード</Form.Label>
					<Form.Control
						type='password'
						placeholder='確認パスワード'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary' className='mt-3'>
					登録
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					アカウントをお持ちの方 <Link to={'/login'}>ログイン</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
