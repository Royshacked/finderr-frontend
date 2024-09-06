import { useSelector } from "react-redux";
import { GigList } from "../cmps/GigList.jsx";
import { GigListFilter } from "../cmps/GigListFilter.jsx";
import { GigCategoriesBar } from "../cmps/GigCategoriesBar.jsx";
import { loadGigs } from "../store/actions/gig.actions.js";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GigListSort } from "../cmps/GigListSort.jsx";

export function GigIndex() {
    const gigs = useSelector(state => state.gigModule.gigs)

    const filterBy = useSelector(state => state.gigModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        getGigs()
        setSearchParams(filterBy)
    }, [filterBy])

    async function getGigs() {
        try {
            await loadGigs(filterBy)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="gig-index main-layout">
            <GigCategoriesBar />
            <div className="index-header">
                {filterBy.title ? <h2>Results for <span>{filterBy.title}</span></h2> : <h2>All results</h2>}
                <GigListFilter />
            </div>
            <div className="index-sort">
                <span>{gigs.length} results</span>
                <GigListSort />
            </div>

            <GigList gigs={gigs} />
        </section>
    )
}