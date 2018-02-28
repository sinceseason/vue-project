import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/pages/login/login')
const Navigation = () => import('@/pages/navigation')
const Monitor = () => import('@/pages/monitor/monitor')
const Call = () => import('@/pages/call/call')

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/nav', name: 'nav', component: Navigation,
      children: [
        { path: 'monitor', name: 'monitor', component: Monitor },
        { path: 'call', name: 'call', component: Call }
      ]
    },
    { path: '/*', redirect: { name: 'login' } }
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
