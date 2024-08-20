
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        <span>{gig.owner.fullname}</span>
        <span>{gig.description}</span>
        <span>{gig.owner.rate}</span>
        <span><b>From</b> {gig.price}</span>
    </article>
}