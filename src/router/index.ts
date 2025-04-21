import {  createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import SignIn from '@/pages/SignIn.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'


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
      { path: '/dashboard', component: Home },
      {path:'/about' ,component:About}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router