import { httpService } from '../http.service'

const categories = ['logo-design', 'wordpress', 'voice-over', 'artistic', 'proffesional', 'accessible', 'programming', 'digital marketing', 'consulting']


export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    getDefaultFilter,
    getEmptyGig,
    getCategories
}

async function query(filterBy = {}) {
    return httpService.get(`gig`, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)
    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
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



function getCategories() {
    return categories
}
