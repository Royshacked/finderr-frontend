import { Link, useNavigate } from "react-router-dom";
import { CustomCarousel } from "./CustomCarousel.jsx";

import StarFull from '../assets/svg/details/star-full.svg?react'
import StarEmpty from '../assets/svg/details/star-empty.svg?react'


export function GigPreview({ gig }) {

    const navigate = useNavigate()

    function onHandleClick(ev) {
        ev.stopPropagation()
        console.log('to details')
        navigate(`/gig/${gig._id}`)
    }

    return <article className="gig-preview">
        <div onClick={onHandleClick}><CustomCarousel imgs={gig.imgUrls} /></div>
        <div className="gig-owner">
            <div className="gig-owner-name">
                <img src={gig.owner.imgUrl} alt="" />
                <span>Ad By <b>{gig.owner.fullname}</b></span>
            </div>
            {gig.owner.rate > 0 && gig.owner.rate < 3 && <div className="gig-owner-rate">
                <b>Level</b> {gig.owner.rate}
                <StarFull />
                {gig.owner.rate > 1 ? <StarFull /> : <StarEmpty />}
                <StarEmpty />
            </div>}

            {gig.owner.rate === 3 && <div className="gig-top-rated">
                <b>Top Rated</b>
            </div>}

            {gig.owner.rate === 0 && <div className="gig-new-seller">
                <b>New Seller</b>
            </div>}

        </div>
        {gig.owner.rate === 0 && <b>New Seller</b>}{gig.owner.rate === 4 && <b>Top Rated</b>}
        <span>{gig.title}</span>
        <span><b>From {gig.price}$</b></span>
    </article>
}