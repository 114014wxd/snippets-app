<template>
    <div class="sidebar-wrapper">
        <el-menu :default-active="activeMenu" class="sidebar-menu" background-color="transparent"
            text-color="var(--el-text-color-primary)" active-text-color="var(--el-color-primary)" router>
            <el-menu-item index="/home">
                <span class="icon">🧩</span>
                <template #title>{{ t('sidebar.all') }}</template>
            </el-menu-item>

            <el-menu-item index="/react">
                <span class="icon">⚛️</span>
                <template #title>{{ t('sidebar.react') }}</template>
            </el-menu-item>

            <el-menu-item index="/array">
                <span class="icon">🧮</span>
                <template #title>{{ t('sidebar.array') }}</template>
            </el-menu-item>

            <el-menu-item index="/interview">
                <span class="icon">📄</span>
                <template #title>{{ t('sidebar.interview') }}</template>
            </el-menu-item>

            <el-menu-item index="/settings">
                <span class="icon">⚙️</span>
                <template #title>{{ t('sidebar.settings') }}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, }: any = useI18n({ useScope: 'global' })
const route = useRoute()
const activeMenu = ref(route.path)
// 监听路由变化保持高亮
watch(() => route.path, (newPath) => {
    activeMenu.value = newPath
})

</script>

<style scoped>
.sidebar-menu {
    border-right: none;
    height: 100%;
}

/* 普通菜单项 */
.sidebar-menu :deep(.el-menu-item) {
    border-radius: 8px;
    margin: 4px 8px;
    transition: all 0.2s;
}

/* hover 效果（淡蓝或淡灰） */
html.dark .sidebar-menu :deep(.el-menu-item:hover) {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    /* 淡蓝色 */
}

/* 选中菜单项样式 */
html.dark .sidebar-menu :deep(.el-menu-item.is-active) {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    /* 暗蓝 */
    color: #ffffff;
}

/* 🌞 浅色模式下 sidebar 样式 */
html:not(.dark) .sidebar-menu :deep(.el-menu-item) {
    color: #2b2f3a;
    font-weight: 500;
}

/* hover 样式 */
html:not(.dark) .sidebar-menu :deep(.el-menu-item:hover) {
    background: linear-gradient(135deg,
            rgba(64, 158, 255, 0.15),
            rgba(200, 220, 255, 0.25));
    color: #2b2f3a;
}

/* active 样式 */
html:not(.dark) .sidebar-menu :deep(.el-menu-item.is-active) {
    background: radial-gradient(circle,
            rgba(64, 158, 255, 0.05) 0%,
            rgba(64, 158, 255, 0.15) 70%,
            rgba(64, 158, 255, 0.25) 100%);
    color: #2b2f3a;
    border-radius: 8px;
}

/* 图标统一偏灰蓝 */
html:not(.dark) .sidebar-menu .icon {
    color: #8a94a6;
}

.sidebar-menu :deep(.el-menu-item.is-active .icon) {
    color: inherit;
}
</style>
