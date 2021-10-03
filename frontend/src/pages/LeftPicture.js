import React from 'react'
import { Card, Image } from 'react-bootstrap'
import x_logo from '../data/images/x_logo.png'

import useWindowSize from '../hooks/useWindowSize'

const LeftPicture = ({ title, content, imageXl, imageMobile }) => {
	const size = useWindowSize()
	return (
		<div className={size.width > 767 ? 'page2-wrap' : 'page2-wrap-mobile'}>
			{size.width > 767 ? (
				<Image
					src={imageXl}
					alt='imageXl'
					className='page3-image'
					// className={
					// 	size.width > 767 ? 'page2-image' : 'page2-image-mobile'
					// }
				/>
			) : (
				<Image
					src={imageMobile}
					alt='imageMobile'
					className='page3-image-mobile'
				/>
			)}

			<Card
				className={
					size.width > 767
						? 'p-3 page3-card'
						: 'my-3 p-3 page2-card-mobile'
				}
			>
				<Card.Body
					className={
						size.width > 767
							? 'page2-card-body'
							: 'page2-card-body-mobile'
					}
				>
					<Card.Title
						as='h2'
						className={
							size.width > 767
								? 'page2-card-title'
								: 'page3-card-title-mobile'
						}
					>
						<Card.Img
							src={x_logo}
							alt='xlogo'
							variant='top'
							className='page2-card-logo'
						/>
						&nbsp;{title}
					</Card.Title>

					<Card.Text
						as='div'
						className={
							size.width > 767
								? 'page2-card-text'
								: 'page2-card-text-mobile'
						}
					>
						{content}
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default LeftPicture
