import axios from 'axios'
import store from '../../store'
import {BASE_URL} from '../const'

// let Base64 = require('js-base64').Base64

let config = {
  baseURL: BASE_URL
}

const instance = axios.create(config)

class Http {
  static install (Vue) {
    Vue.prototype.$httpGet = Http._get
    Vue.prototype.$httpPost = Http._post
    Vue.prototype.$httpAll = Http._all
  }

  static bindHeadersToken (params) {
    let headersToken = store.getters.token
    headersToken && (instance.defaults.headers.common['token'] = headersToken)
  }

  static _get (url, params) {
    Http.bindHeadersToken(params)

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

  static _post (url, urlPara, params) {
    Http.bindHeadersToken(params)

    if (urlPara != undefined && urlPara != null)
      url += '/' + urlPara

    return new Promise((resolve, reject) => {
      instance.post(url, params, {
        headers: {'Content-Type': undefined},
        transformRequest: [function (params, headers) {
          let formData = new FormData()
          if (params) {
            for (let key of Object.keys(params)) {
              formData.append(key, params[key] !== null ? params[key] : '')
            }
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

  static _all (urls) {
    return Promise.all(urls)
  }
  // .then(axios.spread((acct, perms) => {
  //   console.log(acct.data)
  //   perms(acct)
  // }))
}

export default Http
