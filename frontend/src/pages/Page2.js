import React from 'react'
import { Card, Image } from 'react-bootstrap'
import x_logo from '../data/images/x_logo.png'
import salt from '../data/images/salt+object.png'
import useWindowSize from '../hooks/useWindowSize'

const Page2 = () => {
	const size = useWindowSize()
	return (
		<div className={size.width > 767 ? 'page2-wrap' : 'page2-wrap-mobile'}>
			<Image
				src={salt}
				alt='salt'
				className={
					size.width > 767 ? 'page2-image' : 'page2-image-mobile'
				}
			/>
			<Card
				className={
					size.width > 767
						? 'my-3 p-3 page2-card'
						: 'my-3 p-3 page2-card-mobile'
				}
			>
				<Card.Body className='page2-card-body'>
					<Card.Title as='h2' className='page2-card-title'>
						<Card.Img
							src={x_logo}
							alt='xlogo'
							variant='top'
							className='page2-card-logo'
						/>
						&nbsp;塩
					</Card.Title>

					<Card.Text as='div' className='page2-card-text'>
						『旨い塩』シリ－ズの要になる塩は、黒潮が通る伊豆大島近海の海水を、自然エネルギーを使い、日本伝統の塩田製塩法で作り上げた塩を基に作られています。
						その塩を伊勢神宮に伝わる日本古来の塩壺焼成法により600℃の高温で焼き上げ、ニガリ成分を分解し、栄養成分であるマグネシウム量はそのままの「焼塩」にした手間のかかった塩を使っています。焼塩にすることで塩味のバランスも良く、角が取れた甘みのある、マイルドであっさりとしたな味わいになり、その上さらさらの質感なので料理の味の邪魔をせず、素材の味を引き立たせます。
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Page2
