import React, { useState } from 'react'
import Meta from '../components/Meta'
import ModalContainer from '../components/ModalContainer'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ContactScreen = () => {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [content, setContent] = useState('')
	const [loading, setLoading] = useState(false)
	const [responseMsg, setResponseMsg] = useState(null)

	const submitHandler = async (e) => {
		e.preventDefault()
		console.log('fire')
		setLoading(true)
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			await axios.post(
				'/api/users/contact',
				{
					email,
					fullName,
					content,
				},
				config
			)
			setResponseMsg(true)
			setFullName('')
			setEmail('')
			setContent('')
			setLoading(false)
		} catch (error) {
			setResponseMsg(false)
			setLoading(false)
		}
	}

	return (
		<>
			<ModalContainer>
				<Meta
					title='旨い塩オンラインショップ　お問い合わせ'
					description='旨い塩オンラインショップへようこそ'
				/>
				<h1 className='text-center'>お問い合わせ</h1>
				<Form onSubmit={submitHandler}>
					{responseMsg && (
						<Message>お問い合わせを受付ました。</Message>
					)}
					{loading && <Loader />}
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								メールアドレス{' '}
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='email'
								value={email}
								required
								placeholder='メールアドレス'
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								氏名 <span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='string'
								value={fullName}
								required
								placeholder='氏名'
								onChange={(e) => setFullName(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								内容 <span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='text'
								placeholder='内容'
								as='textarea'
								value={content}
								style={{ height: 200 }}
								required
								onChange={(e) => setContent(e.target.value)}
							></Form.Control>
						</div>
					</Form.Group>

					<Button type='submit' className='next-gradient-btn__g mt-4'>
						送信
						<i className='fas fa-chevron-right fa-position-right'></i>
					</Button>
				</Form>
			</ModalContainer>
		</>
	)
}

export default ContactScreen
