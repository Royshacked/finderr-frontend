
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        <pre>{JSON.stringify(gig, null, 2)}</pre>
    </article>
}