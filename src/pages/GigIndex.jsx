import { GigList } from "../cmps/GigList.jsx";
import { GigListFilter } from "../cmps/GigListFilter.jsx";
import { GigListSort } from "../cmps/GigListSort.jsx";

export function GigIndex() {

    return (
        <section className="gig-index">
            <h2>Results for <b>css</b></h2>
            <GigListFilter />

            <div>
                <span>results</span>
                <GigListSort />
            </div>

            <GigList />
        </section>
    )
}