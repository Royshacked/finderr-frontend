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

    // if (!gigs.length) return
    // <section className="gig-index-empty main-layout">
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 203 175"><circle cx="86.465" cy="135.703" r="30.297" fill="#222325"></circle><path fill="#fff" d="M61.75 148.459c7.653-7.654 18.337-35.347 21.526-45.446l16.744-.797 11.162 12.757c-1.063 2.657-2.392 8.77-6.379 20.729-2.495 7.485-13.022 22.856-18.337 29.5-2.392-.531-8.611-2.232-14.352-4.783-5.74-2.552-9.302-7.973-10.365-10.365v-1.595Z"></path><path stroke="#222325" stroke-miterlimit="10" stroke-width="1.5" d="M56.894 61.542h-5.51v7.385h5.51v-7.385Zm105.635-13.495-52.276 4.67m5.171 25.425 47.105 4.297m1.185.033c9.326 0 16.885-7.717 16.885-17.236 0-9.52-7.559-17.236-16.885-17.236-9.325 0-16.885 7.717-16.885 17.236 0 9.519 7.56 17.236 16.885 17.236Zm-34.494-3.119c-4.275 0-7.717-6.857-7.717-14.692 0-7.834 3.457-13.59 7.717-13.59M91.433 53.91l-26.64 1.195a8.425 8.425 0 0 0-5.599 2.674 8.51 8.51 0 0 0-2.272 5.797v3.46a8.526 8.526 0 0 0 2.282 5.797 8.44 8.44 0 0 0 5.604 2.673l21.855.869a5.883 5.883 0 0 0 3.95-1.82 5.942 5.942 0 0 0 1.638-4.045c.262-5.631-.232-14.319-1.25-16.568l-1.544-.978s5.448-4.018 7.995-.17c2.547 3.847 3.612 16.429 3.087 20.4"></path><path stroke="#222325" stroke-miterlimit="10" stroke-width="1.5" d="M96.064 51.43c2.81-2.654 7.887-.31 9.184 2.807 1.62 4.111 2.654 19.936 2.654 19.936m-26.886 2.2c-4.276 0-6.174-5.693-6.174-11.464 0-5.772 1.914-10.565 6.174-10.565"></path><path stroke="#222325" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M150.86 64.864s11.961-15.654 26.022.17c0-.062-12.903 16.74-26.022-.17Z"></path><path fill="#222325" d="M169.506 70.789c3.469 0 6.282-2.535 6.282-5.663 0-3.127-2.813-5.662-6.282-5.662s-6.282 2.535-6.282 5.662c0 3.128 2.813 5.663 6.282 5.663Z"></path><path stroke="#222325" stroke-miterlimit="10" stroke-width="1.5" d="M81.016 76.035c.386 3.072 5.556 4.949 5.618 9.727.062 4.778-4.423 22.389-10.532 36.389-4.791 10.978-15.15 27.106-15.15 27.106.756 3.023 4.015 7.923 9.568 11.162 9.567 5.581 16.743 3.987 16.743 3.987s9.754-10.365 16.133-24.717c6.378-14.351 8.55-26.157 10.171-38.227 1.621-12.07 3.519-23.58.71-36.892-2.809-13.31-6.714-14.598-10.881-13.14"></path><path fill="#232426" stroke="#232426" stroke-linejoin="bevel" stroke-width="1.5" d="m14.38 26.992-3.888 12.814a.143.143 0 0 0 .04.162.139.139 0 0 0 .165.009L22.89 33.54a.145.145 0 0 1 .169 0l6.566 6.363a.14.14 0 0 0 .15.037.14.14 0 0 0 .092-.127l1.277-12.195a.152.152 0 0 1 .053-.101.145.145 0 0 1 .108-.033l12.523 1.253a.145.145 0 0 0 .16-.09.151.151 0 0 0-.05-.179l-10.843-9.107a.136.136 0 0 1-.037-.179l5.906-11.389a.151.151 0 0 0-.091-.21.144.144 0 0 0-.085.001l-13.616 4.774a.138.138 0 0 1-.154 0L14.395 1.043a.146.146 0 0 0-.231.032.152.152 0 0 0-.019.088l1.717 16.207a.143.143 0 0 1-.088.15L1.1 23.381a.147.147 0 0 0-.101.141c0 .032.01.062.028.088a.147.147 0 0 0 .073.054l13.117 3.14a.151.151 0 0 1 .126.053.157.157 0 0 1 .036.134Z"></path><path stroke="#232426" stroke-linejoin="bevel" stroke-width="1.5" d="M164.618 153.861s-12.296 8.096-15.982-3.006 14.699-12.109 14.699-12.109-3.037-13.383 7.342-15.486c10.379-2.103 14.703 5.065 13.981 10.741-.524 4.12-4.978 6.739-4.978 6.739s17.127-1.995 13.591 11.864c-3.42 13.422-15.978 2.933-15.978 2.933s4.415 6.384.673 10.179c-3.742 3.794-9.562 2.976-13.635-2.047-4.073-5.024.287-9.808.287-9.808Z"></path><circle cx="132.5" cy="16.5" r="7.5" fill="#1DBF73"></circle><circle cx="15.5" cy="109.5" r="6.75" stroke="#000" stroke-width="1.5"></circle></svg>
    //     <h3>We couldn't find any services </h3>
    // </section>
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
                <GigListSort />
            </div>

            <GigList gigs={gigs} />
        </section>
    )
}