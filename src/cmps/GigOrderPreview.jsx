import { useState } from "react"
import { updateOrder } from "../store/actions/order.actions"

export function GigOrderPreview({ order, filterBy }) {
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
            {order.status === 'pending' && <button onClick={() => onStatus('approved')} style={{ color: 'blue' }}>Approve</button>}
            {order.status === 'pending' && <button onClick={() => onStatus('rejected')} style={{ color: 'red' }}>Reject</button>}
            {order.status === 'approved' && <button onClick={() => onStatus('completed')} style={{ color: 'green' }}>Complete job</button>}
        </div>
        {/* <div> */}
        <span>{order.createdAt}</span>
        <span>{order.gig.price}$</span>
        <span className={`status ${order.status}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        {/* </div> */}
    </article>
}




