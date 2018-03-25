// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'

import Util from './config/util'
import * as Filters from './config/filters'
import Http from './config/http'
import store from './store'

import global from './config/global'

// 引入库css文件
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../static/font-awesome/css/font-awesome.min.css'

// 引入自定义css文件
import './assets/css/pageContainer.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Util)
Vue.use(Http)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

for (let item of [global])
  for (let key of Object.keys(item))
    Vue.prototype[key] = item[key]

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/i18n/zh'),
    'en': require('@/i18n/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
