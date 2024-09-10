import { GigOrderPreview } from "./GigOrderPreview.jsx";



export function GigOrderList({ orders, filterBy }) {

    return <section className="gig-order-list">
        <div>
            {<h3>{filterBy.status ? filterBy.status.toUpperCase() : 'ALL ORDERS'}</h3>}
        </div>
        <ul>
            {orders.map(order =>
                <li key={order._id}>
                    <GigOrderPreview order={order} filterBy={filterBy} />
                </li>
            )}
        </ul>
    </section>
}