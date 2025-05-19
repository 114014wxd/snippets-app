import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import ReactView from '@/views/Snippet/React.vue'
import ArrayView from '@/views/Snippet/Array.vue'
import InterviewView from '@/views/Snippet/Interview.vue'
import NewSnippet from '@/views/Snippet/New.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: false // ✅ 不使用 MainLayout
    }, component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/react',
    name: 'React',
    component: ReactView
  },
  {
    path: '/array',
    name: 'Array',
    component: ArrayView
  },
  {
    path: '/interview',
    name: 'Interview',
    component: InterviewView
  },
  {
    path: '/settings',
    name: 'NewSnippet',
    component: NewSnippet
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
// router.beforeEach((to, _from, next) => {
//   const token = localStorage.getItem('user-token')
//   if (to.path !== '/login' && !token) {
//     next('/login')
//   } else if (to.path === '/login' && token) {
//     next('/dashboard')
//   } else {
//     next()
//   }
// })

export default router
