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
  locale: 'zh', // 默认语言
  fallbackLocale: 'en',
  messages,
})
console.log(i18n.global.messages)
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(router) // ✅ 挂载
app.use(i18n)
app.use(pinia)
// ✅ 手动同步 locale 设置到 i18n
const appStore = useAppStore()
i18n.global.locale.value = appStore.locale
app.mount('#app')
