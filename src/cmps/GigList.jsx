import { GigPreview } from "./GigPreview.jsx";
import { Link } from "react-router-dom";


export function GigList({ gigs }) {

    return <ul className="gig-list">
        {gigs.map((gig) =>

            <li key={gig._id}>
                {/* <Link to={`/gig/${gig._id}`}>Edit</Link> */}
                <GigPreview gig={gig} />
            </li>
        )}
    </ul>
}