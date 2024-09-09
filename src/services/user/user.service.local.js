import { storageService } from '../async-storage.service.js'
import { makeId, makeLorem } from '../util.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser

}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}



function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    console.log(userCred);
    userCred._id = makeId()
    //  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // userCred.score = 10000

    await storageService.post('user', userCred)

    return _saveLoggedinUser(userCred)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLoggedinUser(user) {
    console.log(user, 'nmbm');

    const newuser = {
        // 		username: 'user1',
        // 		password: 'secret',
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        username: user.username,
        password: user.password,
        type: user.type
    }
    console.log(newuser, 'pppp');

    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newuser))
    return newuser
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
// async function _createAdmin() {
//     const user = {
//         username: 'admin',
//         password: 'admin',
//         fullname: 'Mustafa Adminsky',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
//         score: 10000,
//     }

//const newUser = await storageService.post('user', userCred)
//console.log('newUser: ', newUser)
