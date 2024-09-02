


export function GigOrderPreview({ order }) {
    return <article className="gig-order-preview">
        {/* <img src={order.gig.imgUrl} alt="" /> */}
        <span>{order.gig.name}</span>
        <span>{order.createdAt}</span>
        <span>{order.gig.price}$</span>
        <span>{order.status}</span>
    </article>
}