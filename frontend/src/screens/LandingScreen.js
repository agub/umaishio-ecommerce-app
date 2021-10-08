import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

import ContactScreen from './ContactScreen'
import Page1 from '../pages/Page1'
import RightPicture from '../pages/RightPicture'
import LeftPicture from '../pages/LeftPicture'
import AboutPage from '../pages/AboutPage'
import useWindowSize from '../hooks/useWindowSize'

import saltXl from '../data/images/salt+obj-xl.png'
import saltMobile from '../data/images/salt+obj-mobile.png'
import sakeXl from '../data/images/sake+obj-xl.png'
import sakeMobile from '../data/images/sake+obj-mobile.png'
import misoXl from '../data/images/miso+obj-xl.png'
import misoMobile from '../data/images/miso+obj-mobile.png'
import konbuXl from '../data/images/konbu+obj-xl.png'
import konbuMobile from '../data/images/konbu-obj-mobile.png'

const LandingScreen = () => {
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
	}

	const size = useWindowSize()

	let mdScreen
	if (size.width < 992) {
		mdScreen = null
	} else {
		mdScreen = { display: 'none' }
	}

	return (
		<div style={{ backgroundColor: '#f5f5f5' }}>
			<Page1 />
			<Container>
				<AboutPage />

				<RightPicture
					imageXl={saltXl}
					imageMobile={saltMobile}
					title='塩'
					content='『旨い塩』シリ－ズの要になる塩は、黒潮が通る伊豆大島近海の海水を、自然エネルギーを使い、日本伝統の塩田製塩法で作り上げた塩を基に作られています。
						その塩を伊勢神宮に伝わる日本古来の塩壺焼成法により600℃の高温で焼き上げ、ニガリ成分を分解し、栄養成分であるマグネシウム量はそのままの「焼塩」にした手間のかかった塩を使っています。焼塩にすることで塩味のバランスも良く、角が取れた甘みのある、マイルドであっさりとしたな味わいになり、その上さらさらの質感なので料理の味の邪魔をせず、素材の味を引き立たせます。'
				/>
				<LeftPicture
					imageXl={sakeXl}
					imageMobile={sakeMobile}
					title='酒粕'
					content='私達が選び抜いた酒粕は、山形県産の酒造好適米の最良の米からできた米麹に酵母と乳酸菌を発酵させて生まれたものです。トリプルパワーをギュッと濃縮した酒粕を低温でじっくりと乾燥させることで栄養素や風味を損なうことがなく、芳醇な香りと風味があり「旨い塩」の旨味に幅を持たせています。また栄養価が高いだけでなく、美容と健康にうれしい報告が数多くされています。普段の食生活に取り入れる事で、美味しいだけではない＋αな事に期待ができます。'
				/>
				<RightPicture
					imageXl={misoXl}
					imageMobile={misoMobile}
					title='味噌'
					content='1300年もの長い間、日本人の食生活を支えてきた伝統的な発酵食品である味噌。味噌は医者いらずと言われる程、たくさんの栄養が入っており、主原料の大豆には良質なたんぱく質やリノール酸、イソフラボンなどが含まれ、様々な健康効果が期待される食品です。酒粕と同様に乳酸菌や酵母も含まれるため、旨味に深みを持たせています。「旨い塩」シリーズの第一弾では、味噌を足すことで「旨味と栄養」を際立たせ、手軽に美味しく栄養を摂取する事ができます。'
				/>
				<LeftPicture
					imageXl={konbuXl}
					imageMobile={konbuMobile}
					title='昆布'
					content='旨い塩で使用している昆布パウダーは北海道産の日高昆布を粉末状にし、他の食材の邪魔をしないで旨味を引き出しています。
					昆布は酸性に傾きがちな現代の食生活の中で、アルカリ性食品の中で群を抜いているので、健康体への基本になります。
					海藻特有の水溶性食物繊維の『フコダイン』『アルギン酸』は糖質や脂肪の吸収を押さえ、コレステロール値の上昇を押さえてくれると言われており、また『フコダイン』の腸から免疫力を高める作用も注目されています。旨い塩の大事な旨味と共に、栄養も目を見張るものがあります。'
				/>
				<ContactScreen />
				<LinkContainer
					exact
					to={getCartCount() === 0 ? '/shop' : '/cart'}
					className='cartTo'
					style={mdScreen}
				>
					<button className='home-cartButton'>
						<i
							style={{ marginRight: '4px', marginTop: '5px' }}
							className='fas fa-shopping-cart'
						></i>{' '}
						<span
							style={{ marginLeft: '6px', marginTop: '3px' }}
							className='header-cartnumber'
						>
							{getCartCount()}
						</span>
					</button>
				</LinkContainer>
			</Container>
		</div>
	)
}

export default LandingScreen
