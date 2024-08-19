import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return <article className="preview">
        <header>
            <Link to={`/gig/${gig._id}`}></Link>
        </header>
    </article>
}