import React from 'react'
import { Nav, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import checkIcon from '../data/images/check green xs 2.png'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

const CheckoutSteps = ({ step1, step2, step3, step4, number }) => {
	return (
		// <div
		// 	className='checkoutStepBar d-flex justify-content-center align-items-center mb-4 mt-4'
		// 	//responsiveCss
		// >
		// 	<Col xs={4} className='checkoutStep'>
		// 		{step2 ? (
		// 			// <LinkContainer to='/shipping' className='p-0'>
		// 			<span>お届け先住所</span>
		// 		) : (
		// 			// </LinkContainer>
		// 			<span disabled className='p-0'>
		// 				お届け先住所
		// 			</span>
		// 		)}
		// 	</Col>
		// 	{/* <p className='underline__g'></p> */}
		// 	<Col xs={4} className='checkoutStep'>
		// 		{step3 ? (
		// 			<span>チェックアウト</span>
		// 		) : (
		// 			<span disabled className='p-0'>
		// 				チェックアウト
		// 			</span>
		// 		)}
		// 	</Col>
		// 	<Col xs={4} className='checkoutStep'>
		// 		{step4 ? (
		// 			<span>注文完了</span>
		// 		) : (
		// 			<span disabled className='p-0'>
		// 				注文完了
		// 			</span>
		// 		)}
		// 	</Col>
		// </div>
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
