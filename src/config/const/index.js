// version
export const VERSION = 'ver 1.0.0'

// url
// const apiIp = '112.35.63.188'
const apiIp = 'localhost'
const apiPort = '8081'
export const BASE_URL = 'http://' + apiIp + ':' + apiPort + '/api/'
export const SUBSCRIBE_URL = 'ws://' + apiIp + ':61614'

// httpUrl
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const ROLE = 'role'
export const DEPARTMENT = 'department'
export const MENU = 'menu'
export const ANALYSISDEVICE = 'analysisDevice'
export const OCX = 'ocx'
export const CHANNEL = 'channel'
export const CHANNELINFOS = 'channelInfos'
export const LOAD_PTT_ADINFO = 'loadPttAdinfo'
export const TEMP_CHANNEL = 'tempChannel'
export const TEMP_CHANNEL_RELA = 'tempChannelRela'
export const TEMPCHANNELRELAREMOVE = 'tempChannelRelaRemove'
export const DISPATCH_PTT_INFO = 'dispatchPttInfo'
export const LOG = 'log'

export const SAVE = 'Save'
export const REMOVE = 'Remove'
export const FUZZY = 'Fuzzy'

// operator
export const operator = {
    CREATE: 'create',
    MODIFY: 'modify',
    REMOVE: 'remove'
}

// result
export const RESULT = {
    success: 'SUCCESS',
    failed: 'FAILED'
}

// errorcode
export const ERRORCODE = {
    SAME_RECORD: 0x05,
    OUT_OF_SIZE: 0x08,
    NO_AUTH: 0x09,
    IS_NOT_IMAGE_FILE: 0x0A
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

export const sameRecord = {
    type: 'error',
    title: '',
    message: '存在相同记录',
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
