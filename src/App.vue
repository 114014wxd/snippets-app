<template>
  <!-- <div class="app"> -->
  <component :is="layoutComponent">
    <router-view />
    <GlobalLoading />
  </component>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import GlobalLoading from '@/components/GlobalLoading.vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
const app = useAppStore()
// 监听当前路由
const route = useRoute()
// 如果 meta.layout === false，就不使用 MainLayout
const layoutComponent = computed(() => {
  return route.meta.layout === false ? 'div' : MainLayout
})
// 进入页面时自动设置主题
if (app.darkMode) {
  document.documentElement.classList.add('dark')
}
</script>
