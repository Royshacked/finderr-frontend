const { DEV, VITE_LOCAL } = import.meta.env
import { useEffect } from 'react'

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

const categories = ['logo-design', 'wordpress', 'voice-over', 'artisitic', 'proffesional', 'accessible', 'programming', 'digital marketing', 'consulting']

function getCategories() {
    return categories
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


function getEmptyGig() {
    return {
        title: '',
        price: 0,
        owner: {
            _id: '',
            fullname: '',
            imgUrl: '',
            level: 'basic',
            rate: 3,
            language: '',
        },
        daysToMake: 1,
        description: '',
        avgResponseTime: 1,
        loc: '',
        imgUrls: [],
        tags: '',
        likedByUsers: [],
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, getCategories, ...service }



// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
