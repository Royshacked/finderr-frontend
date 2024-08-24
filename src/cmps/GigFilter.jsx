import { useState } from "react"
import { gigService } from "../services/gig/gig.service.local"
import { useDispatch } from "react-redux"
import { SET_FILTER_BY } from "../store/reducers/gig.reducer"
import { useNavigate } from "react-router"

export function GigFilter() {
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
            <button>🔎</button>
        </form>
    </section>
}