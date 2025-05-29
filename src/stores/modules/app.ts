// src/stores/app.ts
import { defineStore } from 'pinia'
import piniaPersistConfig from '../piniaPersist'

export const useAppStore = defineStore('app', {
  state: () => ({
    darkMode: true,
    locale: 'zh' as 'zh' | 'en',
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    toggleLocale() {
      this.locale = this.locale === 'zh' ? 'en' : 'zh'
    },
  },
  persist: piniaPersistConfig('AppStore',) // ✅ 使用统一持久化配置
})
