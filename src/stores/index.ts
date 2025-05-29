// src/stores/index.ts
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersist) // 应用全局插件

export default pinia

// 扫描导入所有模块并导出
// 自动注册所有模块（不导出类型，仅副作用）
const modules = import.meta.glob('./modules/*.ts', { eager: true })
Object.values(modules).forEach(mod => mod)

