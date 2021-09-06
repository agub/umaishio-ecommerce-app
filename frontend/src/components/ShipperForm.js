import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { PREF_OPTIONS } from '../data/Prefecture'

import { usePostalJp } from 'use-postal-jp'

const ShipperForm = ({
	isShipper,
	shipperFullName,
	shipperPhoneNumber,
	shipperPostalCode1,
	shipperPostalCode2,
	shipperPrefecture,
	shipperAddress,
	setShipperFullName,
	setShipperPhoneNumber,
	setShipperPostalCode1,
	setShipperPostalCode2,
	setShipperPrefecture,
	setShipperAddress,
}) => {
	const {
		address: pcAddress,
		error,
		pending,
		sanitizedCode,
		setPostalCode,
	} = usePostalJp()

	useEffect(() => {
		let postalCode
		if (shipperPostalCode1 !== '' && shipperPostalCode2 !== '') {
			postalCode = shipperPostalCode1 + shipperPostalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
			setPostalCode(postalCode)
			if (
				!pending &&
				!error &&
				pcAddress.prefecture &&
				pcAddress.address1 &&
				pcAddress.address2
			) {
				setShipperPrefecture(pcAddress.prefecture)
				setShipperAddress(pcAddress.address1 + pcAddress.address2)
			}
		}
	}, [
		pcAddress,
		setPostalCode,
		shipperPostalCode1,
		shipperPostalCode2,
		setShipperPrefecture,
		setShipperAddress,
	])

	return (
		<>
			{isShipper && (
				<>
					<h1 className='mt-3'>依頼人情報</h1>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>送り主氏名</Form.Label>
						<Form.Control
							type='string'
							value={shipperFullName}
							required
							onChange={(e) => setShipperFullName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>電話番号</Form.Label>
						<Form.Control
							type='number'
							value={shipperPhoneNumber}
							required
							onChange={(e) =>
								setShipperPhoneNumber(e.target.value)
							}
						></Form.Control>
					</Form.Group>
					<Row>
						<Form.Group
							controlId='postalCode'
							className='mt-2'
							as={Col}
							sm={3}
							xs={4}
						>
							<Form.Label>郵便番号</Form.Label>
							<Form.Control
								type='string'
								value={shipperPostalCode1}
								maxLength='3'
								minLength='3'
								required
								onChange={(e) =>
									setShipperPostalCode1(e.target.value)
								}
							></Form.Control>
						</Form.Group>
						<div
							style={{
								width: '10px',
								height: '100%',
								display: 'flex',
								marginTop: 'auto',
								paddingBottom: '15px',
							}}
						>
							{/* <h3 style={{ marginTop: '6px' }}>-</h3> */}-
						</div>
						<Form.Group
							controlId='postalCode'
							className='mt-2'
							as={Col}
							sm={3}
							xs={4}
						>
							<Form.Label>&nbsp;</Form.Label>

							<Form.Control
								type='string'
								value={shipperPostalCode2}
								maxLength='4'
								minLength='4'
								required
								onChange={(e) =>
									setShipperPostalCode2(e.target.value)
								}
							></Form.Control>
						</Form.Group>
					</Row>
					<Form.Group controlId='prefecture' className='mt-2'>
						<Form.Label>都道府県</Form.Label>
						<Form.Control
							className='form-select'
							as='select'
							value={shipperPrefecture}
							placeholder='選択してください'
							required
							onChange={(e) =>
								setShipperPrefecture(e.target.value)
							}
						>
							{PREF_OPTIONS.map((x) => (
								<option key={x} value={x}>
									{x}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='address' className='mt-2'>
						<Form.Label>住所</Form.Label>
						<Form.Control
							type='text'
							value={shipperAddress}
							required
							onChange={(e) => setShipperAddress(e.target.value)}
						></Form.Control>
					</Form.Group>
				</>
			)}
		</>
	)
}

export default ShipperForm
