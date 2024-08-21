
export function GigPreview({ gig }) {

    return <article className="gig-preview">
        <pre>{JSON.stringify(gig, 4, null)}</pre>
    </article>
}