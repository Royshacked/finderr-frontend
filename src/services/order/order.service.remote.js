import { httpService } from '../http.service'

const status = ['active', 'missing details', 'delivered', 'completed', 'cancelled', 'all']

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg,
    getDefaultOrderFilter,
    getStatus,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`order`, filterBy)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt })
    return savedMsg
}

function getDefaultOrderFilter() {
    return {
        title: '',
        status: '',
        sortBy: '',
        sortDir: -1,
    }
}

function getStatus() {
    return status
}

