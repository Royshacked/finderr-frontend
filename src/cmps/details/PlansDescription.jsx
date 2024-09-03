
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

export function PlansDescription(planType, gig) {


    console.log(planType);
    var priceKombo = setUserChoise(planType.planType, planType.gig.price)


    const [userPlan, setUserPlan] = useState(null)
    const [userPrice, setGigPrice] = useState(null)
    const ExampleComponent = () => {
        return (
            <div>
                <p>First Line</p>
                <p>SecondLine</p>
            </div>
        )
    }



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

                            <b>{planType.planType}</b>
                            <div className="tooltip-price-container">
                                {`₪${priceKombo.price}  `}
                                <a data-tooltip-id="my-tooltip" className='tooltiptry-co' data-tooltip-content="To keep things simple, <br /> Fiverr may round up prices that contain decimals. The number you see here is the price used at checkout">
                                    <ToolTipp />
                                    <Tooltip id="my-tooltip" className='tooltiptry' multiline={true} />
                                </a>

                            </div>
                        </div>

                        <h3 className='flex save-subscribe'>
                            Save up to 20% with
                            <span className="XBRgVA8">Subscribe to Save</span>
                            <div className='mark-q-container'>
                                <QMark />
                            </div>
                        </h3>
                        <span>
                            <b>Starter Pack -Quality guaranteed</b>
                            1 HQ logo concept + High Res JPG &amp; PNG + 5 Revisions
                        </span>
                        <div className='additional-info flex'>
                            <span className='flex'>
                                <div className='time-span-container'><Time /> </div>
                                <b>{priceKombo.days}-day delivery</b>
                            </span>
                            <span className='flex'>
                                <div className='time-span-container'><Revisions /> </div>
                                <b>{priceKombo.revisions} revisions</b>
                            </span>
                        </div>
                        <ul className='detailes-plan'>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                            <li className='flex'>
                                <span className="vsvg-container"><V /></span>
                                <span>abra abra cadabarar</span>
                            </li>
                        </ul>
                    </div>
                </header>
                <footer className='flex footer-plan'>
                    <button className='continue-plan-b'>
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