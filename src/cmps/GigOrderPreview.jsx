import { useState } from "react"
import { updateOrder } from "../store/actions/order.actions"

export function GigOrderPreview({ order, filterBy }) {
    const [orderToEdit, setOrder] = useState(order)

    async function onStatus(status) {
        try {
            await updateOrder({ ...order, status }, filterBy)
        } catch (error) {
            console.log(error)
        }
    }

    return <article className="gig-order-preview">
        <div className="">
            <img src={order.gig.imgUrl} alt="" />
            <span>{order.gig.name}</span>
        </div>
        <div>
            {order.status === 'pending' && <button onClick={() => onStatus('approved')}>Approve</button>}
            {order.status === 'pending' && <button onClick={() => onStatus('rejected')}>Reject</button>}
            {order.status === 'approved' && <button onClick={() => onStatus('completed')}>Complete</button>}
        </div>
        <div>
            <span>{order.createdAt}</span>
            <span>{order.gig.price}$</span>
            <span>{order.status}</span>
        </div>
    </article>
}




