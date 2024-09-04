const { DEV, VITE_LOCAL } = import.meta.env
import { useEffect } from 'react'

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

function getEmptyOrder() {
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


const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
