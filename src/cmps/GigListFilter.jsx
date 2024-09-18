import { GigListSort } from "./GigListSort.jsx"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"
import { gigService } from "../services/gig/index.js"
// import { preview } from "vite"

export function GigListFilter() {
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [cmpType, setCmpType] = useState('')
    // const [isPro, setIsPro] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])


    function onHandleClick({ target }) {
        const { name } = target
        if (cmpType === name) return setCmpType('')
        setCmpType(name)
    }

    function onHandleChange({ target }) {
        const method = cmpType === 'seller' ? setSellerFilter : setGigFilter
        method(target)
    }

    function setSellerFilter(target) {
        var { name, value } = target
        value = name === 'rate' ? +value : value

        setFilterByToEdit(prevFilter => ({
            ...prevFilter, owner: {
                ...prevFilter.owner,
                [name]: target.checked ?
                    [...prevFilter.owner[name], value] : prevFilter.owner[name] = prevFilter.owner[name].filter(item => item !== value)
            }
        }))
    }

    function setGigFilter(target) {
        var { name, value } = target

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: +value }))
    }

    function onHandleSubmit(ev) {
        ev.preventDefault()
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit } })
        setCmpType('')
    }

    function onClearFilter({ target }) {
        const { name } = target
        const cleanFilter = gigService.getDefaultFilter()[name]
        console.log(cleanFilter)
        const newFilter = { ...filterByToEdit, [name]: cleanFilter }

        setFilterByToEdit({ ...newFilter })
        dispatch({ type: SET_FILTER_BY, filterBy: { ...newFilter } })
        setCmpType('')
    }

    return <>
        {cmpType && <div className="back-drop" onClick={() => setCmpType('')}></div>}
        <article className="giglist-filter">
            <div className="giglist-filter-btns">
                <button className={cmpType && 'in-front'} name="seller" onClick={onHandleClick}>
                    Seller Details
                    <svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
                </button>
                <button className={cmpType && 'in-front'} name="budget" onClick={onHandleClick}>
                    Budget
                    <svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
                </button>
                <button className={cmpType && 'in-front'} name="delivery" onClick={onHandleClick}>
                    Delivery Time
                    <svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
                </button>
            </div>

            <DynamicCmp cmpType={cmpType} onHandleChange={onHandleChange} onHandleSubmit={onHandleSubmit} filterBy={filterByToEdit} onClearFilter={onClearFilter} />

            {/* <div className="giglist-filter-pro">
                <div className="pro-btn" style={{ backgroundColor: isPro ? 'green' : 'lightgray' }} onClick={() => setIsPro(!isPro)}>
                    <div className={`pro-small-btn ${proBtnClass}`}></div>
                </div>
                Pro services
            </div> */}
        </article>
    </>
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'seller':
            return <SellerFilter {...props} />
        case 'budget':
            return <BudgetFilter {...props} />
        case 'delivery':
            return <DelivertFilter {...props} />
    }
}

