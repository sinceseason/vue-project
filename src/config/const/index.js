// version
export const VERSION = 'ver 1.0.0'

// url
const apiIp = 'localhost'
const apiPort = '8081'
export const BASE_URL = 'http://' + apiIp + ':' + apiPort + '/api/'
export const SUBSCRIBE_URL = 'ws://' + apiIp + ':61614'

// http
export const LOGIN = 'login'

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

// export {BASE_URL, SUBSCRIBE_URL}