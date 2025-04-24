import {  createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/pages/SignIn.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Profile from '@/pages/Profile.vue'
import Analytic from '@/pages/Analytic.vue'
import { useSessionStore } from '@/stores/session'


const routes = [
  {
    path: '/',
    name:'signin',
    component:SignIn
  },
  { 
    path: '/dashboard', 
    component: DashboardLayout,
    children: [
      { path: '', component: Profile},
      { path: 'analytic', component: Analytic},
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach(async (to, _from, next) => {
  const session = useSessionStore()
 await session.fetchSession()

  if (to.path === '/' && session.loggedIn) {
    return next('/dashboard')
  }
  if (to.path !== '/' && !session.loggedIn) {
    return next('/')
  }

  next()
})
export default router