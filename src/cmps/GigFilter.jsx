import { gigService } from "../services/gig/index.js"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"
import Search from '../assets/svg/homepage/search.svg?react'


export function GigFilter() {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onChange({ target }) {
        const { name, value } = target

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    function onSubmit(ev) {
        if (ev) ev.preventDefault()

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit } })
        navigate('/gig')
    }

    function onClearInput() {
        setFilterByToEdit(gigService.getDefaultFilter())
        dispatch({ type: SET_FILTER_BY, filterBy: gigService.getDefaultFilter() })
    }

    return <section className="gig-filter">
        <form onSubmit={onSubmit}>
            <input type="text" name="title" onChange={onChange} value={filterByToEdit.title || ''} placeholder="What service are you looking for today?" autoFocus={false} />
            {filterByToEdit.title && <button type="button" className="input-clear" onClick={onClearInput}>x</button>}
            <button><Search /></button>
        </form>
    </section>
}