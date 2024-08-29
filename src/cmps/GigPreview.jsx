
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        {/* <img src={gig.imgUrls} alt="" /> */}
        <img src="../assets/images/homepage/preview/4.png" />
        <span><b>Ad By</b> {gig.owner.fullname}</span>
        <span>{gig.title}</span>
        <span><b>Rate </b>{gig.owner.rate}</span>
        <span><b>From</b> {gig.price}$</span>
    </article>
}