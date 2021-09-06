import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'

import { usePostalJp } from 'use-postal-jp'

const ShippingForm = ({
	fullName,
	setFullName,
	phoneNumber,
	setPhoneNumber,
	postalCode1,
	postalCode2,
	setPostalCode1,
	setPostalCode2,
	prefecture,
	setPrefecture,
	address,
	setAddress,
}) => {
	//address
	const {
		address: pcAddress,
		error,
		pending,
		sanitizedCode,
		setPostalCode,
	} = usePostalJp()

	useEffect(() => {
		let postalCode
		if (postalCode1 !== '' && postalCode2 !== '') {
			postalCode = postalCode1 + postalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
			setPostalCode(postalCode)
			if (
				!pending &&
				!error &&
				pcAddress.prefecture &&
				pcAddress.address1 &&
				pcAddress.address2
			) {
				setPrefecture(pcAddress.prefecture)
				setAddress(pcAddress.address1 + pcAddress.address2)
			}
		}
	}, [pcAddress, setPostalCode, postalCode1, postalCode2, setPrefecture])

	//address
	return (
		<>
			<Form.Group controlId='postalCode' className='mt-2'>
				<Form.Label>
					<div className='shipping-form-lable'>
						氏名 <span className='shipping-form-icon'>必須</span>
					</div>
				</Form.Label>
				<Form.Control
					type='string'
					value={fullName}
					required
					onChange={(e) => setFullName(e.target.value)}
				></Form.Control>
			</Form.Group>
			<div className='m-2 shipping-form-example'>例: 09022516873</div>
			<Form.Group controlId='postalCode'>
				<Form.Label>
					<div className='shipping-form-lable'>電話番号 </div>
				</Form.Label>
				<Form.Control
					type='number'
					value={phoneNumber}
					required
					onChange={(e) => setPhoneNumber(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: 09022516873</p>

			<Form.Group controlId='postalCode'>
				<Form.Label>
					{' '}
					<div className='shipping-form-lable'>
						郵便番号{' '}
						<span className='shipping-form-icon'>必須</span>
					</div>
				</Form.Label>
				<Form.Control
					type='string'
					value={postalCode1}
					maxLength='7'
					minLength='7'
					required
					onChange={(e) => setPostalCode1(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: 1020021</p>

			<Form.Group controlId='prefecture'>
				<Form.Label>
					<div className='shipping-form-lable'>
						都道府県{' '}
						<span className='shipping-form-icon'>必須</span>
					</div>
				</Form.Label>
				<Form.Control
					className='form-select'
					as='select'
					value={prefecture}
					placeholder='選択してください'
					required
					onChange={(e) => setPrefecture(e.target.value)}
				>
					{PREF_OPTIONS.map((x) => (
						<option key={x} value={x}>
							{x}
						</option>
					))}
				</Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>&nbsp;</p>
			<Form.Group controlId='address'>
				<Form.Label>
					{' '}
					<div className='shipping-form-lable'>
						市区町村・番地
						<span className='shipping-form-icon'>必須</span>
					</div>
				</Form.Label>
				<Form.Control
					type='text'
					value={address}
					required
					onChange={(e) => setAddress(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: 1020021</p>
		</>
	)
}

export default ShippingForm
