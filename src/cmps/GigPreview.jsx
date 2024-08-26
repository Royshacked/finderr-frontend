
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        <img src='https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png' alt="" />
        <span><b>Ad By</b> {gig.owner.fullname}</span>
        <span>{gig.title}</span>
        <span><b>Rate </b>{gig.owner.rate}</span>
        <span><b>From</b> {gig.price}$</span>
    </article>
}