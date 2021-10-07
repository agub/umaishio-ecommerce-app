import React from 'react'
import cartType from '../data/images/available_cards.png'
import { Image } from 'react-bootstrap'
const RulesScreen = () => {
	return (
		// <div className='item-responsive-wrap__g order-left-wrap'>
		<div style={{ textTransform: 'none', letterSpacing: '3px' }}>
			<h1>特定商取引法に基づく表記</h1>
			<br />
			<p>【販売業者】株式会社トビラ</p>
			<br />
			<p>【代表責任者】鈴木健司</p>
			<br />
			<p>
				【所在地】
				<br />
				<br />
				本社
				<br />
				〒250-0034
				<br />
				神奈川県小田原市板橋380-8
			</p>
			<br />
			<p>【電話番号】0465(59)0789</p>
			<br />
			<p>【電話受付時間】9:00 - 17:30</p>
			<br />
			<p>【公開メールアドレス】sales@tobira.page, info@umaishio.com</p>
			<br />
			<p>【ホームページURL】https://www.umaishio.com/</p>
			<br />
			<p>【販売価格】商品ページをご覧ください</p>
			<br />
			<p>【引き渡し時期】入金確認後、営業日2-3日以内に発送予定</p>
			<br />
			<p>
				【申込有効期限】
				ご注文後7日以内といたします。ご注文後７日間ご入金がない場合は、購入の意思がないものとし、注文を自動的にキャンセルとさせていただきます。{' '}
			</p>
			<br />
			<p>
				【お支払方法】銀行振込、クレジットカード
				<span>
					<Image src={cartType} alt='cartType' fluid width={70} />
				</span>
			</p>
			<br />
			<p>【銀行振り込み手数料】：購入者が負担していただきます。</p>
			<br />
			<p>
				【返品・交換・キャンセル等】
				『お客様の都合による商品発送後の返品・返却等はお受け致しかねます。
				なお、商品に不良があった場合良品と交換致します。
			</p>
			<br />
			<p>【返品期限】 商品出荷より３日以内に要連絡</p>
			<br />
			<p>【返品送料】 不良品、欠品の場合は弊社負担しています。</p>
			<br />
			<p>
				【送料について】
				<br />
				<br />
				■配送会社をヤマト運輸にした場合:
				<br />
				<br />
				1個〜6個まで：全国一律400円(税込)
				<br />
				<br />
				6個〜40個まで ：
				<br />
				南東北(宮城・山形・福島) <br />
				関東(茨城・栃木・群馬・埼玉・千葉・東京・神奈川・山梨) <br />
				信越(新潟・長野) <br />
				北陸(富山・石川・福井)、 <br />
				中部(岐阜・静岡・愛知・三重)
				<br />
				600円(税込)
				<br />
				<br />
				北東北(青森・岩手・秋田)
				<br />
				関西(滋賀・京都・大阪・兵庫・奈良・和歌山)
				<br />
				700円(税込)
				<br />
				<br />
				中国(鳥取・島根・岡山・広島・山口)
				<br />
				四国(徳島・香川・愛媛・高知)
				<br />
				750円(税込)
				<br />
				<br />
				北海道、九州(福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島)
				<br />
				950円(税込)
				<br />
				<br />
				沖縄
				<br />
				1050円(税込)
				<br />
				<br />
				■郵便の場合
				<br />
				<br />
				1個：140円(税込)
				<br />
				<br />
				2個：210円(税込)
				<br />
				<br />
				3～4個の場合の郵便で送るボックスがあれば390円
			</p>
			<p className='mt-3'>株式会社トビラ</p>
		</div>
	)
}

export default RulesScreen
