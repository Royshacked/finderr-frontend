


export function GigOrderPreview({ order }) {
    return <article className="gig-order-preview">
        <div className="">
            <img src={order.gig.imgUrl} alt="" />
            <span>{order.gig.name}</span>
        </div>
        <div>
            <span>{order.createdAt}</span>
            <span>{order.gig.price}$</span>
            <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
    </article>
}