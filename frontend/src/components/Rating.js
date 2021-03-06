import React from 'react'

const Rating = ({
	value,
	text,
	color,
	showArrow,
	showComment,
	setShowComment,
	directToReview,
}) => {
	const showCommentHandler = () => {
		if (showComment) {
			setShowComment(false)
		} else {
			setShowComment(true)
			directToReview()
		}
	}
	return (
		<div className='rating'>
			<span>
				<i
					style={{ color }}
					className={
						value >= 1
							? 'fas fa-star'
							: value >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 2
							? 'fas fa-star'
							: value >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 3
							? 'fas fa-star'
							: value >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 4
							? 'fas fa-star'
							: value >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 5
							? 'fas fa-star'
							: value >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span
				style={{
					'fontSize': '0.7rem',
				}}
			>
				{text && text}{' '}
				{showArrow ? (
					showComment ? (
						<span
							onClick={() => showCommentHandler()}
							style={{
								'cursor': 'pointer',
							}}
						>
							<i
								style={{
									width: '25px',
									textAlign: 'center',
									padding: '4px',
									fontSize: '0.8rem',
								}}
								className='fas fa-angle-up'
							></i>
						</span>
					) : (
						<span
							onClick={() => {
								showCommentHandler()
							}}
							style={{ 'cursor': 'pointer' }}
						>
							<i
								style={{
									width: '25px',
									textAlign: 'center',
									padding: '4px',
									fontSize: '0.8rem',
								}}
								className='fas fa-angle-down'
							></i>
						</span>
					)
				) : null}
			</span>
		</div>
	)
}
Rating.defaultProps = {
	color: '#ffdc5f',
}
// Rating.propTypes = {
// 	value: PropTypes.number.isRequired,
// 	text: PropTypes.string.isRequired,
// 	color: PropTypes.string,
// }

export default Rating
