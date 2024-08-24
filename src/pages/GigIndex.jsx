import { useSelector } from "react-redux";
import { GigList } from "../cmps/GigList.jsx";
import { GigListFilter } from "../cmps/GigListFilter.jsx";
import { GigListSort } from "../cmps/GigListSort.jsx";
import { loadGigs } from "../store/actions/gig.actions.js";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function GigIndex() {
    const gigs = useSelector(state => state.gigModule.gigs)
    const filterBy = useSelector(state => state.gigModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setGigs(filterBy)
        setSearchParams(filterBy)
    }, [filterBy])

    async function setGigs() {
        try {
            await loadGigs(filterBy)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="gig-index">
            <h2>Results for <b>css</b></h2>
            <GigListFilter />

            <div>
                <span>results</span>
                <GigListSort />
            </div>

            <GigList gigs={gigs} />
        </section>
    )
}