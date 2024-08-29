
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

// _createDemoGig()

async function _createDemoGig() {
    const gig = {
        title: "I will write and fix any script in html, css, javascript and jquery",
        price: 96,
        owner: {
            _id: "oRulYh",
            fullname: "Mirza Talha",
            imgUrl: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/7f77f49e93bf71d5d8bde8a00e754a84-1707770708869/b5070084-92ac-4a93-a316-cea509e700de.png",
            level: "basic",
            rate: 3
        },
        daysToMake: 3,
        description: "As a full-stack developer, I have the power to create amazing websites and web applications \nusing HTML, CSS, JavaScript, React Js, Next Js, Node Js, PHP and jQuery. Whether the \nplatform is Wordpress",
        avgResponseTime: 8,
        loc: "Pakistan",
        imgUrls: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/316714706/original/96748f43c4e422e5e0ce260c06a08e1db8081814.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/316714706/original/a9d9c6992a0c057d8a8994e2698e0ae98cf3419b.png",
            // "https://fiverr-res.cloudinary.com/t_gig_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/08a28ac99df5e3395170540ed9405d6b-1687936871/Screenshot%202023-06-28%20122059.png"
        ],
        tags: "programming",
        likedByUsers: []
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

// {
//     title: "I will fix wordpress, CSS, HTML, jquery, and PHP errors",
//     price: 826,
//     owner: {
//         _id: "oRulYh",
//         fullname: "Surjeet Singh",
//         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/a7238c19ed67f1f2ff0a342a7dc53d91-1719205673921/17a08e08-1595-4b23-b95a-f71681c22c8a.jpg",
//         level: "basic",
//         rate: 3
//     },
//     daysToMake: 8,
//     description: "Is your WordPress site acting up? Don't worry, I'm here to help! With over 13 years of experience in WordPress theme and plugin development, I specialize in diagnosing and fixing any issues that may be plaguing your website. Whether it's a minor bug or a major glitch, I have the expertise to get your site back on track.",
//     avgResponseTime: 8,
//     loc: "India",
//     imgUrls: [
//         "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg",
//         "https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/ec112761c1122b557e288f18c234a5ce-1724391259/Screenshot%202024-08-23%20at%2011.03.41%E2%80%AFAM.png",
//         "https://fiverr-res.cloudinary.com/image/upload/t_gig_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/46f47dc315ad08b8e79da601b0b94082-1723896064/Screenshot%202024-08-17%20at%205.30.55%E2%80%AFPM.png"
//     ],
//     tags: "wordpress",
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


