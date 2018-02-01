// version
export const VERSION = 'ver 1.0.0'

// url
const apiIp = '112.35.63.188'
const apiPort = '8081'
export const BASE_URL = 'http://' + apiIp + ':' + apiPort + '/api/'
export const SUBSCRIBE_URL = 'ws://' + apiIp + ':61614'

// httpUrl
export const LOGIN = 'login'
export const ROLE = 'role'
export const DEPARTMENT = 'department'

// result
export const RESULT = {
    success: 'SUCCESS',
    failed: 'FAILED'
}

// login
export const loginEmpty = {
    type: 'error',
    title: '',
    message: '用户名或密码不能为空',
    duration: 2000
}

export const networkError = {
    type: 'error',
    title: '',
    message: '网络错误',
    duration: 2000
}

// notify
export const basicSuccessNofity = {
    type: 'success',
    title: '',
    message: '操作成功',
    duration: 2000
}

export const basicFailNofity = {
    type: 'error',
    title: '',
    message: '操作失败',
    duration: 2000
}

// messagebox
// export const basicMessageBox = {
// }
