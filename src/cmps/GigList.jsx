import { GigPreview } from "./GigPreview.jsx";

export function GigList({ gigs }) {
    return <section>
        <ul className="gig-list">
            {gigs.map((gig) =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
                </li>
            )}
        </ul>
    </section>
}