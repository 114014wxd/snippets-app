// vite.config.ts
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/locales',
          dest: '' // 拷贝到 dist 根目录
        }
      ]
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5180, // 👈 改成不一样的端口，例如 5180
  },
})
