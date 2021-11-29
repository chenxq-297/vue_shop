import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import User from '@/components/User/Users.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home ,redirect:'/welcome', children:[
      {path:'/welcome', component: Welcome},
      {path:'/users', component: User}
    ] },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path === '/login') return next()
  const tokenstr=window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/login')
  next()
})

export default router