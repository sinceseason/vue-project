import axios from 'axios'
import {BASE_URL} from '../const'

let config = {
  baseURL: BASE_URL
}

const instance = axios.create(config)

class Http {
  static install (Vue) {
    Vue.prototype.$httpGet = Http._get
    Vue.prototype.$httpPost = Http._post
  }

  static _get (url, params) {
    return new Promise((resolve, reject) => {
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
      instance.post(url, params, {
        headers: {'Content-Type': undefined},
        transformRequest: [function (params, headers) {
          let formData = new FormData()
          for (let key of Object.keys(params)) {
            formData.append(key, params[key] !== null ? params[key] : '')
          }
          return formData
        }]
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default Http
