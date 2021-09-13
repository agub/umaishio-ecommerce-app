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
			history.push('/checkemail')
		}
	}, [history, userInfo])

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
			<h1>新規会員登録</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name' className='mt-2'>
					<Form.Label>
						{' '}
						<div className='shipping-form-lable'>
							氏名{' '}
							<span className='shipping-form-icon'>必須</span>
						</div>
					</Form.Label>
					<Form.Control
						type='name'
						placeholder='氏名'
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>例: 旨い塩太郎</p>
				<Form.Group controlId='email'>
					<Form.Label>
						{' '}
						<div className='shipping-form-lable'>
							Email{' '}
							<span className='shipping-form-icon'>必須</span>
						</div>
					</Form.Label>
					<Form.Control
						required
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
						{' '}
						<div className='shipping-form-lable'>
							パスワード{' '}
							<span className='shipping-form-icon'>必須</span>
						</div>
					</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='パスワード'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<p className='m-2 shipping-form-example'>&nbsp;</p>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>
						{' '}
						<div className='shipping-form-lable'>
							確認パスワード{' '}
							<span className='shipping-form-icon'>必須</span>
						</div>
					</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='確認パスワード'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
						次へ進む　
					</Button>
					<Link className='btn btn-light my-3' to='/login'>
						戻る
					</Link>
				</div>
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