function SellerFilter({ filterBy, onHandleChange, onHandleSubmit, onClearFilter }) {

    return <section className="sub-filter seller" >
        <form action="" onSubmit={onHandleSubmit} >
            <h3>Seller level</h3>
            <div className="sub-inputs">
                <label htmlFor="toplevel">
                    <input type="checkbox" id="toplevel" name="rate" value={3} onChange={onHandleChange} checked={filterBy.owner.rate.includes(3)} />
                    <span>Top Level</span>
                </label>
                <label htmlFor="level2">
                    <input type="checkbox" id="level2" name="rate" value={2} onChange={onHandleChange} checked={filterBy.owner.rate.includes(2)} />
                    Level 2
                </label>
                <label htmlFor="level1">
                    <input type="checkbox" id="level1" name="rate" value={1} onChange={onHandleChange} checked={filterBy.owner.rate.includes(1)} />
                    Level 1
                </label>
                <label htmlFor="level0">
                    <input type="checkbox" id="level0" name="rate" value={0} onChange={onHandleChange} checked={filterBy.owner.rate.includes(0)} />
                    New Seller
                </label>
            </div>
            <h3>Seller speaks</h3>
            <div className="sub-inputs">
                <label htmlFor="hebrew">
                    <input type="checkbox" id="hebrew" name="language" value="hebrew" onChange={onHandleChange} checked={filterBy.owner.language.includes('hebrew')} />
                    Hebrew
                </label>
                <label htmlFor="english">
                    <input type="checkbox" id="english" name="language" value="english" onChange={onHandleChange} checked={filterBy.owner.language.includes('english')} />
                    English
                </label>
                <label htmlFor="urdu">
                    <input type="checkbox" id="urdu" name="language" value="urdu" onChange={onHandleChange} checked={filterBy.owner.language.includes('urdu')} />
                    Urdu
                </label>
                <label htmlFor="hindi">
                    <input type="checkbox" id="hindi" name="language" value="hindi" onChange={onHandleChange} checked={filterBy.owner.language.includes('hindi')} />
                    Hindi
                </label>
            </div>

            <h3>Seller lives in</h3>
            <div className="sub-inputs">
                <label htmlFor="israel">
                    <input type="checkbox" id="israel" name="loc" value="israel" onChange={onHandleChange} checked={filterBy.owner.loc.includes('israel')} />
                    Israel
                </label>
                <label htmlFor="unitedstates">
                    <input type="checkbox" id="unitedstates" name="loc" value="united states" onChange={onHandleChange} checked={filterBy.owner.loc.includes('united states')} />
                    United States
                </label>
                <label htmlFor="unitedkingdom">
                    <input type="checkbox" id="unitedkingdom" name="loc" value="united kingdom" onChange={onHandleChange} checked={filterBy.owner.loc.includes('united kingdom')} />
                    United Kingdom
                </label>
                <label htmlFor="canada">
                    <input type="checkbox" id="canada" name="loc" value="canada" onChange={onHandleChange} checked={filterBy.owner.loc.includes('canada')} />
                    Canada
                </label>
            </div>
        </form>
        <div className="btns">
            <button className="btn-clear" name="owner" type="button" onClick={onClearFilter}>Clear all</button>
            <button className="btn-apply" onClick={onHandleSubmit}>Apply</button>
        </div>
    </section>
}

function BudgetFilter({ filterBy, onHandleChange, onHandleSubmit, onClearFilter }) {

    return <section className="budget sub-filter" >
        <form className="sub-inputs" onSubmit={onHandleSubmit}>
            <label htmlFor="budget">
                <input className="budget" type="number" id="budget" name="budget" placeholder="Enter budget" value={filterBy.budget || ''} onChange={onHandleChange} />
            </label>

        </form>
        <div className="btns">
            <button className="btn-clear" type="button" name="budget" onClick={onClearFilter}>Clear all</button>
            <button className="btn-apply" onClick={onHandleSubmit}>Apply</button>
        </div>
    </section>
}

function DelivertFilter({ filterBy, onHandleChange, onHandleSubmit, onClearFilter }) {

    return <section className="delivery sub-filter" >
        <form className="sub-inputs" onSubmit={onHandleSubmit} >
            <label className="labal-delivery" htmlFor="day1">
                <input type="radio" id="day1" name="daysToMake" value={1} onChange={onHandleChange} checked={filterBy.daysToMake === 1} />
                Express 24H
            </label>
            <label className="labal-delivery" htmlFor="day3">
                <input type="radio" id="day3" name="daysToMake" value={3} onChange={onHandleChange} checked={filterBy.daysToMake === 3} />
                Up to 3 days
            </label>
            <label className="labal-delivery" htmlFor="day7">
                <input type="radio" id="day7" name="daysToMake" value={7} onChange={onHandleChange} checked={filterBy.daysToMake === 7} />
                Up to 7 days
            </label>
            <label className="labal-delivery" htmlFor="anyday">
                <input type="radio" id="anyday" name="daysToMake" value={1000} onChange={onHandleChange} checked={filterBy.daysToMake === 1000} />
                Anytime
            </label>

        </form>
        <div className="btns">
            <button className="btn-clear" type="button" name="daysToMake" onClick={onClearFilter}>Clear all</button>
            <button className="btn-apply" onClick={onHandleSubmit}>Apply</button>
        </div>
    </section>
}