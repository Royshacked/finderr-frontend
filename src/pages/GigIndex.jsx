import { useSelector } from "react-redux";
import { GigList } from "../cmps/GigList.jsx";
import { GigListFilter } from "../cmps/GigListFilter.jsx";
import { GigCategoriesBar } from "../cmps/GigCategoriesBar.jsx";
import { loadGigs } from "../store/actions/gig.actions.js";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
            {filterBy.category && <div className="gig-index-category">
                <Link to='/'><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg" alt="Fiverr"></img></Link>
                <span>/</span><span>{filterBy.category.charAt(0).toUpperCase() + filterBy.category.slice(1)}</span>
            </div>}
            <div className="index-header">
                {filterBy.title && <h2>Results for <span>{filterBy.title}</span></h2>}
                {!filterBy.title && filterBy.category && <h2><b>{filterBy.category.charAt(0).toUpperCase() + filterBy.category.slice(1)}</b></h2>}
                {!filterBy.category && !filterBy.title && <h2>All results</h2>}
                <GigListFilter />
            </div>
            <div className="index-sort">
                {gigs.length ? <span>{gigs.length} results</span> : <span>No results...</span>}
                {/* <GigListSort /> */}
            </div>

            <GigList gigs={gigs} />
        </section>
    )
}