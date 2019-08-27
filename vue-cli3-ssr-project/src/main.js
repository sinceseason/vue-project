// const Vue = require('vue')
// const server = require('express')()

import Vue from "vue";
import App from "./App.vue";
import {createRouter} from "./router";
import {
  createStore
} from "./store";
import {
  sync
} from 'vuex-router-sync'

Vue.config.productionTip = false;

// const app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");

// const context = {
//   stitle: 'this is second title',
//   meta: `
//     <meta name="keywords" content="this is keywords">
//     <meta name="description" content="this is miaoshu">
//   `
// }

// // 第 2 步：创建一个 renderer
// const renderer = require('vue-server-renderer').createRenderer({
//   template: require('fs').readFileSync('./index.template.html', 'utf-8')
// })

// // 第 3 步：将 Vue 实例渲染为 HTML
// renderer.renderToString(app, context, (err, html) => {
//   if (err) throw err
//   console.log(html)
//   // => <div data-server-rendered="true">Hello World</div>
// })

export function createApp() {
  const router = createRouter();
  const store = createStore();

  // 同步 route state 到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  };
}