import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
const FilteredLists = ({ orders, title }) => {
	if (orders) {
		return (
			<>
				{title === 'all' &&
					Object.keys(orders).length !== 0 &&
					orders &&
					orders.map((order) => (
						<tr key={order._id}>
							<td>{order._id.slice(-10)}</td>
							<td>
								{order.user && order.shippingAddress.fullName}
							</td>
							<td>
								{order.createdAt &&
									order.createdAt.substring(0, 10)}
							</td>
							<td>¥{order.totalPrice && order.totalPrice}</td>
							<td>
								{order.paidAt ? (
									order.paidAt.substring(0, 10)
								) : (
									<i
										className='fas fa-times'
										style={{ color: 'red' }}
									></i>
								)}
							</td>
							<td>
								{order.deliveredAt ? (
									order.deliveredAt.substring(0, 10)
								) : (
									<i
										className='fas fa-times'
										style={{ color: 'red' }}
									></i>
								)}
							</td>
							<td>
								{order.isBankTransfer ? (
									<i className='fa fa-check'></i>
								) : (
									<i
										className='fas fa-times'
										style={{ color: 'red' }}
									></i>
								)}
							</td>
							<td>
								<LinkContainer to={`/order/${order._id}`}>
									<Button variant='light' className='btn-sm'>
										詳細
									</Button>
								</LinkContainer>
							</td>
						</tr>
					))}
				{title === 'bankTransfer' &&
					Object.keys(orders).length !== 0 &&
					orders &&
					orders
						.filter((o) => o.isBankTransfer && !o.isDelivered)
						.map((order) => (
							<tr key={order._id}>
								<td>{order._id.slice(-10)}</td>
								<td>
									{order.user &&
										order.shippingAddress.fullName}
								</td>
								<td>
									{order.createdAt &&
										order.createdAt.substring(0, 10)}
								</td>
								<td>¥{order.totalPrice && order.totalPrice}</td>
								<td>
									{order.paidAt ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.deliveredAt ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.isBankTransfer ? (
										<i className='fa fa-check'></i>
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button
											variant='light'
											className='btn-sm'
										>
											詳細
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
				{title === 'paid' &&
					Object.keys(orders).length !== 0 &&
					orders &&
					orders
						.filter((o) => o.isPaid && !o.isDelivered)
						.map((order) => (
							<tr key={order._id}>
								<td>{order._id.slice(-10)}</td>
								<td>
									{order.user &&
										order.shippingAddress.fullName}
								</td>
								<td>
									{order.createdAt &&
										order.createdAt.substring(0, 10)}
								</td>
								<td>¥{order.totalPrice && order.totalPrice}</td>
								<td>
									{order.paidAt ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.deliveredAt ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.isBankTransfer ? (
										<i className='fa fa-check'></i>
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button
											variant='light'
											className='btn-sm'
										>
											詳細
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
				{title === 'done' &&
					Object.keys(orders).length !== 0 &&
					orders &&
					orders
						.filter((o) => o.isPaid && o.isDelivered)
						.map((order) => (
							<tr key={order._id}>
								<td>{order._id.slice(-10)}</td>
								<td>
									{order.user &&
										order.shippingAddress.fullName}
								</td>
								<td>
									{order.createdAt &&
										order.createdAt.substring(0, 10)}
								</td>
								<td>¥{order.totalPrice && order.totalPrice}</td>
								<td>
									{order.paidAt ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.deliveredAt ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									{order.isBankTransfer ? (
										<i className='fa fa-check'></i>
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button
											variant='light'
											className='btn-sm'
										>
											詳細
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
			</>
		)
	}
}

export default FilteredLists
