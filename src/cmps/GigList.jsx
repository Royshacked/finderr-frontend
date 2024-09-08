import { GigPreview } from "./GigPreview.jsx";
import { Link } from "react-router-dom";


export function GigList({ gigs }) {

    // function shouldShowActionBtns(gig) {
    //     const user = userService.getLoggedinUser()

    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return gig.owner?._id === user._id
    // }
    if (!gigs.length) return <h2>loading...</h2>

    return <section>


        <ul className="gig-list">
            {gigs.map((gig) =>

                <li key={gig._id}>
                    {/* <Link to={`/gig/${gig._id}`}>Edit</Link> */}
                    <GigPreview gig={gig} />
                </li>
            )}
        </ul>
    </section>
}