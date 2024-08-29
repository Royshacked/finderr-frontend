
import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, getRandomIntInclusive } from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

const gImgCount = 1

const categories = ['logo-design', 'wordpress', 'voice-over', 'artisitic', 'proffesional', 'accessible', 'programming', 'digital marketing', 'consulting']

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    getDefaultFilter,
    getCategories,
}
window.cs = gigService


async function query(filterBy = {}) {
    var gigs = await storageService.query(STORAGE_KEY)
    const regEx = RegExp(filterBy.title, 'i')

    if (filterBy.title) {
        gigs = gigs.filter(gig => regEx.test(gig.title))
    }

    if (filterBy.category) {
        gigs = gigs.filter(gig => gig.tags >= filterBy.category)
    }

    if (filterBy.price) {
        gigs = gigs.filter(gig => gig.price >= filterBy.price)
    }

    if (filterBy.daysToMake) {
        gigs = gigs.filter(gig => gig.daysToMake <= filterBy.daysToMake)
    }

    if (filterBy.owner.rate.length) {
        gigs = gigs.filter(gig => filterBy.owner.rate.includes(gig.owner.rate))
    }

    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        const gigToSave = {
            _id: gig._id,
            price: gig.price,
            daysToMake: gig.daysToMake,
        }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)
    } else {
        const gigToSave = {
            title: gig.title,
            price: gig.price,
            daysToMake: gig.daysToMake,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msg: []
        }
        savedGig = await storageService.post(STORAGE_KEY, gigToSave)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

function getDefaultFilter() {
    return {
        title: '',
        category: '',
        owner: {
            level: 'basic',
            rate: [],
            language: [],
            loc: [],
        },
        budget: 0,
        daysToMake: 0,
        sortBy: '',
        sortDir: -1,
    }
}

function getCategories() {
    return categories
}
// create demo data

// _createDemoGigs(5)

async function _createDemoGig() {
    const gig = {
        // _id: makeId(),
        title: makeLorem(2),
        price: getRandomIntInclusive(10, 1000),
        owner: {
            _id: makeId(),
            fullname: makeLorem(1),
            imgUrl: '',
            level: 'basic',
            rate: getRandomIntInclusive(1, 5),
        },
        daysToMake: getRandomIntInclusive(1, 30),
        description: makeLorem(10),
        avgResponseTime: getRandomIntInclusive(1, 30),
        loc: makeLorem(1),
        imgUrls: `././assets/images/preview/1.png`,
        tags: categories[getRandomIntInclusive(0, 5)],
        likedByUsers: [],
        // reviews: [
        //     {
        //         id: 'madeId',
        //         txt: 'Did an amazing work',
        //         rate: 4,
        //         by: {
        //             _id: 'u102',
        //             fullname: 'user2',
        //             imgUrl: '/img/img2.jpg',
        //         },
        //     },
        // ],
    }

    const savedGig = await storageService.post(STORAGE_KEY, gig)

    return savedGig
}

async function _createDemoGigs(num) {
    console.log('hi')
    for (var i = 0; i < num; i++) {
        await _createDemoGig()
    }
}


