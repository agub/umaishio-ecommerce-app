import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
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
			const response = await axios.post(
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
			<FormContainer>
				<h1>お問い合わせ</h1>
				<Form onSubmit={submitHandler}>
					{responseMsg && (
						<Message>お問い合わせを受付ました。</Message>
					)}
					{loading && <Loader />}
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								Email{' '}
								<span className='shipping-form-icon__g'>
									必須
								</span>
							</div>
						</Form.Label>
						<Form.Control
							type='email'
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								氏名{' '}
								<span className='shipping-form-icon__g'>
									必須
								</span>
							</div>
						</Form.Label>
						<Form.Control
							type='string'
							value={fullName}
							required
							onChange={(e) => setFullName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								内容{' '}
								<span className='shipping-form-icon__g'>
									必須
								</span>
							</div>
						</Form.Label>
						<Form.Control
							type='text'
							as='textarea'
							value={content}
							style={{ height: 200 }}
							required
							onChange={(e) => setContent(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit'>送信</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default ContactScreen
