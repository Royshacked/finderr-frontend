import { gigService } from "../services/gig/gig.service.local"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"
import Search from '../assets/svg/homepage/search.svg?react'


export function GigFilter() {
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(ev) {
        ev.preventDefault()

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit } })
        navigate('/gig')
    }

    function onChange({ target }) {
        const { name, value } = target

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    return <section className="gig-filter">
        <form onSubmit={onSubmit}>
            <input type="text" name="title" onChange={onChange} value={filterByToEdit.title} />
            <button><Search /></button>
        </form>
    </section>
}