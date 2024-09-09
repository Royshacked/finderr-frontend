
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
    getEmptyReview,
    remove,
    addGigMsg,
    getDefaultFilter,
    //getEmptyGig,
    getCategories,
}
window.cs = gigService


async function query(filterBy = {}) {
    var gigs = await storageService.query(STORAGE_KEY)
    const regEx = RegExp(filterBy.title, 'i')


    if (filterBy.title) {
        console.log(gigs);
        gigs = gigs.filter(gig => regEx.test(gig.title))
    }

    if (filterBy.category) {
        console.log(gigs);
        gigs = gigs.filter(gig => gig.tags === filterBy.category)
    }

    if (filterBy.price) {
        console.log(gigs);
        gigs = gigs.filter(gig => gig.price >= filterBy.price)
    }

    if (filterBy.daysToMake) {
        console.log(gigs);
        gigs = gigs.filter(gig => gig.daysToMake <= filterBy.daysToMake)
    }

    if (filterBy.owner.rate.length) {
        console.log(gigs);
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
function getEmptyReview() {
    var review = {
        id: makeId(),
        title: '',
        txt: '',
        rate: '',
        price: '',
        duration: getRandomIntInclusive(1, 4),
        date: '',
        by: {
            _id: 'u102',
            fullname: 'user2',
            country: 'usa',
            img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'

        },


    }
    //console.log(review)
    return review
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        const gigToSave = {
            _id: gig._id,
            title: gig.title,
            price: gig.price,
            owner: gig.owner,
            Languages: gig.language,
            daysToMake: gig.daysToMake,
            LastDelivery: gig.LastDelivery,
            description: gig.description,
            avgResponseTime: gig.avgResponseTime,
            memberSince: gig.memberSince,
            loc: gig.loc,
            imgUrls: gig.imgUrls,
            tags: gig.tags,
            likedByUsers: [],
            reviews: gig.reviews,


        }
        console.log(gigToSave);


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
//create demo data

//_createDemoGigs(5)

async function _createDemoGig() {
    const gig = {
        _id: makeId(),
        title: makeLorem(5),
        price: getRandomIntInclusive(10, 1000),
        owner: {
            _id: makeId(),
            fullname: makeLorem(1),
            imgUrl: '',
            level: getRandomIntInclusive(1, 3),//'basic'
            rate: getRandomIntInclusive(1, 5),
            about: makeLorem(60)
        },
        //         From
        // Pakistan
        // Member since
        // Jun 2018
        // Avg. response time
        // 1 hour
        // Last delivery
        // about 24 minutes
        // Languages

        // English
        Languages: 'English',
        daysToMake: getRandomIntInclusive(1, 30),
        LastDelivery: getRandomIntInclusive(1, 24),
        description: makeLorem(50),
        avgResponseTime: getRandomIntInclusive(1, 30),
        memberSince: makeLorem(5),
        loc: makeLorem(1),
        imgUrls: [
            'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png',
            'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png',
            'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'
        ],
        tags: categories[getRandomIntInclusive(0, 5)],
        likedByUsers: [],
        reviews: createReviews(5)
        // reviews: [
        //     {
        //         id: 'madeId',
        //         txt: 'Did an amazing work',
        //         rate: 4,
        //         by: {
        //             _id: 'u102',
        //             fullname: 'user2',
        //             : '/img/img2.jpg',
        //         },
        //     },
        // ],
    }

    const savedGig = await storageService.post(STORAGE_KEY, gig)

    return savedGig
}
function createReviews(num) {
    var reviews = []
    for (var i = 0; i < num; i++) {
        var review = _createDemoReview()
        reviews.push(review)
    }
    return reviews
}

function _createDemoReview() {
    var review = {
        id: makeId(),
        title: 'Did an amazing work',
        txt: makeLorem(50),
        rate: getRandomIntInclusive(0, 5),
        price: getRandomIntInclusive(100, 1000),
        duration: getRandomIntInclusive(1, 4),
        date: 'lo mizman',
        by: {
            _id: 'u102',
            fullname: 'user2',
            country: 'usa',
            img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'

        },


    }
    return review

}

async function _createDemoGigs(num) {
    for (var i = 0; i < num; i++) {
        await _createDemoGig()
    }
}

