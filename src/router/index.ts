import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import ReactView from '@/views/Snippet/React.vue'
import ArrayView from '@/views/Snippet/Array.vue'
import InterviewView from '@/views/Snippet/Interview.vue'
import NewSnippet from '@/views/Snippet/settings/New.vue'
import Register from '@/views/Register/Register.vue'

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
    },
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: false // ✅ 不使用 MainLayout
    },
    component: Register
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
const publicPages = ['/login', '/register']

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('user-token')
  if (!publicPages.includes(to.path) && !token) {
    // 未登录访问受保护页面
    next('/login')
  } else if (to.path === '/login' && token) {
    // 已登录访问 login，重定向到首页
    next('/dashboard')
  } else {
    next()
  }
})

export default router
