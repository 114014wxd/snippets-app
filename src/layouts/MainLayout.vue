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
                    <el-button size="small" @click="toggleLocale">
                        🌐 {{ localeLabel }}
                    </el-button>

                    <!-- 主题切换按钮 -->
                    <el-button size="small" @click="(e: MouseEvent | undefined) => toggleTheme(e)">
                        {{ themeLabel }}
                    </el-button>
                </div>
            </el-header>

            <!-- 主体区域 -->
            <el-container style="height: calc(100vh - 60px); padding: 10px; box-sizing: border-box;">
                <!-- 桌面端显示侧边栏 -->
                <el-aside width="220px" class="layout-aside" v-if="!isMobile">
                    <Sidebar />
                </el-aside>

                <!-- 移动端抽屉显示侧边栏 -->
                <el-drawer v-model="drawerVisible" direction="ltr" size="220px" :with-header="false">
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
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import Sidebar from '@/components/Sidebar.vue'
import { computed, watch, ref, onMounted } from 'vue'

const app = useAppStore()
const { t, locale } = useI18n({ useScope: 'global' })


// 响应式判断窗口宽度是否为移动端
const drawerVisible = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})

watch(() => app.locale, (newLocale) => {
    locale.value = newLocale
}, { immediate: true })

const toggleLocale = () => {
    app.toggleLocale()
}

const toggleTheme = (e?: MouseEvent) => {
    const isDark = !app.darkMode
    const color = isDark ? '#000' : '#fff'

    const ripple = document.createElement('div')
    ripple.className = 'theme-ripple-mask'
    ripple.style.setProperty('--ripple-color', color)

    const x = (e?.clientX ?? window.innerWidth / 2) - 150
    const y = (e?.clientY ?? window.innerHeight / 2) - 150
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = ripple.style.height = '300px'

    document.body.appendChild(ripple)

    // 强制重绘 + 开始动画
    requestAnimationFrame(() => {
        ripple.style.transform = 'scale(4)'
        ripple.style.opacity = '0'
    })

    setTimeout(() => {
        ripple.remove()
    }, 500)

    app.toggleTheme()
}

const localeLabel = computed(() =>
    app.locale === 'zh' ? t('common.zh') : t('common.en')
)

const themeLabel = computed(() =>
    app.darkMode ? '🌙 ' + t('common.dark') : '☀️ ' + t('common.light')
)
</script>

<style scoped>
.layout-wrapper {
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);
}

.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    background-color: var(--el-bg-color-overlay);
    border-radius: 5px;
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
    background-color: var(--el-bg-color-overlay);
    padding: 10px;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.06);
    border-radius: 5px;
}

html:not(.dark) .layout-aside {
    background: linear-gradient(to right, #E3FBFE 0%, #f2f6fb 100%);
}

.layout-main {
    padding: 20px;
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
