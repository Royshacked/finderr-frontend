
import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, getRandomIntInclusive } from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'gig'

const categories = ['logo-design', 'wordpress', 'voice-over', 'artisitic', 'proffesional', 'accessible', 'programming', 'digital marketing', 'consulting']

export const gigService = {
    query,
    getById,
    save,
    getEmptyReview,
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
        gigs = gigs.filter(gig => gig.tags === filterBy.category)
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

// _createDemoGigs(5)

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
    //console.log(review)
    return review

}


// {
//     title: "I will fix bugs errors from HTML, CSS, javascript, PHP, wordpress",
//     price: 79,
//     owner: {
//         _id: "oRulYh",
//         fullname: "Saurabh Chauhan",
//         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/f5bbb58284bda105edb16f76a7e4521d-1623660993193/3a8d9cd3-f71d-4a87-bba3-70118594f220.jpg",
//         level: "pro",
//         rate: 2,
//         language:"Hindi",
//     },
//     daysToMake: 2,
//     description: "Facing issues with your WordPress site due to Plugins, Themes or Custom CSS/JS? Need help with Page builders, or custom page design? Or that small button is not working properly on mobile devices?",
//     avgResponseTime: 4,
//     loc: "Canada",
//     imgUrls: [
//         "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/211302392/original/263b25077bcdb60c261267b515f822137c1d3b40.jpg",
//         "https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/ec112761c1122b557e288f18c234a5ce-1724391259/Screenshot%202024-08-23%20at%2011.03.41%E2%80%AFAM.png",
//         "https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/46f47dc315ad08b8e79da601b0b94082-1723896064/Screenshot%202024-08-17%20at%205.30.55%E2%80%AFPM.png"
//     ],
//     tags: "programming",
//     likedByUsers: []
// }

// {
//     // _id: makeId(),
//     title: 'I will fix wordpress, CSS, HTML, jquery, and PHP errors',
//     price: getRandomIntInclusive(10, 1000),
//     owner: {
//         _id: makeId(),
//         fullname: 'Surjeet Singh',
//         imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/a7238c19ed67f1f2ff0a342a7dc53d91-1719205673921/17a08e08-1595-4b23-b95a-f71681c22c8a.jpg',
//         level: 'basic',
//         rate: 3,
//     },
//     daysToMake: getRandomIntInclusive(1, 9),
//     description: 'Is your WordPress site acting up? Don\'t worry, I\'m here to help! With over 13 years of experience in WordPress theme and plugin development, I specialize in diagnosing and fixing any issues that may be plaguing your website. Whether it\'s a minor bug or a major glitch, I have the expertise to get your site back on track.',
//     avgResponseTime: getRandomIntInclusive(1, 9),
//     loc: 'India',
//     imgUrls: ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg',
//         'https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/ec112761c1122b557e288f18c234a5ce-1724391259/Screenshot%202024-08-23%20at%2011.03.41%E2%80%AFAM.png',
//         'https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/46f47dc315ad08b8e79da601b0b94082-1723896064/Screenshot%202024-08-17%20at%205.30.55%E2%80%AFPM.png'
//     ],
//     tags: categories[getRandomIntInclusive(0, 5)],
//     likedByUsers: [],
//     // reviews: [
//     //     {
//     //         id: 'madeId',
//     //         txt: 'Did an amazing work',
//     //         rate: 4,
//     //         by: {
//     //             _id: 'u102',
//     //             fullname: 'user2',
//     //             imgUrl: '/img/img2.jpg',
//     //         },
//     //     },
//     // ],
// }


