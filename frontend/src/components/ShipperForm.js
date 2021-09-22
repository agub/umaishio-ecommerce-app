import React, { useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { PREF_OPTIONS } from '../data/Prefecture'

import { usePostalJp } from 'use-postal-jp'

const ShipperForm = ({
	isShipper,
	shipperFullName,
	shipperFurigana,
	shipperPhoneNumber,
	shipperPostalCode1,
	shipperPostalCode2,
	shipperPrefecture,
	shipperAddress,
	shipperBuilding,
	setShipperFullName,
	setShipperFurigana,
	setShipperPhoneNumber,
	setShipperPostalCode1,
	setShipperPostalCode2,
	setShipperPrefecture,
	setShipperAddress,
	setShipperBuilding,
}) => {
	const { address: pcAddress, setPostalCode } = usePostalJp()

	useEffect(() => {
		let postalCode
		if (shipperPostalCode1 !== '' && shipperPostalCode2 !== '') {
			postalCode = shipperPostalCode1 + shipperPostalCode2
			// postalCode1.substring(0, 2) + postalCode2.substring(2, 6)
			setPostalCode(postalCode)
			setTimeout(() => {
				if (
					pcAddress.prefecture &&
					pcAddress.address1 &&
					pcAddress.address2
				) {
					setShipperPrefecture(pcAddress.prefecture)
					setShipperAddress(pcAddress.address1 + pcAddress.address2)
				}
			}, 300)
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
						<Form.Label>
							<div className='shipping-form-lable__g'>
								氏名 <span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='string'
								value={shipperFullName}
								required
								onChange={(e) =>
									setShipperFullName(e.target.value)
								}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>
						例: 旨い塩太郎
					</p>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								フリガナ{' '}
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='string'
								value={shipperFurigana}
								required
								onChange={(e) =>
									setShipperFurigana(e.target.value)
								}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>
						例: ウマイシオタロウ
					</p>
					<Form.Group controlId='postalCode' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								電話番号{' '}
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='number'
								value={shipperPhoneNumber}
								onChange={(e) =>
									setShipperPhoneNumber(e.target.value)
								}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>
						例: 09022516873
					</p>
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
							sm={3}
							xs={4}
						>
							<div className='form-container-pw-icon__g'>
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
							</div>
							<p className='m-2 shipping-form-example__g'>
								例: 210
							</p>
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
							<div className='form-container-pw-icon__g'>
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
							</div>
							<p className='m-2 shipping-form-example__g'>
								例: 0021
							</p>
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
					<Form.Group controlId='prefecture' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								都道府県
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
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
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>&nbsp;</p>
					<Form.Group controlId='address' className='mt-2'>
						<Form.Label>
							<div className='shipping-form-lable__g'>
								市区町村・番地
								<span className='form-asterisk__g'>*</span>
							</div>
						</Form.Label>
						<div className='form-container-pw-icon__g'>
							<Form.Control
								type='text'
								value={shipperAddress}
								required
								onChange={(e) =>
									setShipperAddress(e.target.value)
								}
							></Form.Control>
						</div>
						<p className='m-2 shipping-form-example__g'>
							例: 1020021
						</p>
					</Form.Group>
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
								value={shipperBuilding}
								onChange={(e) =>
									setShipperBuilding(e.target.value)
								}
							></Form.Control>
						</div>
					</Form.Group>
					<p className='m-2 shipping-form-example__g'>例: 1020021</p>
				</>
			)}
		</>
	)
}

export default ShipperForm
