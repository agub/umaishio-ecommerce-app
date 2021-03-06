import React, { useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

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
					<div className='shipping-form-lable__g'>
						氏名 <span className='form-asterisk__g'>*</span>
					</div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
					<Form.Control
						type='string'
						value={fullName}
						placeholder='氏名'
						required
						onChange={(e) => setFullName(e.target.value)}
					></Form.Control>
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>例: 旨い塩太郎</p>
			<Form.Group controlId='postalCode'>
				<Form.Label>
					<div className='shipping-form-lable__g'>
						フリガナ <span className='form-asterisk__g'>*</span>
					</div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
					<Form.Control
						type='string'
						value={furigana}
						placeholder='フリガナ'
						required
						onChange={(e) => setFurigana(e.target.value)}
					></Form.Control>
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>例: ウマイシオタロウ</p>
			<Form.Group controlId='postalCode'>
				<Form.Label>
					<div className='shipping-form-lable__g'>電話番号 </div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
					<Form.Control
						// type='string'
						type='text'
						placeholder='電話番号'
						// type='tel'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					></Form.Control>
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>例: 09022516873</p>

			<Form.Label>
				{' '}
				<div className='shipping-form-lable__g'>
					郵便番号 <span className='form-asterisk__g'>*</span>
				</div>
			</Form.Label>
			<Row>
				<Form.Group
					controlId='postalCode'
					className='mt-2'
					as={Col}
					sm={4}
					xs={5}
					lg={3}
				>
					<div className='form-container-pw-icon__g'>
						<Form.Control
							type='string'
							value={postalCode1}
							maxLength='3'
							placeholder='xxx'
							minLength='3'
							required
							onChange={(e) => setPostalCode1(e.target.value)}
						></Form.Control>
					</div>
					<p className='m-2 shipping-form-example__g'>例: 210</p>
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
					sm={5}
					xs={5}
					lg={3}
				>
					<div className='form-container-pw-icon__g'>
						<Form.Control
							type='string'
							value={postalCode2}
							maxLength='4'
							placeholder='xxxx'
							minLength='4'
							required
							onChange={(e) => setPostalCode2(e.target.value)}
						></Form.Control>
					</div>
					<p className='m-2 shipping-form-example__g'>例: 0021</p>
				</Form.Group>

				{/* <Button
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
				</Button> */}
			</Row>

			<Form.Group controlId='prefecture'>
				<Form.Label>
					<div className='shipping-form-lable__g'>
						都道府県 <span className='form-asterisk__g'>*</span>
					</div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
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
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>&nbsp;</p>
			<Form.Group controlId='address'>
				<Form.Label>
					{' '}
					<div className='shipping-form-lable__g'>
						市区町村・番地
						<span className='form-asterisk__g'>*</span>
					</div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
					<Form.Control
						type='text'
						value={address}
						placeholder='市区町村・番地'
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>例: 渋谷区x丁目</p>
			<Form.Group controlId='address'>
				<Form.Label>
					{' '}
					<div className='shipping-form-lable__g'>
						建物名・部屋番号
					</div>
				</Form.Label>
				<div className='form-container-pw-icon__g'>
					<Form.Control
						type='text'
						placeholder='建物名・部屋番号'
						value={building}
						onChange={(e) => setBuilding(e.target.value)}
					></Form.Control>
				</div>
			</Form.Group>
			<p className='m-2 shipping-form-example__g'>
				例: xxxマンション　101号室
			</p>
		</>
	)
}

export default ShippingForm
