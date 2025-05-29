<template>
    <div class="MainLayout">
        <el-container class="layout-wrapper" style="height: 100vh;">
            <!-- 顶部栏 -->
            <el-header height="60px" class="layout-header">
                <div class="header-left">
                    <!-- 手机端菜单按钮 -->
                    <el-button class="mobile-menu-button" @click="drawerVisible = true" v-if="isMobile">🍔</el-button>
                    <span class="logo">🧠 {{ t('common.logo') }}</span>
                </div>
                <div class="header-right">
                    <!-- 语言切换按钮 -->
                    <!-- <el-button size="small" @click="toggleLocale">
                        🌐 {{ localeLabel }}
                    </el-button> -->

                    <!-- 主题切换按钮 -->
                    <!-- <el-button size="small" @click="toggleTheme()">
                        {{ themeLabel }}
                    </el-button> -->
                </div>
            </el-header>

            <!-- 主体区域 -->
            <el-container style="height: calc(100vh - 60px); padding: 10px; box-sizing: border-box;">
                <!-- 桌面端显示侧边栏 -->
                <el-aside :width="isCollapsed ? '75px' : '200px'" class="layout-aside transition-aside"
                    v-if="!isMobile">
                    <div class="aside-inner">
                        <div class="collapse-toggle" @click="toggleCollapse">
                            {{ isCollapsed ? '👉' : '👈' }}
                        </div>
                        <Sidebar />
                    </div>
                </el-aside>

                <!-- 移动端抽屉显示侧边栏 -->
                <el-drawer :style="drawerStyle" custom-class="layout-aside" v-model="drawerVisible" direction="ltr"
                    size="200px" :with-header="true">
                    <Sidebar />
                </el-drawer>

                <!-- 主内容 -->
                <el-main class="layout-main">
                    <slot /> <!-- 默认插槽用于页面内容 -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { useI18n } from 'vue-i18n'
import Sidebar from '@/components/Sidebar.vue'
import { computed, provide, watch, ref, onMounted } from 'vue'
import { useSidebarStore } from '@/stores/modules/sidebar'

const sidebarStore = useSidebarStore()
const app = useAppStore()
const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const drawerStyle = computed(() => {
    return {
        background: app.darkMode
            ? 'linear-gradient(135deg, #0C2B30, #112234, #131930)'
            : 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
        color: app.darkMode ? '#e0e0e0' : '#2b2f3a',
        padding: '0' // 清除默认内边距
    }
})
const isCollapsed = computed(() => sidebarStore.collapsed)
const toggleCollapse = () => sidebarStore.toggle()

// 提供给 Sidebar 使用
provide('sidebarCollapsed', isCollapsed)
// 响应式判断窗口宽度是否为移动端
const drawerVisible = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })

    // ✅ 路由跳转后关闭 drawer（仅移动端）
    router.afterEach(() => {
        if (isMobile.value) {
            drawerVisible.value = false
        }
    })
})

watch(() => app.locale, (newLocale) => {
    locale.value = newLocale
}, { immediate: true })

</script>

<style scoped>
.layout-wrapper {
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);
}

.transition-aside {
    transition: width 0.3s ease;
}

.aside-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
}

.collapse-toggle {
    cursor: pointer;
    font-size: 20px;
    text-align: right;
    padding: 5px 10px;
    user-select: none;
    color: #ccc;
}

.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    background-color: var(--el-bg-color-overlay);
    box-sizing: border-box;
}

.header-left {
    display: flex;
    align-items: center;
}

.logo {
    font-weight: bold;
    font-size: 20px;
}

.header-right>* {
    margin-left: 10px;
}

.layout-aside {
    background: linear-gradient(135deg, #0C2B30, #112234, #131930);
    padding: 10px;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    box-sizing: border-box;
}

html:not(.dark) .layout-header {
    background-image: linear-gradient(135deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}

html:not(.dark) .layout-aside {
    /*background: linear-gradient(to right, #E3FBFE 0%, #f2f6fb 100%);*/
    background-image: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

:deep(.el-drawer__header) {
    margin-bottom: 0;
}

:deep(.el-drawer__body) {
    padding: 0;
    display: flex;
    justify-content: center;
}

.layout-main {
    padding: 20px;
    padding-top: 0;
    overflow-y: auto;
}

/* 移动端菜单按钮样式 */
.mobile-menu-button {
    margin-right: 10px;
    font-size: 20px;
    padding: 0;
    border: none;
    background: transparent;
}

:global(html.theme-transition),
:global(html.theme-transition *) {
    transition: background-color 0.3s ease, color 0.3s ease !important;
}
</style>
