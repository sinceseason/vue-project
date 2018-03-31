import { dateFormat } from '../../../static/script/dateformat'

export function platformNameFilter (val) {
    if (val === undefined || val === '')
        return 'label.title'
    return val
}

export function timeToDateFilter (time) {
    if (time)
        return dateFormat(new Date(time), 'yyyy-MM-dd')
    return ''
}

export function timeToFullDateFilter (time) {
    if (time)
        return dateFormat(new Date(time), 'yyyy-MM-dd hh:mm:ss')
    return ''
}
