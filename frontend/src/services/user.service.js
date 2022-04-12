import { httpService } from './http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getUsers,
    login,
    logout,
    signup,
    getLoggedinUser,
    update,
}



async function getUsers() {
    return await httpService.get(`user`)
}
async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

(async function devLogin(userCred = { username: 'lala', password: 'lala' }) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
})()