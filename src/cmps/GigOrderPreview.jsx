import { updateOrder } from "../store/actions/order.actions"
import { useSelector } from "react-redux"

export function GigOrderPreview({ order, filterBy, isSeller, onRemoveOrder }) {
    const user = useSelector(state => state.userModule.user)
    const fromUser = user?.isSeller ? order.buyer : order.seller
    async function onStatus(status) {
        try {
            await updateOrder({ ...order, status }, filterBy)
        } catch (error) {
            console.log(error)
        }
    }

    function presentDate() {
        const dateFormat = new Date(order.createdAt).toDateString()

        const orderedAt = (dateFormat === new Date(Date.now()).toDateString()) ? new Date(order.createdAt).toLocaleTimeString() : dateFormat

        return orderedAt
    }

    function shortGigName(num) {
        let gigNameArr = order.gig.name.split('')
        gigNameArr = gigNameArr.filter((item, idx) => idx < num)

        return gigNameArr.join('') + '...'
    }

    function capitalizeFirstLetter(txt) {
        const word = txt.charAt(0).toUpperCase() + txt.slice(1)

        return word
    }

    return <article className="gig-order-preview">
        <div className="order-title">
            <img src={order.gig.imgUrl} alt="" />
            <span>{shortGigName(30)}</span>
        </div>

        <div className="order-buyer">
            {isSeller ? <b>Bought from:</b> : <b>Sold by:</b>}
            <img src={fromUser.imgUrl} alt="" />
            <i>{capitalizeFirstLetter(fromUser.fullname)}</i></div>

        <b>Created at:</b><span> {presentDate()}</span>
        <span className="order-price">{order.gig.price}$</span>

        <div className="order-btns">
            {isSeller && <div className="order-btns-buyer">
                {order.status === 'pending' && <button onClick={() => onStatus('approved')} className="btn-approve">Approve</button>}
                {order.status === 'pending' && <button onClick={() => onStatus('rejected')} className="btn-reject">Reject</button>}
                {order.status === 'approved' && <button onClick={() => onStatus('completed')} className="btn-deliver">Deliver</button>}
                {(order.status === 'rejected' || order.status === 'completed') && <button className="no-actions">No actions</button>}
            </div>}

            {!isSeller && <div className="order-btns-buyer">
                {order.status === 'pending' && <button onClick={() => onRemoveOrder(order._id)} className="btn-cancel">Cancel</button>}
                {order.status !== 'pending' && <button className="no-actions">No actions</button>}
            </div>}
        </div>
        <span className={`status ${order.status}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
    </article>
}




