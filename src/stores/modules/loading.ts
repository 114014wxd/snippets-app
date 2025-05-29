// src/stores/modules/loading.ts
import { defineStore } from 'pinia'
import piniaPersistConfig from '../piniaPersist'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false,
    reqCount: 0 // ✅ 支持并发计数防抖
  }),
  actions: {
    show() {
      this.reqCount++
      if (this.reqCount > 0) {
        this.loading = true
      }
    },
    hide() {
      this.reqCount--
      if (this.reqCount <= 0) {
        this.loading = false
        this.reqCount = 0
      }
    },
    reset() {
      this.loading = false
      this.reqCount = 0
    }
  },
  persist: piniaPersistConfig('LoadingStore') // ✅ 仅当你需要持久化时
})
