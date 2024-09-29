import { useSelector } from "react-redux";
import { GigOrderPreview } from "./GigOrderPreview.jsx";



export function GigOrderList({ orders, filterBy, isSeller, onRemoveOrder, onChangeStatus }) {
    const user = useSelector(state => state.userModule.user)

    if (!orders.length) return <h2>No orders</h2>
    return <section className="gig-order-list">
        <div className="order-grid">
            {<b>{filterBy.status ? filterBy.status.toUpperCase() : 'ALL ORDERS'}</b>}
            {isSeller ? <span>Bought by</span> : <span>Bought from</span>}
            <span>Created at</span>
            <span>Price</span>
            <span>Actions</span>
            <span>Status</span>
        </div>
        <ul className="">

            {orders.map(order =>
                <li key={order._id}>
                    <GigOrderPreview order={order} filterBy={filterBy} isSeller={isSeller} onRemoveOrder={onRemoveOrder} onChangeStatus={onChangeStatus} />
                </li>
            )}
        </ul>
    </section>
}