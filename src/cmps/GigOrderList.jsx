import { GigOrderPreview } from "./GigOrderPreview.jsx";



export function GigOrderList({ orders, filterBy }) {

    return <section className="gig-order-list">
        <div className="order-grid">
            {<b>{filterBy.status ? filterBy.status.toUpperCase() : 'ALL ORDERS'}</b>}
            <span>Bought by</span>
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