import React from 'react'
import { Image } from 'react-bootstrap'

import checkIcon from '../data/images/check green xs 2.png'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

const CheckoutSteps = ({ number }) => {
	return (
		<div className='checkoutStep d-flex justify-content-center align-items-center'>
			<ProgressBar
				percent={number}
				filledBackground='#36B631'
				width={'80%'}
				height={1}
			>
				<Step transition='scale'>
					{({ accomplished }) => (
						<div className='progressbar-icon'>
							<span className='progressbar-text'>住所</span>
							<Image
								src={checkIcon}
								alt='checkIcon'
								fluid
								style={{
									margin: '0 auto',
									filter: `grayscale(${
										accomplished ? 0 : 80
									}%)`,
								}}
								width='60'
							/>
						</div>
					)}
				</Step>
				<Step transition='scale'>
					{({ accomplished }) => (
						<div className='progressbar-icon'>
							<span className='progressbar-text'>
								チェックアウト
							</span>
							<Image
								style={{
									margin: '0 auto',
									filter: `grayscale(${
										accomplished ? 0 : 80
									}%)`,
								}}
								width='60'
								src={checkIcon}
								alt='checkIcon'
								fluid
							/>
						</div>
					)}
				</Step>
				<Step transition='scale'>
					{({ accomplished }) => (
						<div className='progressbar-icon'>
							<span className='progressbar-text'>完了</span>
							<Image
								style={{
									margin: '0 auto',
									filter: `grayscale(${
										accomplished ? 0 : 80
									}%)`,
								}}
								width='60'
								src={checkIcon}
							/>
						</div>
					)}
				</Step>
			</ProgressBar>
		</div>
	)
}

export default CheckoutSteps
