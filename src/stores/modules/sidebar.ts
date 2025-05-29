import { defineStore } from 'pinia'
import piniaPersistConfig from '../piniaPersist'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    collapsed: false // ✅ 默认展开
  }),
  actions: {
    toggle() {
      this.collapsed = !this.collapsed
    },
    expand() {
      this.collapsed = false
    },
    collapse() {
      this.collapsed = true
    }
  },
  persist: piniaPersistConfig('SidebarStore') // ✅ 可选：刷新保持展开/收起状态
})
