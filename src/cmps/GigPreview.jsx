import { Link } from "react-router-dom";
import { CustomCarousel } from "./CustomCarousel.jsx";
import { Link } from "react-router-dom";

export function GigPreview({ gig }) {

    // const navigate = useNavigate()
    // function onMoveToDetails() {
    //     <Link to={`/gig/${gig._id}`}>Edit</Link>
    // }

    return <article className="gig-preview">
        <Link to={`/api/gig/${gig._id}`}><Link to={`/gig/${gig._id}`}><CustomCarousel imgs={gig.imgUrls} /></Link></Link>
        <div className="gig-owner">
            <div className="gig-owner-name">
                <img src={gig.owner.imgUrl} alt="" />
                <span>Ad By <b>{gig.owner.fullname}</b></span>
            </div>
            <div className="gig-owner-rate">
                <b>Level</b> {gig.owner.rate}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
            </div>
        </div>

        <span>{gig.title}</span>
        <span><b>From {gig.price}$</b></span>
    </article>
}