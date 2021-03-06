import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'

const EditableCartItems = ({ item }) => {
	const dispatch = useDispatch()
	let maxPurchase = 40
	return (
		<Row className='cart-row'>
			<Col xs={5}>
				<Image src={item.image} alt={item.name} fluid rounded />
			</Col>
			<Col xs={7} className='edit-cart-row-right__g'>
				{/* <Row> */}
				<Col xs={12}>
					<div>
						<Link to={`/product/${item.product}`}>{item.name}</Link>
						<div>
							<div
								style={{
									fontSize: '10px',
								}}
							>
								<Rating
									value={item.rating}
									text={`( ${item.numReviews} )`}
								/>
							</div>
						</div>
					</div>
				</Col>
				<Col xs={12} className='select-wrap-sm__g shipping-row-mg__g'>
					<span className='shipping-select-top__g'>数量</span>
					{/* <select
						as='select'
						value={item.qty}
						className='cart-select-form'
						// style={{
						// 	padding:
						// 		'0.75rem 0.2rem 0.75rem 0.4rem',
						// }}
						onChange={(e) =>
							dispatch(
								addToCart(item.product, Number(e.target.value))
							)
						}
					>
						{[...Array(item.countInStock).keys()].map((x) => (
							<option key={x + 1} value={x + 1}>
								{x + 1}
							</option>
						))}
					</select> */}
					<div className='crement-wrap__g'>
						<button
							className='product-page-crement'
							type='button'
							onClick={() => {
								if (item.qty === 1) {
									return
								} else {
									dispatch(
										addToCart(
											item.product,
											Number(item.qty) - 1
										)
									)
								}
							}}
						>
							<i className='fa fa-minus'></i>
						</button>
						<select
							className='form-select form-control-select__g'
							value={item.qty}
							onChange={(e) =>
								dispatch(
									addToCart(
										item.product,
										Number(e.target.value)
									)
								)
							}
						>
							{[...Array(maxPurchase).keys()].map((x) => (
								<option key={x + 1} value={x + 1}>
									{x + 1}
								</option>
							))}
						</select>
						<button
							className='product-page-crement'
							type='button'
							onClick={() =>
								dispatch(
									addToCart(
										item.product,
										Number(item.qty) + 1
									)
								)
							}
						>
							<i className='fas fa-plus'></i>
						</button>
					</div>
					{/* <span className='ml-20'>
											¥{item.price}
										</span> */}
				</Col>

				{/* <Col
										md={4}
										xs={12}
										className='cart-row-mg__mobile cart-row-total__mobile'
									>
										小計:
										<span className='cart-price'>
											¥{item.price}
										</span>
									</Col> */}
				{/* </Row> */}
			</Col>
		</Row>
	)
}

export default EditableCartItems
