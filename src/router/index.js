import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/pages/login/login')
const Navigation = () => import('@/pages/navigation')
const Monitor = () => import('@/pages/monitor/monitor')
const Ptt = () => import('@/pages/ptt/ptt')
const Analysis = () => import('@/pages/analysis/analysis')
const VehicleState = () => import('@/pages/analysis/vehicle_state/vehicle_state')

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/nav', name: 'nav', component: Navigation,
      children: [
        { path: 'monitor', name: 'monitor', component: Monitor },
        { path: 'ptt', name: 'ptt', component: Ptt },
        { path: 'analysis', name: 'analysis', component: Analysis,
          children: [
            { path: 'state', name: 'state', component: VehicleState }
          ]
        }
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
