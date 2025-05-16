<template>
  <div class="app">
     <MainLayout>
      <router-view /> <!-- ✅ 显示路由组件 -->
      </MainLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import MainLayout from '@/layouts/MainLayout.vue'
const app = useAppStore()

// 进入页面时自动设置主题
if (app.darkMode) {
  document.documentElement.classList.add('dark')
}
</script>
