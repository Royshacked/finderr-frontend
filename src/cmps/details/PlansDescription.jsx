
import { useState, useEffect } from 'react'

import ToolTipp from '../src/assets/svg/details/tooltip-price.svg?react'
//import Share from '../assets/svg/details/share.svg?react'
import QMark from '../src/assets/svg/details/question-mark.svg?react'
import Time from '../src/assets/svg/details/time.svg?react'
import Revisions from '../src/assets/svg/details/revision.svg?react'
import V from '../src/assets/svg/details/v.svg?react'
import { Tooltip } from 'react-tooltip'
import ContinueArrow from '../src/assets/svg/details/continue-arrow.svg?react'
//import {ff} from '../src/assets/svg/details/tooltip-price.svg'
import { addOrder } from '../../store/actions/order.actions'
import { useSelector } from 'react-redux'



export function PlansDescription({ planType, gig }) {
    console.log(gig, planType);
    console.log(planType);
    const user = useSelector(state => state.userModule.user)
    var priceKombo = setUserChoise(planType, gig.price)


    const [userPlan, setUserPlan] = useState(null)
    const [userPrice, setGigPrice] = useState(null)

    function createOrder(ev) {
        ev.preventDefault()
        if (!user) return

        const order = {
            buyer: {
                id: user._id,
                fullname: user.fullname
            },
            seller: {
                id: gig.owner._id,
                fullname: gig.owner.fullname
            },
            gig: {              // mini-gig
                _id: gig._id,
                name: gig.title,
                imgUrl: gig.imgUrls[0],
                price: gig.price
            },
            createdAt: new Date(Date.now()).toDateString(),
            status: 'pending',
            price: priceKombo.price
        }
        console.log(order);

        // const savedOrder = await storageService.post(STORAGE_KEY, order)
        addOrder(order)
        // return savedOrder
    }
    // const order = {
    //     _id: makeId(),
    //     buyer: 'mini-user',
    //     seller: 'mini-user',

    //     gig: {              // mini-gig
    //         _id: 'oRulYh',
    //         name: 'I will fix wordpress, CSS, HTML, jquery, and PHP errors',
    //         imgUrl: 'https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg',
    //         price: 826,
    //     },
    //     createdAt: new Date(Date.now()).toDateString(),
    //     status: pickStatus(getRandomIntInclusive(1, 4)),
    // }






    //const { gigId } = useParams()

    // var gigPr = gigPrice
    // var userPrices = {}
    useEffect(() => {
        setUserPlan(planType.planType)
        // console.log(userPlan);

        // userPrices = setUserChoise(userPlan)
        //setUserPlan('entry')

        // console.log(userPrices.revisions);

    }, [userPlan])

    function setUserChoise(userPlan, price) {
        switch (userPlan) {
            case 'entry':
                return {
                    revisions: 2,
                    days: 3,
                    price: price
                }
                break;
            case 'commun':
                return {
                    revisions: 3,
                    days: 4,
                    price: price * 1.5
                }
                break;
            case 'premium':
                return {
                    revisions: 4,
                    days: 5,
                    price: price * 2
                }
                break;


        }
    }


    //var gigPr = 0
    if (!planType) return <h2>loading...</h2>
    return (<>
        <div className="plans-desc-co">
            <div className="plans-main">
                <header className="plans-desc-h">
                    <div className="price-with-tooltip">
                        <div className="plans-price flex">

                            {/* <b className='a11'>{planType}</b> */}
                            <div className="tooltip-price-container">
                                {`${priceKombo.price}$  `}
                                <a data-tooltip-id="my-tooltip" className='tooltiptry-co' data-tooltip-content="To keep things simple, <br /> Fiverr may round up prices that contain decimals. The number you see here is the price used at checkout">
                                    <ToolTipp />
                                    <Tooltip id="my-tooltip" className='tooltiptry' multiline={true} />
                                </a>

                            </div>
                        </div>

                        <h3 className='flex save-subscribe'>

                            <span className="XBRgVA8">  Save up to 20% with <b>Subscribe to Save</b> </span>
                            <div className='mark-q-container'>
                                <QMark />
                            </div>
                        </h3>
                        <div className='a12'>
                            <b>Starter Pack </b>- Quality guaranteed
                            1 HQ logo concept  &amp; PNG + 5 Revisions
                        </div>
                        <div className='additional-info flex'>
                            <span className='flex a16'>
                                <div className='time-span-container'><Time /> </div>
                                <b className='a14'>{priceKombo.days}-day delivery</b>
                            </span>
                            <span className='flex a16'>
                                <div className='time-span-container'><Revisions /> </div>
                                <b className='a14'>{priceKombo.revisions} revisions</b>
                            </span>
                        </div>
                        {/* <ul className='detailes-plan'>
                            <li className='flex a16'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex a16'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex a16'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex a16'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex a16'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>

                        </ul> */}
                    </div>
                </header>
                <footer className='flex footer-plan'>
                    <button className='continue-plan-b' onClick={(ev) => createOrder(ev)}>
                        continue
                        <span> <ContinueArrow /></span>
                    </button>
                    <button className='compare-button'>compare packeges</button>
                </footer>

            </div>

            {/* <footer className="app-footer full">
                <p>Coffeerights &copy; 2024</p>

                {import.meta.env.VITE_LOCAL ?
                    <span className="local-services">Local Services</span> :
                    <span className="remote-services">Remote Services</span>}
            </footer> */}
        </div>

    </>
    )
}