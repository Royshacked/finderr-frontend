


export function GigOrderPreview({ order }) {
    return <article className="gig-order-preview">
        <div className="">
            <img src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/241886721/original/5eb50249fc92fb86a041044def0812650db3dfdf.jpg" alt="" />
            {/* <img src={order.gig.imgUrl} alt="" /> */}
            <span>{order.gig.name}</span>
        </div>
        <div>
            <span>{order.createdAt}</span>
            <span>{order.gig.price}$</span>
            <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
    </article>
}