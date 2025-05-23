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



const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(i18n)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
