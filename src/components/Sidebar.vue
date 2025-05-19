<template>
    <div class="sidebar-wrapper">
        <el-menu :default-active="activeMenu" class="sidebar-menu" background-color="transparent"
            text-color="var(--el-text-color-primary)" active-text-color="var(--el-color-primary)" router>
            <el-menu-item index="/home">
                <span class="icon">🧩</span>
                <div>{{ $t('sidebar.all') }}</div>
                <div>{{ t('sidebar.all') }}</div>
                <template #title>{{ t('sidebar.all') }}</template>
            </el-menu-item>

            <el-menu-item index="/react">
                <span class="icon">⚛️</span>
                <template #title>{{ $t('sidebar.react') }}</template>
            </el-menu-item>

            <el-menu-item index="/array">
                <span class="icon">🧮</span>
                <template #title>{{ $t('sidebar.array') }}</template>
            </el-menu-item>

            <el-menu-item index="/interview">
                <span class="icon">📄</span>
                <template #title>{{ $t('sidebar.interview') }}</template>
            </el-menu-item>

            <el-menu-item index="/settings">
                <span class="icon">⚙️</span>
                <template #title>{{ $t('sidebar.settings') }}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale, messages }:any = useI18n({ useScope: 'global' })
const route = useRoute()
const activeMenu = ref(route.path)
console.log('当前语言：', locale.value)
console.log('messages.zh.sidebar.all：', messages.value.zh?.sidebar?.all)
console.log('t("sidebar.all")：', t('sidebar.all'))
// 监听路由变化保持高亮
watch(() => route.path, (newPath) => {
    activeMenu.value = newPath
})
onMounted(() => {
    console.log('sidebar.all 的翻译：', t('sidebar.all'))
})
</script>

<style scoped>
.sidebar-menu {
    border-right: none;
    height: 100%;
    padding-top: 10px;
}

/* 普通菜单项 */
.sidebar-menu :deep(.el-menu-item) {
    border-radius: 8px;
    margin: 4px 8px;
    transition: all 0.2s;
}

/* hover 效果（淡蓝或淡灰） */
html.dark .sidebar-menu :deep(.el-menu-item:hover) {
    background: linear-gradient(135deg,
            rgba(64, 158, 255, 0.2),
            rgba(100, 108, 255, 0.25));
    /* 淡蓝色 */
}


/* 选中菜单项样式 */
html.dark .sidebar-menu :deep(.el-menu-item.is-active) {
    background: linear-gradient(135deg,
            rgba(64, 158, 255, 0.2),
            rgba(100, 108, 255, 0.25));
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
    background: linear-gradient(135deg,
            rgba(64, 158, 255, 0.15),
            rgba(200, 220, 255, 0.25));
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
