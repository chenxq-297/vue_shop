import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/Home.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path === '/login') return next()
  const tokenstr=window.sessionStorage.getItem('token')
  if(!tokenstr) return next('./login')
  next()
})

export default router