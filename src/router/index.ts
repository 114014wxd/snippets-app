import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
import ReactView from '@/views/Snippet/React.vue'
import ArrayView from '@/views/Snippet/Array.vue'
import InterviewView from '@/views/Snippet/Interview.vue'
import Settings from '@/views/Snippet/settings/Settings.vue'
import Register from '@/views/Register/Register.vue'
import VueView from '@/views/Snippet/VueView/VueView.vue'

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
    path: '/category/vue',
    name: 'VueView',
    component: VueView
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
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
const publicPages = ['/login', '/register']

router.beforeEach((to, _from, next) => {
  const UserInfoStr = localStorage.getItem('UserStore')
  const UserInfo = UserInfoStr ? JSON.parse(UserInfoStr) : null
  if (!publicPages.includes(to.path) && !(UserInfo && UserInfo.status)) {
    // 未登录访问受保护页面
    next('/login')
  } else if (to.path === '/login' && UserInfo && UserInfo.status) {
    // 已登录访问 login，重定向到首页
    next('/home')
  } else {
    next()
  }
})

export default router
