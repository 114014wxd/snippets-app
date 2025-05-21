// src/stores/user.ts
import { defineStore } from 'pinia'
import piniaPersistConfig from './piniaPersist'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    name: '',
    avatar: '', // 可扩展未来支持
    status: false
  }),
  actions: {
    setUser(user: any) {
      this.id = user.$id
      this.email = user.email
      this.name = user.name
      this.status = user.status
    },
    clearUser() {
      this.id = ''
      this.email = ''
      this.name = ''
      this.status = false
    }
  },
  persist: piniaPersistConfig('UserStore',)
})
