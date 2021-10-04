import React from 'react'
import Background from '../data/images/bgc_blur.png'
import { Link } from 'react-router-dom'
import ModalContainer from '../components/ModalContainer'
import EamilVerify from '../data/images/verify email.png'
import { Image, Button } from 'react-bootstrap'

const CheckEmailScreen = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${Background})`,
			}}
			className='bgi-register__g'
		>
			<ModalContainer>
				<div style={{ padding: '50px 10px' }}>
					<div className='d-flex flex-row justify-content-center'>
						<Image
							src={EamilVerify}
							alt='EamilVerify'
							fluid
							style={{ maxWidth: '60%' }}
						/>
					</div>
					<h3 className='text-center'>メールを確認してください</h3>
					<p className='text-center mt-4'>
						info@umaishio.com　からのEメールを
						<br />
						お探しください。迷惑メールに入っている可能性がございます。
					</p>
					<Link to='/login'>
						<Button className='next-gradient-btn__g mt-4'>
							<div>
								ログインへ戻る
								{/* <span style={{ marginLeft: 'auto' }}> */}
								<i className='fas fa-chevron-left fa-position-left'></i>
							</div>
						</Button>
					</Link>
				</div>
			</ModalContainer>
		</div>
	)
}

export default CheckEmailScreen
