
import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem, getRandomIntInclusive } from '../util.service.js'
import { userService } from '../user/index.js'

const STORAGE_KEY = 'order'

// const status = ['pending', 'aprove', 'rejected', 'completed', 'all']

const status = ['pending', 'approved', 'rejected', 'all']

export const orderService = {
    query,
    getById,
    save,
    remove,
    getDefaultOrderFilter,
    getEmptyOrder,
    getStatus
}
window.cs = orderService


async function query(filterBy = {}) {
    var orders = await storageService.query(STORAGE_KEY)

    if (filterBy.status) {
        orders = orders.filter(order => order.status === filterBy.status)
    }

    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    console.log(order);

    var savedOrder
    if (order._id) {


        const orderToSave = {
            _id: order._id,
            price: order.price,
            daysToMake: order.daysToMake,
            status: order.status
        }
        savedOrder = await storageService.put(STORAGE_KEY, orderToSave)
    } else {
        console.log('jj');
        const orderToSave =
        {
            buyer: order.buyer,
            createdAt: order.createdAt,
            gig: order.gig,
            price: order.price,
            seller: order.seller,
            status: order.status,



        }
        savedOrder = await storageService.post(STORAGE_KEY, orderToSave)
    }
    return savedOrder
}

// async function addOrderMsg(orderId, txt) {
//     // Later, this is all done by the backend
//     const order = await getById(orderId)

//     const msg = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     order.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, order)

//     return msg
// }

function getDefaultOrderFilter() {
    return {
        status: '',
        sortBy: '',
        sortDir: -1,
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

function getStatus() {
    return status
}

// create demo data

//_createDemoOrder()

// async function _createDemoOrder() {
//     const order = {
//         _id: makeId(),
//         buyer: 'mini-user',
//         seller: 'mini-user',

//         gig: {              // mini-gig
//             _id: 'oRulYh',
//             name: 'I will fix wordpress, CSS, HTML, jquery, and PHP errors',
//             imgUrl: 'https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg',
//             price: 826,
//         },
//         createdAt: new Date(Date.now()).toDateString(),
//         status: 'completed',
//     }

//     const savedOrder = await storageService.post(STORAGE_KEY, order)

//     return savedOrder
// }
function pickStatus(num) {
    switch (num) {
        case 1:
            return 'completed'
            break;
        case 2:
            return 'aprove'
            break;
        case 3:
            return 'rejected'
            break;
        case 4:
            return 'pending'
            break;



        default:
            break;
    }
}


// const orders = [
//     {
//         _id: 'o1225',
//         buyer: 'mini-user',
//         seller: 'mini-user',

//         gig: {              // mini-gig
//             _id: 'oRulYh',
//             name: 'I will fix wordpress, CSS, HTML, jquery, and PHP errors',
//             imgUrl: 'https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg',
//             price: 826,
//         },
//         status: 'completed',
//     },
// ]


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
//         "https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg",
//         "https://fiverr-res.cloudinary.com/image/upload/t_order_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/ec112761c1122b557e288f18c234a5ce-1724391259/Screenshot%202024-08-23%20at%2011.03.41%E2%80%AFAM.png",
//         "https://fiverr-res.cloudinary.com/image/upload/t_order_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/46f47dc315ad08b8e79da601b0b94082-1723896064/Screenshot%202024-08-17%20at%205.30.55%E2%80%AFPM.png"
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
//     imgUrls: ['https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/143128157/original/f8bc3454c2a59c2dcdf117b050010e96c81f30ce.jpg',
//         'https://fiverr-res.cloudinary.com/image/upload/t_order_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/ec112761c1122b557e288f18c234a5ce-1724391259/Screenshot%202024-08-23%20at%2011.03.41%E2%80%AFAM.png',
//         'https://fiverr-res.cloudinary.com/image/upload/t_order_card_delivery_image_1x,q_auto,f_auto/v1/attachments/delivery/asset/46f47dc315ad08b8e79da601b0b94082-1723896064/Screenshot%202024-08-17%20at%205.30.55%E2%80%AFPM.png'
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




// {
//     title: "I will write and fix any script in html, css, javascript and jquery",
//     price: 96,
//     owner: {
//         _id: "oRulYh",
//         fullname: "Mirza Talha",
//         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/7f77f49e93bf71d5d8bde8a00e754a84-1707770708869/b5070084-92ac-4a93-a316-cea509e700de.png",
//         level: "basic",
//         rate: 3
//     },
//     daysToMake: 3,
//     description: "As a full-stack developer, I have the power to create amazing websites and web applications \nusing HTML, CSS, JavaScript, React Js, Next Js, Node Js, PHP and jQuery. Whether the \nplatform is Wordpress",
//     avgResponseTime: 8,
//     loc: "Pakistan",
//     imgUrls: [
//         "https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders/316714706/original/96748f43c4e422e5e0ce260c06a08e1db8081814.png",
//         "https://fiverr-res.cloudinary.com/t_order_cards_web,q_auto,f_auto/orders2/316714706/original/a9d9c6992a0c057d8a8994e2698e0ae98cf3419b.png",
//         // "https://fiverr-res.cloudinary.com/t_order_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/08a28ac99df5e3395170540ed9405d6b-1687936871/Screenshot%202023-06-28%20122059.png"
//     ],
//     tags: "programming",
//     likedByUsers: []
// }


