
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
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'



export function PlansDescription({ planType, gig, createOrder }) {
    var priceKombo = setUserChoise(planType, gig.price)

    const [userPlan, setUserPlan] = useState(null)
    const [userPrice, setGigPrice] = useState(null)

    useEffect(() => {
        setUserPlan(planType.planType)
    }, [userPlan])

    // async function createOrder(ev) {
    //     ev.preventDefault()
    //     if (!user) return showErrorMsg('Please signup')

    //     const order = {
    //         buyer: {
    //             id: user._id,
    //             fullname: user.fullname
    //         },
    //         seller: {
    //             id: gig.owner._id,
    //             fullname: gig.owner.fullname
    //         },
    //         gig: {              // mini-gig
    //             _id: gig._id,
    //             name: gig.title,
    //             imgUrl: gig.imgUrls[0],
    //             price: gig.price
    //         },
    //         createdAt: new Date(Date.now()).toDateString(),
    //         status: 'pending',
    //         price: priceKombo.price
    //     }

    //     try {
    //         await addOrder(order)
    //         showSuccessMsg('Your order accepted')
    //     } catch (error) {
    //         showErrorMsg('Could\'nt complete purchase')
    //         console.log(error)
    //     }
    // }

    function setUserChoise(userPlan, price) {
        switch (userPlan) {
            case 'entry':
                return {
                    revisions: 2,
                    days: 3,
                    price: price
                }

            case 'commun':
                return {
                    revisions: 3,
                    days: 4,
                    price: price * 1.5
                }

            case 'premium':
                return {
                    revisions: 4,
                    days: 5,
                    price: price * 2
                }
        }
    }

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
                        Purchse gig
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