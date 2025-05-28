// vite.config.ts
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
// 自动引入 Vue API（如 ref、computed）和 Element Plus API（如 ElMessage）
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [vue(),
  AutoImport({
    imports: {
      vue: ['ref', 'computed', 'watch', 'onMounted', 'reactive', 'nextTick', 'watchEffect', 'onUnmounted', 'shallowRef', 'markRaw'], // ✅ 只引入这些
      'vue-router': ['useRoute', 'useRouter'],
    },
    dts: 'src/auto-imports.d.ts', // 自动生成的类型声明文件
  }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    cors: true,
    port: 5180, // 👈 改成不一样的端口，例如 5180
    proxy: {
      '/api/appwrite': {
        target: 'https://fra.cloud.appwrite.io/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/appwrite/, ''),
        configure: proxy => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('x-appwrite-project', '682c581700264fb8629d')
          })
        }
      }
    }
  },
})
