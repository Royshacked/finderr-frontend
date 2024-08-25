import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"

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
        const { name, value } = target

        setFilterByToEdit(prevFilter => ({
            ...prevFilter, owner: {
                ...prevFilter.owner,
                [name]: target.checked ?
                    [...prevFilter.owner[name], +value] : prevFilter.owner[name] = prevFilter.owner[name].filter(item => item !== +value)
            }
        }))
    }

    function onHandleSubmit(ev) {
        ev.preventDefault()

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit } })
        setCmpType('')
    }

    return <article className="giglist-filter">
        <button name="seller" onClick={onHandleClick}>Seller Details</button>
        <button name="budget" onClick={onHandleClick}>Budget</button>
        <button name="delivery" onClick={onHandleClick}>Delivery Time</button>

        <DynamicCmp cmpType={cmpType} onHandleChange={onHandleChange} onHandleSubmit={onHandleSubmit} filterBy={filterByToEdit} />
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

function SellerFilter({ filterBy, onHandleChange, onHandleSubmit }) {

    return <section className="seller-filter">
        <h3>Seller level</h3>
        <form action="" onSubmit={onHandleSubmit}>
            <div>
                <label htmlFor="toplevel">Top Level</label>
                <input type="checkbox" id="toplevel" name="rate" value={3} onChange={onHandleChange} checked={filterBy.owner.rate.includes(3)} />
                <label htmlFor="level2">Level 2</label>
                <input type="checkbox" id="level2" name="rate" value={2} onChange={onHandleChange} checked={filterBy.owner.rate.includes(2)} />
                <label htmlFor="level1">Level 1</label>
                <input type="checkbox" id="level1" name="rate" value={1} onChange={onHandleChange} checked={filterBy.owner.rate.includes(1)} />
                <label htmlFor="level0">New Seller</label>
                <input type="checkbox" id="level0" name="rate" value={0} onChange={onHandleChange} checked={filterBy.owner.rate.includes(0)} />
            </div>
            <h3>Seller speaks</h3>
            <div>
                <label htmlFor="hebrew">Hebrew</label>
                <input type="checkbox" id="hebrew" name="language" value="hebrew" onChange={onHandleChange} />
                <label htmlFor="english">English</label>
                <input type="checkbox" id="english" name="language" value="english" onChange={onHandleChange} />
                <label htmlFor="urdu">Urdu</label>
                <input type="checkbox" id="urdu" name="language" value="urdu" onChange={onHandleChange} />
                <label htmlFor="hindi">Hindi</label>
                <input type="checkbox" id="hindi" name="language" value="hindi" onChange={onHandleChange} />
            </div>

            <h3>Seller lives in</h3>
            <div>
                <label htmlFor="hebrew">Hebrew</label>
                <input type="checkbox" id="hebrew" name="language" value="hebrew" onChange={onHandleChange} />
                <label htmlFor="english">English</label>
                <input type="checkbox" id="english" name="language" value="english" onChange={onHandleChange} />
                <label htmlFor="urdu">Urdu</label>
                <input type="checkbox" id="urdu" name="language" value="urdu" onChange={onHandleChange} />
                <label htmlFor="hindi">Hindi</label>
                <input type="checkbox" id="hindi" name="language" value="hindi" onChange={onHandleChange} />
            </div>
            <div>
                <button type="button">Clear all</button>
                <button>Apply</button>
            </div>
        </form>
    </section>
}

function BudgetFilter() {
    return <section className="budget-filter">Budget</section>
}

function DelivertFilter() {
    return <section className="delivery-filter">Deliver</section>
}