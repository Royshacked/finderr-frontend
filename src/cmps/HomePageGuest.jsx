import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DemoCarousel } from "../cmps/Carusela"
import { MadeOnFiver } from "./MadeOnFiver"
import Meta from '../assets/svg/homepage/meta.svg?react'
import Google from '../assets/svg/homepage/google.svg?react'
import Netflix from '../assets/svg/homepage/netflix.svg?react'
import Payoneer from '../assets/svg/homepage/payoneer.svg?react'
import Paypal from '../assets/svg/homepage/paypal.svg?react'
import Pg from '../assets/svg/homepage/pg.svg?react'
import Search from '../assets/svg/homepage/search.svg?react'







export function HomePageGuest() {
    const navigate = useNavigate()
    const [userSearchTxt, setUserSearchTxt] = useState('')


    function handleChange({ target }) {
        let { name, value } = target

        switch (target.type) {

            case 'search':
                value = value
                setUserSearchTxt(value)
                break

        }
    }
    async function onHandleSubmit(ev, values) {
        ev.preventDefault()
        try {
            navigate(`/search-gigs?query=${userSearchTxt}`)
        } catch (error) {
            console.log(error)

        }
    }
    //?query=ss navigate('/toy')
    return (
        <section >

            <div className="bunner-container">
                <div className="bunner flex">
                    {/* <div className="bunner-top"></div> */}

                    <div className="search-bunner-container flex">
                        <h1>Find the right  <em>freelance </em>  service, right away</h1>
                        <div className="stam">
                            <form onSubmit={onHandleSubmit} className="search-form-button-inside" action="">
                                <input type="search" className="long-placeholder" autocomplete="off" placeholder="Search for any service..." onChange={handleChange} value={userSearchTxt || ''} />
                                <button className="bunner-button-input" >
                                    <Search />
                                </button>

                            </form>
                        </div>

                    </div>
                    <div className="bunner-trusted-co flex">
                        <span className="trusted-co-child trusted-by"></span>
                        <span className="trusted-co-child meta"><Meta className="svg-co" />  </span>
                        <span className="trusted-co-child google"> <Google className="svg-co" /> </span>
                        <span className="trusted-co-child netflix"><Netflix className="svg-co" /></span>
                        <span className="trusted-co-child p&g"><Pg className="svg-co" /></span>
                        <span className="trusted-co-child paypal"><Paypal className="svg-co" /></span>
                        <span className="trusted-co-child pionir" ><Payoneer className="svg-co" /></span>
                    </div>

                </div>
            </div>
            <DemoCarousel />

            <MadeOnFiver />
        </section >

    )
}