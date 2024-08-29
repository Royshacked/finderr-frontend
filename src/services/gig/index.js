const { DEV, VITE_LOCAL } = import.meta.env
import { useEffect } from 'react'

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

function getEmptyGig() {
    return {
        title: makeLorem(1),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        title: '',
        category: '',
        owner: {
            level: 'basic',
            rate: 0,
            labguage: '',
            loc: '',
        },
        budget: Infinity,
        daysToMake: Infinity,
        sortBy: '',
        sortDir: -1,
    }
}
// addListnerr()
// useEffect(() => {



// }, [])
// function addListnerr() {
//     window.addEventListener('scroll', onScroll);
//     const onScroll = (this) => console.info("scrolling", this);
// }
// window.scroll(function () {
//     if ((this).scrollTop() > 50) {
//         console.log('hhh');
//         // $('#dynamic').addClass('newClass');
//     }
//     // else { $('#dynamic').removeClass('newClass');}
// });
=======
>>>>>>> main


const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
