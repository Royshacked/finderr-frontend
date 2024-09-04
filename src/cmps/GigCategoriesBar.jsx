import { gigService } from "../services/gig/gig.service.local.js"

import { useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"

export function GigCategoriesBar() {
    const filterBy = useSelector(state => state.gigModule.filterBy)
    const categories = gigService.getCategories()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onHandleCategory(category) {
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, category } })
        navigate('/gig')
    }

    return <section className="categories-bar main-layout full">

        <ul className="main-layout">
            {categories.map(category =>
                <li key={category} onClick={() => onHandleCategory(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>)}
        </ul>
    </section>
}