import { GigFilter } from './GigFilter.jsx'

import { DemoCarousel } from "../cmps/Carusela"
import { MadeOnFiver } from "./MadeOnFiver"

import Meta from '../assets/svg/homepage/meta.svg?react'
import Google from '../assets/svg/homepage/google.svg?react'
import Netflix from '../assets/svg/homepage/netflix.svg?react'
import Payoneer from '../assets/svg/homepage/payoneer.svg?react'
import Paypal from '../assets/svg/homepage/paypal.svg?react'
import Pg from '../assets/svg/homepage/pg.svg?react'
import { PopularServices } from './PopularService.jsx'

export function HomePageGuest() {
    return (
        <section >
            <div className="bunner-container">
                <div className="bunner flex">
                    {/* <div className="bunner-top"></div> */}

                    <div className="search-bunner-container flex">
                        <h1>Find the right <span>freelance</span> <br />service, right away
                        </h1>
                        <div className="stam">
                            <GigFilter />
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

            <div className="popular-services">
                <PopularServices />
            </div>
            {/* <MadeOnFiver /> */}

            <div className="hompage-video">
                <h2>A whole world of freelance <br />talent at your fingertips</h2>

                <video class="_19aaquz1j _1rfvtgw1g" controls poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png" preload="auto" crossorigin="anonymous" role="video" playsinline="" autoPlay muted loop><source role="source" src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9" type="video/mp4" /></video>
            </div>
        </section >

    )
}