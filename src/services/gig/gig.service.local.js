
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

_createDemoGig()

async function _createDemoGig() {
    const gig = {
        // _id: makeId(),
        title: 'I will fix wordpress, CSS, HTML, jquery, and PHP errors',
        price: getRandomIntInclusive(10, 1000),
        owner: {
            _id: makeId(),
            fullname: 'Saurabh Chauhan',
            imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/f5bbb58284bda105edb16f76a7e4521d-1623660993193/3a8d9cd3-f71d-4a87-bba3-70118594f220.jpg',
            level: 'basic',
            rate: 2,
        },
        daysToMake: getRandomIntInclusive(1, 9),
        description: 'Facing issues with your WordPress site due to Plugins, Themes or Custom CSS/JS? Need help with Page builders, or custom page design? Or that small button is not working properly on mobile devices We can help you with any weird issues/errors/bugs from WordPress or custom PHP.',
        avgResponseTime: getRandomIntInclusive(1, 9),
        loc: 'India',
        imgUrls: ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/211302392/original/263b25077bcdb60c261267b515f822137c1d3b40.jpg'],
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

// async function _createDemoGigs(num) {
//     console.log('hi')
//     for (var i = 0; i < num; i++) {
//         await _createDemoGig()
//     }
// }


