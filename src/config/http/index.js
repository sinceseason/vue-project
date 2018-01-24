import axios from 'axios'
import {BASE_URL as baseUrl, SUBSCRIBE_URL as subscribeUrl} from '../const'

const instance = axios.create()

class Http {
  static install(Vue) {
    Vue.prototype.$httpGet = Http._get
  }

  static _get(url, params) {
    return new Promise (resolve, reject)
  }
}