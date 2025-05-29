<template>
    <div class="sidebar-wrapper">
        <el-menu :collapse="!isMobile ? isCollapsed : false" :default-active="activeMenu" class="sidebar-menu"
            background-color="transparent" text-color="var(--el-text-color-primary)"
            active-text-color="var(--el-color-primary)" router>
            <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                <span class="icon">{{ item.icon }}</span>
                <template #title>{{ t(item.label) }}</template>
            </el-menu-item>
        </el-menu>
        <!-- 👤 用户信息区域 -->
        <div class="user-box" v-if="user.email">
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="user-info">
                    <el-avatar :size="50" :src="user.avatar" />
                    <!-- <transition name="fade"> -->
                    <div class="username" v-if="!isCollapsed">{{ user.name }}</div>
                    <!-- </transition> -->
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item disabled class="email-display">{{ user.email }}</el-dropdown-item>
                        <el-dropdown-item command="profile">{{ t('sidebar.userSettings') }}</el-dropdown-item>
                        <el-dropdown-item command="logout">{{ t('sidebar.logout') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/modules/user'
import { logout } from '@/api/auth'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const user = userStore.$state
const activeMenu = ref(route.path)
watch(() => route.path, newPath => {
    activeMenu.value = newPath
})
const handleCommand = async (command: string) => {
    if (command === 'logout') {
        try {
            await logout()
            userStore.clearUser()
            router.push('/login')
        } catch (error) {

        }

    } else if (command === 'profile') {
        router.push('/settings')
    }
}
// 接收 collapse 状态
const isCollapsed = inject('sidebarCollapsed', ref(false))

// 判断是否移动端（宽度 < 768px）
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})
// 精简菜单配置
const menuList = [
    { path: '/home', label: 'sidebar.all', icon: '📚' },
    // { path: '/category/js', label: 'sidebar.js', icon: '📜' },
    // { path: '/category/ts', label: 'sidebar.ts', icon: '📘' },
    { path: '/category/vue', label: 'sidebar.vue', icon: '🧩' },
    { path: '/category/react', label: 'sidebar.react', icon: '⚛️' },
    { path: '/category/utils', label: 'sidebar.utils', icon: '🧰' },
    { path: '/interview', label: 'sidebar.interview', icon: '📄' },
    { path: '/bookmarks', label: 'sidebar.bookmarks', icon: '🔖' },
    // { path: '/settings', label: 'sidebar.settings', icon: '⚙️' }
]
</script>
<style scoped>
.sidebar-menu {
    border-right: none;
    height: 100%;
    width: 100%;
}

/* 普通菜单项 */
.sidebar-menu :deep(.el-menu-item) {
    border-radius: 8px;
    transition: all 0.2s;
    margin-top: 5px;
    height: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-box {
    margin-top: auto;
    padding: 16px 10px;
    display: flex;
    justify-content: center;
}

.user-info {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.username {
    width: 120px;
    font-size: 14px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--el-text-color-primary);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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

:deep(.el-menu-item .el-menu-tooltip__trigger) {
    justify-content: center;
}

.sidebar-wrapper {
    transition: width 0.3s ease;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.email-display {
    font-size: 13px;
    color: #999;
    cursor: default;
    pointer-events: none;
}

@media (max-width: 767px) {
    .sidebar-wrapper {
        height: 97%;
    }
}
</style>
