import React, { useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { PREF_OPTIONS } from '../data/Prefecture'

import { usePostalJp } from 'use-postal-jp'

const ShippingForm = ({
	fullName,
	furigana,
	phoneNumber,
	setPhoneNumber,
	postalCode1,
	postalCode2,
	setFullName,
	setFurigana,
	setPostalCode1,
	setPostalCode2,
	prefecture,
	setPrefecture,
	address,
	setAddress,
	building,
	setBuilding,
}) => {
	//address
	const { address: pcAddress, setPostalCode } = usePostalJp()

	useEffect(() => {
		let postalCode
		if (postalCode1 !== '' && postalCode2 !== '') {
			postalCode = postalCode1 + postalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
			setPostalCode(postalCode)
			setTimeout(() => {
				if (
					pcAddress.prefecture &&
					pcAddress.address1 &&
					pcAddress.address2
				) {
					setPrefecture(pcAddress.prefecture)
					setAddress(pcAddress.address1 + pcAddress.address2)
				}
			}, 300)
		}
	}, [
		pcAddress,
		setPostalCode,
		postalCode1,
		postalCode2,
		setPrefecture,
		setAddress,
		prefecture,
	])

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
			<p className='m-2 shipping-form-example'>例: 旨い塩太郎</p>
			<Form.Group controlId='postalCode'>
				<Form.Label>
					<div className='shipping-form-lable'>
						フリガナ{' '}
						<span className='shipping-form-icon'>必須</span>
					</div>
				</Form.Label>
				<Form.Control
					type='string'
					value={furigana}
					required
					onChange={(e) => setFurigana(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: ウマイシオタロウ</p>
			<Form.Group controlId='postalCode'>
				<Form.Label>
					<div className='shipping-form-lable'>電話番号 </div>
				</Form.Label>
				<Form.Control
					type='number'
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: 09022516873</p>

			<Form.Label>
				{' '}
				<div className='shipping-form-lable'>
					郵便番号 <span className='shipping-form-icon'>必須</span>
				</div>
			</Form.Label>
			<Row>
				<Form.Group
					controlId='postalCode'
					className='mt-2'
					as={Col}
					sm={3}
					xs={4}
				>
					<Form.Control
						type='string'
						value={postalCode1}
						maxLength='3'
						minLength='3'
						required
						onChange={(e) => setPostalCode1(e.target.value)}
					></Form.Control>
					<p className='m-2 shipping-form-example'>例: 210</p>
				</Form.Group>
				<div
					style={{
						width: '10px',
						height: '100%',
						display: 'flex',
						marginTop: '20px',
						marginBottom: 'auto',
						paddingBottom: '15px',
					}}
				>
					-
				</div>
				<Form.Group
					controlId='postalCode'
					className='mt-2'
					as={Col}
					sm={3}
					xs={4}
				>
					<Form.Control
						type='string'
						value={postalCode2}
						maxLength='4'
						minLength='4'
						required
						onChange={(e) => setPostalCode2(e.target.value)}
					></Form.Control>
					<p className='m-2 shipping-form-example'>例: 0021</p>
				</Form.Group>

				<Button
					className='btn-sm'
					size='sm'
					variant='secondary'
					style={{
						width: '100px',
						marginTop: '8px',
						height: '50px',
						display: 'inline-block',
					}}
				>
					住所検索
				</Button>
			</Row>

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
			<Form.Group controlId='address'>
				<Form.Label>
					{' '}
					<div className='shipping-form-lable'>建物名・部屋番号</div>
				</Form.Label>
				<Form.Control
					type='text'
					value={building}
					onChange={(e) => setBuilding(e.target.value)}
				></Form.Control>
			</Form.Group>
			<p className='m-2 shipping-form-example'>例: 1020021</p>
		</>
	)
}

export default ShippingForm
