import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"
import { gigService } from "../services/gig/gig.service.local"

export function GigListFilter() {
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [cmpType, setCmpType] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])


    function onHandleClick({ target }) {
        const { name } = target
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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: cleanFilter }))
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit, [name]: cleanFilter } })
        setCmpType('')
    }

    return <article className="giglist-filter">
        {cmpType && <div className="back-drop" onClick={() => setCmpType('')}>hello</div>}

        <button className={cmpType && 'in-front'} name="seller" onClick={onHandleClick}>Seller Details</button>
        <button className={cmpType && 'in-front'} name="budget" onClick={onHandleClick}>Budget</button>
        <button className={cmpType && 'in-front'} name="delivery" onClick={onHandleClick}>Delivery Time</button>

        <DynamicCmp cmpType={cmpType} onHandleChange={onHandleChange} onHandleSubmit={onHandleSubmit} filterBy={filterByToEdit} onClearFilter={onClearFilter} />
    </article>
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
        <h3>Seller level</h3>
        <form action="" onSubmit={onHandleSubmit}>
            <div>
                <label htmlFor="toplevel">Top Level
                    <input type="checkbox" id="toplevel" name="rate" value={3} onChange={onHandleChange} checked={filterBy.owner.rate.includes(3)} />
                </label>
                <label htmlFor="level2">Level 2
                    <input type="checkbox" id="level2" name="rate" value={2} onChange={onHandleChange} checked={filterBy.owner.rate.includes(2)} />
                </label>
                <label htmlFor="level1">Level 1
                    <input type="checkbox" id="level1" name="rate" value={1} onChange={onHandleChange} checked={filterBy.owner.rate.includes(1)} />
                </label>
                <label htmlFor="level0">New Seller
                    <input type="checkbox" id="level0" name="rate" value={0} onChange={onHandleChange} checked={filterBy.owner.rate.includes(0)} />
                </label>
            </div>
            <h3>Seller speaks</h3>
            <div>
                <label htmlFor="hebrew">Hebrew
                    <input type="checkbox" id="hebrew" name="language" value="hebrew" onChange={onHandleChange} checked={filterBy.owner.language.includes('hebrew')} />
                </label>
                <label htmlFor="english">English
                    <input type="checkbox" id="english" name="language" value="english" onChange={onHandleChange} checked={filterBy.owner.language.includes('english')} />
                </label>
                <label htmlFor="urdu">Urdu
                    <input type="checkbox" id="urdu" name="language" value="urdu" onChange={onHandleChange} checked={filterBy.owner.language.includes('urdu')} />
                </label>
                <label htmlFor="hindi">Hindi
                    <input type="checkbox" id="hindi" name="language" value="hindi" onChange={onHandleChange} checked={filterBy.owner.language.includes('hindi')} />
                </label>
            </div>

            <h3>Seller lives in</h3>
            <div>
                <label htmlFor="israel">Israel
                    <input type="checkbox" id="israel" name="loc" value="israel" onChange={onHandleChange} checked={filterBy.owner.loc.includes('israel')} />
                </label>
                <label htmlFor="unitedstates">United States
                    <input type="checkbox" id="unitedstates" name="loc" value="unitedstates" onChange={onHandleChange} checked={filterBy.owner.loc.includes('unitedstates')} />
                </label>
                <label htmlFor="unitedkingdom">United Kingdom
                    <input type="checkbox" id="unitedkingdom" name="loc" value="unitedkingdom" onChange={onHandleChange} checked={filterBy.owner.loc.includes('unitedkingdom')} />
                </label>
                <label htmlFor="canada">Canada
                    <input type="checkbox" id="canada" name="loc" value="canada" onChange={onHandleChange} checked={filterBy.owner.loc.includes('canada')} />
                </label>
            </div>
            <div className="btns">
                <button className="btn-clear" name="owner" type="button" onClick={onClearFilter}>Clear all</button>
                <button className="btn-apply" >Apply</button>
            </div>
        </form>
    </section>
}

function BudgetFilter({ filterBy, onHandleChange, onHandleSubmit, onClearFilter }) {

    return <section className="budget sub-filter" >
        <form onSubmit={onHandleSubmit}>
            <label htmlFor="price">
                <input type="number" id="price" name="price" placeholder="Enter budget" value={filterBy.price || ''} onChange={onHandleChange} />
            </label>
            <div className="btns">
                <button className="btn-clear" type="button" name="price" onClick={onClearFilter}>Clear all</button>
                <button className="btn-apply" >Apply</button>
            </div>
        </form>
    </section>
}

function DelivertFilter({ filterBy, onHandleChange, onHandleSubmit, onClearFilter }) {

    return <section className="delivery sub-filter" >
        <form onSubmit={onHandleSubmit}>
            <label htmlFor="day1">Express 24H
                <input type="radio" id="day1" name="daysToMake" value={1} onChange={onHandleChange} checked={filterBy.daysToMake === 1} />
            </label>
            <label htmlFor="day3">Up to 3 days
                <input type="radio" id="day3" name="daysToMake" value={3} onChange={onHandleChange} checked={filterBy.daysToMake === 3} />
            </label>
            <label htmlFor="day7">Up to 7 days
                <input type="radio" id="day7" name="daysToMake" value={7} onChange={onHandleChange} checked={filterBy.daysToMake === 7} />
            </label>
            <label htmlFor="anyday">Anytime
                <input type="radio" id="anyday" name="daysToMake" value={1000} onChange={onHandleChange} checked={filterBy.daysToMake === 1000} />
            </label>
            <div className="btns">
                <button className="btn-clear" type="button" name="daysToMake" onClick={onClearFilter}>Clear all</button>
                <button className="btn-apply" >Apply</button>
            </div>
        </form>
    </section>
}