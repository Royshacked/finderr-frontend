const { DEV, VITE_LOCAL } = import.meta.env
import { useEffect } from 'react'

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

const status = ['pending', 'approved', 'rejected', 'all', 'complete']

function getStatus() {
    return status
}

function getDefaultOrderFilter() {
    return {
        status: '',
    }
}

function getEmptyOrder() {
    return {
        _id: 'o1225',
        buyer: '',
        seller: '',

        gig: {              // mini-gig
            _id: '',
            name: '',
            imgUrl: '',
            price: 0,
        },
        createdAt: new Date(Date.now()).toDateString(),
        status: 'pending',
    }
}


const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, getDefaultOrderFilter, getStatus, ...service }

//export const status = ['active', 'missing details', 'delivered', 'completed', 'cancelled', 'all']




// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
