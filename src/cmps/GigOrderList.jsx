import { useSelector } from "react-redux";
import { GigOrderPreview } from "./GigOrderPreview.jsx";



export function GigOrderList({ orders, filterBy }) {
    const user = useSelector(state => state.userModule.user)

    return <section className="gig-order-list">
        <div className="order-grid">
            {<b>{filterBy.status ? filterBy.status.toUpperCase() : 'ALL ORDERS'}</b>}
            {user?.isSeller ? <span>Bought by</span> : <span>Bought from</span>}
            <span>Created at</span>
            <span>Price</span>
            <span>Status</span>
        </div>
        <ul className="">

            {orders.map(order =>
                <li key={order._id}>
                    <GigOrderPreview order={order} filterBy={filterBy} />
                </li>
            )}
        </ul>
    </section>
}