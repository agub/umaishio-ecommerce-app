import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const [modify, setModify] = useState(true)

	const dispatch = useDispatch()
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails('profile'))
				// dispatch({ type: USER_UPDATE_PROFILE_RESET })
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, user])

	const submitHandler = (e) => {
		setMessage('')
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('パスワードが一致しません')
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			)
			setPassword('')
			setConfirmPassword('')
		}
	}

	return (
		<Row>
			<Col md={3} className='mb-4'>
				<h2>プロフィール</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>変更しました</Message>}
				{loading && <Loader />}
				{modify ? (
					<>
						<Card className='mt-4 mb-4'>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col md={12}>名前:</Col>
										<Col>
											<p>{name}</p>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col md={12}>Email:</Col>
										<Col>
											<p>{email}</p>
										</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
						<Button
							onClick={() => setModify(!modify)}
							variant='danger'
							className='w-100'
						>
							ユーザー情報変更
						</Button>
					</>
				) : (
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
							<Form.Label className='mt-2'>
								確認パスワード
							</Form.Label>
							<Form.Control
								type='password'
								placeholder='確認パスワード'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							></Form.Control>
						</Form.Group>
						<Button
							type='submit'
							variant='primary'
							className='mt-3  w-100'
							disabled={loading}
						>
							変更
						</Button>
						<Button
							variant
							className='mt-3 w-100'
							onClick={() => {
								setModify(!modify)
								dispatch({
									type: USER_UPDATE_PROFILE_RESET,
								})
							}}
						>
							キャンセル
						</Button>
					</Form>
				)}
			</Col>

			<Col md={9}>
				<h2>my orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
