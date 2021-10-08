import React from 'react'
import { Card, Image } from 'react-bootstrap'
import x_logo from '../data/images/x_logo.png'

import useWindowSize from '../hooks/useWindowSize'

const RightPicture = ({ title, content, imageXl, imageMobile }) => {
	const size = useWindowSize()
	let screenSize = 767
	return (
		<div className={size.width > 767 ? 'page2-wrap' : 'page2-wrap-mobile'}>
			{/* {size.width > 767 ? ( */}

			<Image
				// src={imageXl}
				// alt='imageXl'
				// className='page2-image'
				src={size.width > screenSize ? imageXl : imageMobile}
				alt={
					size.width > screenSize
						? '旨い塩素材パソコン'
						: '旨い塩素材携帯'
				}
				className={
					size.width > screenSize
						? 'page2-image'
						: 'page2-image-mobile'
				}
			/>

			{/* ) : (
				<Image
					src={imageMobile}
					alt='imageMobile'
					className='page2-image-mobile'
				/>
			)} */}
			<div data-aos='zoom-in-right'>
				<Card
					className={
						size.width > 767
							? 'p-3 page2-card'
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
						<Card.Title as='h2' className='page2-card-title'>
							<Card.Img
								src={x_logo}
								alt='旨い塩小ロゴ'
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
		</div>
	)
}

export default RightPicture
