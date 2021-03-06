import {
    LOGIN,
    LOGOUT,
    SAVESESSION
} from '../../mutation_types'

const USER_LOGINED_INFO = 'loginedUser'
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
        [LOGIN] (state, userObj) {
            state.logined = true
            state.loginedUser = userObj.loginedUser
            state.token = userObj.reqToken

            sessionStorage.setItem(CONFIG_HEADERS_TOKEN, state.token)
        },
        [LOGOUT] (state) {
            state.logined = USER_IS_LOGINED
            state.loginedUser = null
            state.token = null

            sessionStorage.clear()
        },
        [SAVESESSION] (state, dataJson) {
            sessionStorage.setItem(USER_LOGINED_INFO, dataJson)
        }
    },
    actions: {
        login ({commit}, params) {
            commit(LOGIN, params)
        },
        logout ({commit}) {
            commit(LOGOUT)
        },
        saveSession ({commit}, params) {
            commit(SAVESESSION, params)
        }
    }
}
