import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/new',
    name: 'NewSnippet',
    component: NewSnippet
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
