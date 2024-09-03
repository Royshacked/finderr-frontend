
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

export function UserDetailsRevies(gig) {


    //console.log(planType);
    //var priceKombo = setUserChoise(planType.planType, planType.gig.price)


    //const [userPlan, setUserPlan] = useState(null)
    //const [userPrice, setGigPrice] = useState(null)
    // Languages: 'English',
    // daysToMake: getRandomIntInclusive(1, 30),
    // LastDelivery: getRandomIntInclusive(1, 24),
    // description: makeLorem(10),
    // avgResponseTime: getRandomIntInclusive(1, 30),
    // loc: makeLorem(1),

    //const { gigId } = useParams()

    // var gigPr = gigPrice
    // var userPrices = {}
    // useEffect(() => {
    //     setUserPlan(planType.planType)
    //     console.log(userPlan);

    //     // userPrices = setUserChoise(userPlan)
    //     //setUserPlan('entry')

    //     // console.log(userPrices.revisions);

    // }, [userPlan])
    // function setUserChoise(userPlan, price) {
    //     switch (userPlan) {
    //         case 'entry':
    //             return {
    //                 revisions: 2,
    //                 days: 3,
    //                 price: price
    //             }
    //             break;
    //         case 'commun':
    //             return {
    //                 revisions: 3,
    //                 days: 4,
    //                 price: price * 1.5
    //             }
    //             break;
    //         case 'premium':
    //             return {
    //                 revisions: 4,
    //                 days: 5,
    //                 price: price * 2
    //             }
    //             break;


    //     }
    // }

    console.log(gig.gig);

    //var gigPr = 0
    //if (!planType) return <h2>loading...</h2>
    return (<>
        <div className='user-details-wide-container'>
            <ul className='user-general-details-container flex'>
                <li> <strong>from</strong>{gig.gig.loc}</li>
                <li> <strong>avg. ResponseTime</strong>{gig.gig.avgResponseTime}</li>
                <li> <strong>Language</strong>{gig.gig.Languages}</li>
                <li> <strong>daysToMake</strong>{gig.gig.daysToMake}</li>
                <li> <strong>member since</strong>{gig.gig.memberSince}</li>
                <li> </li>
            </ul>

            <article className='about-user'>
                <div>
                    {gig.gig.owner.about}
                </div>
            </article>
        </div>


    </>
    )
}