import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '随手记',
        short_name: '随手记',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1890ff',
        icons: [
          {
            src: 'icons/代码片段.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/片段预览.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: './', 
})
