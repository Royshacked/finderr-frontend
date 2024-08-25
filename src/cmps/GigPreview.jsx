
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        <img src='' alt="" />
        <span><b>Ad By</b> {gig.owner.fullname}</span>
        <span>{gig.title}</span>
        <span><b>Rate </b>{gig.owner.rate}</span>
        <span><b>From</b> {gig.price}$</span>
    </article>
}