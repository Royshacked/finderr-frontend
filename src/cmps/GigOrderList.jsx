import { GigOrderPreview } from "./GigOrderPreview.jsx";


export function GigOrderList({ orders, filterBy }) {

    return <section className="gig-order-list">
        {<h3>{filterBy.status ? filterBy.status.toUpperCase() : 'ALL ORDERS'}</h3>}
        <ul>
            {orders.map(order =>
                <li key={order._id}>
                    <GigOrderPreview order={order} />
                </li>
            )}
        </ul>
    </section>
}