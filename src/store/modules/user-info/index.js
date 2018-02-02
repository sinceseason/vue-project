import {
    LOGIN
} from '../../mutation_types'

const USER_LOGINED_INFO = 'loginedUser'
const USER_LOGINED_ID = 'loginedUserId'
const CONFIG_HEADERS_TOKEN = 'token'
const USER_IS_LOGINED = false

function getStorageItem (item) {
    return window.localStorage.getItem(item) || window.sessionStorage.getItem(item)
}

export default {
    state: {
        logined: USER_IS_LOGINED,
        loginedUser: getStorageItem(USER_LOGINED_INFO),
        token: getStorageItem(CONFIG_HEADERS_TOKEN)
    },
    getters: {
        logined: state => state.logined,
        loginedUser: state => state.loginedUser,
        token: state => state.token
    },
    mutations: {
        [LOGIN] (state, loginedUser) {
            state.logined = true
            state.loginedUser = loginedUser
            state.token = loginedUser.id

            sessionStorage.setItem(USER_LOGINED_INFO, state.loginedUser)
            sessionStorage.setItem(USER_LOGINED_ID, state.loginedUser.id)
            sessionStorage.setItem(CONFIG_HEADERS_TOKEN, state.token)
        }
    },
    actions: {
        login ({commit}, params) {
            commit(LOGIN, params)
        }
    }
}
