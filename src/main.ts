// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// ✅ 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 默认样式
import 'element-plus/theme-chalk/dark/css-vars.css' // ✅ 支持暗黑模式
import '@/styles/dark-theme.css'
import router from './router'
// ✅ 引入 i18n 国际化
import { createI18n } from 'vue-i18n'
import messages from './locales/index' // 你将在下一步创建此文件
import { useAppStore } from '@/stores/app'
// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

console.log(i18n.global.messages)
console.log('🌍 i18n messages:', messages)
console.log('🌍 i18n:', i18n)
console.log(i18n.global.t('sidebar.all'))
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 🔥 useAppStore 要在 pinia.use() 之后
const appStore = useAppStore()
i18n.global.locale.value = appStore.locale

app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
