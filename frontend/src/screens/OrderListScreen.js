import React, { useEffect, useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import FilteredLists from '../components/FilteredLists'

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const [select, setSelect] = useState('all')
	console.log(select)

	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

	return (
		<>
			<h1>注文一覧</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Form.Check
						type='radio'
						label='全て'
						name='filter'
						id='filter1'
						defaultChecked
						inline
						onChange={(e) => setSelect('all')}
					/>
					<Form.Check
						type='radio'
						label='銀行振り込み注文'
						name='filter'
						id='filter2'
						inline
						onChange={(e) => setSelect('bankTransfer')}
					/>
					<Form.Check
						type='radio'
						label='カード払い済み'
						name='filter'
						id='filter3'
						inline
						onChange={(e) => setSelect('paid')}
					/>
					<Form.Check
						type='radio'
						label='配送完了'
						name='filter'
						id='filter4'
						inline
						onChange={(e) => setSelect('done')}
					/>
					<Table
						striped
						bordered
						hover
						responsive
						className='table-sm'
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>発送宛て</th>
								<th>注文日</th>
								<th>合計</th>
								<th>支払い済み</th>
								<th>配送</th>
								<th>銀行振り込み</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<FilteredLists orders={orders} title={select} />
						</tbody>
					</Table>
				</>
			)}
		</>
	)
}

export default OrderListScreen
