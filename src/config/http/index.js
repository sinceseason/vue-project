import axios from 'axios'
import {BASE_URL as baseUrl} from '../const'

let config = {
  baseUrl : baseUrl
}

const instance = axios.create(config)

class Http {
  static install (Vue) {
    Vue.prototype.$httpGet = Http._get
    Vue.prototype.$httpPost = Http._post
  }

  static _get (url, params) {
    return new Promise ((resolve, reject) => {
      instance.get(url, {
        params: params
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  static _post (url, params) {
    return new Promise((resolve, reject) => {
      instance.post(url, params)
      .then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}