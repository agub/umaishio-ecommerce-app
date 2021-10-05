import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from './Rating'
import Message from './Message'
import Loader from './Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { createProductReview } from '../actions/productActions'

const CustomerReview = ({ product, userInfo, match }) => {
	const dispatch = useDispatch()
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	)
	const {
		success: successProductReview,
		error: errorProductReview,
		loading: loadingProductReview,
	} = productReviewCreate

	useEffect(() => {
		if (successProductReview) {
			// alert('review submitted')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
	}, [dispatch, match, successProductReview])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, { rating, comment, userInfo })
		)
	}
	return (
		<>
			<div className='product-page-review-wrap'>
				<Row className='product-page-review-container'>
					<Col>
						<h3 className='mt-3'>カスタマーレビュー</h3>
						<div variant='flush'>
							{product.reviews.length === 0 && (
								<Message>評価なし</Message>
							)}
							{product.reviews.map((review) => (
								<div key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p
										style={{
											'fontSize': '0.7rem',
										}}
									>
										{review.createdAt.substring(0, 10)}
									</p>
									<p>{review.comment}</p>
								</div>
							))}

							{loadingProductReview && <Loader />}
							{errorProductReview && (
								<Message variant='danger'>
									{errorProductReview}
								</Message>
							)}
							{userInfo && (
								// !hasReviewed ? (
								<>
									{/* <h2 className='mt-3'>
                レビュー
              </h2> */}
									{successProductReview && (
										<Message variant='success'>
											レビューを書き込みました。
										</Message>
									)}
									<Form onSubmit={submitHandler}>
										<Form.Group controlId='rating'>
											<Form.Label>評価</Form.Label>
											<Form.Control
												className='product-page-review-form'
												as='select'
												value={rating}
												onChange={(e) =>
													setRating(e.target.value)
												}
											>
												<option value=''>
													選択してください
												</option>
												<option value='1'>★</option>
												<option value='2'>★★</option>
												<option value='3'>★★★</option>
												<option value='4'>★★★★</option>
												<option value='5'>★★★★★</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId='comment'>
											<Form.Label>コメント</Form.Label>
											<Form.Control
												as='textarea'
												row='3'
												className='product-page-review-form'
												value={comment}
												onChange={(e) =>
													setComment(e.target.value)
												}
											></Form.Control>
										</Form.Group>

										<Button
											disabled={
												loadingProductReview ||
												comment === ''
											}
											className='product-page-button mt-3 w-100'
											type='submit'
											variant='primary'
										>
											投稿
										</Button>
									</Form>
								</>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default CustomerReview
