import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/pages/login/login')

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Login}
  ]
})

export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     }
//   ]
// })
