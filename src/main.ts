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
import { i18n } from './i18n.ts'
// import { useAppStore } from '@/stores/app'



const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(i18n)

console.log('当前语言：', i18n.global.locale.value)
console.log('sidebar.all 的翻译：', i18n.global.t('sidebar.all'))
app.use(router)
app.use(ElementPlus)
// const appStore = useAppStore()
// i18n.global.locale.value = appStore.locale || 'zh'
app.mount('#app')
