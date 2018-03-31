import Vue from 'vue'
import Router from 'vue-router'
import Global from '@/config/global'

Vue.use(Router)

const Login = () => import('@/pages/login/login')
const Navigation = () => import('@/pages/navigation')
const Monitor = () => import('@/pages/monitor/monitor')
const Ptt = () => import('@/pages/ptt/ptt')
const Remote = () => import('@/pages/remote/control/control')
const Police = () => import('@/pages/remote/police/police')
const Upgrade = () => import('@/pages/remote/upgrade/upgrade')
const Analysis = () => import('@/pages/analysis/analysis')
const VehicleState = () => import('@/pages/analysis/vehicle_state/vehicle_state')
const Log = () => import('@/pages/system/log/log')
const Department = () => import('@/pages/system/department/department')

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/nav', name: 'nav', component: Navigation,
      children: [
        { path: 'monitor', name: 'monitor', component: Monitor },
        { path: 'ptt', name: 'ptt', component: Ptt },
        { path: 'remote', name: 'remote', component: Remote },
        { path: 'upgrade', name: 'upgrade', component: Upgrade },
        { path: 'police', name: 'police', component: Police },
        { path: 'analysis', name: 'analysis', component: Analysis,
          children: [
            { path: 'state', name: 'state', component: VehicleState }
          ]
        },
        { path: 'log', name: 'log', component: Log },
        { path: 'department', name: 'department', component: Department }
      ]
    },
    { path: '/*', redirect: { name: 'login' } }
  ]
})

router.beforeEach = function (to, from, next) {
  if (to.name === 'login' && from.name != null) {
    Global.$redirectToLoginPage()
  } else {
    next()
  }
}

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
