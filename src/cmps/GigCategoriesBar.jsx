import { gigService } from "../services/gig/index.js"

import { useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import { SET_FILTER_BY } from "../store/reducers/gig.reducer"

import Slider from "react-slick";

export function GigCategoriesBar() {
    const filterBy = useSelector(state => state.gigModule.filterBy)
    const categories = gigService.getCategories()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onHandleCategory(category) {
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, category } })
        navigate('/gig')
    }


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <svg className="categories-arrow" width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path></svg>,
        nextArrow: <svg className="categories-arrow" width="8" height="15" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z"></path></svg>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return <section className="categories-bar main-layout full">

        < ul className="main-layout" >
            <Slider {...settings}>
                {categories.map(category =>
                    <li key={category} onClick={() => onHandleCategory(category)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>)}
            </Slider>
        </ul >
    </section >
}