<template>
    <div :class="['login-container', isDark ? 'dark-mode' : 'light-mode']">
        <div class=" login-card animate__animated animate__fadeInDown">
            <div class="logo">🧠 {{ t('login.logo') }}</div>
            <el-form :model="form" :rules="rules" ref="loginForm" label-position="top">
                <el-form-item :label="t('login.email')" prop="email">
                    <el-input size="large" v-model="form.email" :placeholder="t('login.placeholder.email')" />
                </el-form-item>
                <el-form-item :label="t('login.password')" prop="password">
                    <el-input size="large" v-model="form.password" type="password"
                        :placeholder="t('login.placeholder.password')" show-password />
                </el-form-item>
                <el-form-item style="display:flex;justify-content: space-between;">
                    <el-checkbox v-model="form.remember">{{ t('login.rememberMe') }}</el-checkbox>
                    <router-link to="/register" class="register-link">{{ t('login.register') }}</router-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onLogin" class="login-btn">🚀 {{ t('login.signIn') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { login,getUser,logout } from '@/api/auth'

const app = useAppStore()
const userStore = useUserStore()
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const loginForm = ref()
const form = ref({
    email: '',
    password: '',
    remember: true
})
const isDark = computed(() => app.darkMode == true)
// 使用 t() 实现多语言校验信息
const rules = {
    email: [
        { required: true, message: t('login.emailRequired'), trigger: 'blur' },
        { type: 'email', message: t('login.emailInvalid'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('login.passwordRequired'), trigger: 'blur' },
        { min: 6, message: t('login.passwordInvalid'), trigger: 'blur' }
    ]
}

async function onLogin() {
    loginForm.value.validate(async (valid: boolean) => {
        if (!valid) return
        try {
           await logout()
            await login(form.value.email, form.value.password)

            // 登录成功，获取用户信息
            const userInfo = await getUser()
            userStore.setUser(userInfo)

            // 是否记住登录
            if (form.value.remember) {
                localStorage.setItem('user-token', 'valid')
            }

            ElMessage.success(t('login.loginSuccess'))
            router.push('/home')
        } catch (error: any) {
            ElMessage.error(error?.message || '登录失败')
        }
    })
}


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
    background-position: center;
    transition: background 0.3s ease;
}

.dark-mode {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
}

.light-mode {
    background-image: linear-gradient(to left, #fff1eb 0%, #ace0f9 100%);
}

.login-card {
    background: rgba(255, 255, 255, 0.08);
    /* 更柔和的半透明白底 */
    border: 1px solid rgba(255, 255, 255, 0.15);
    /* 边框略明显，增强立体感 */
    backdrop-filter: blur(20px) saturate(150%);
    /* 更强烈的模糊和饱和度提升 */
    -webkit-backdrop-filter: blur(20px) saturate(150%);
    /* 兼容 Safari */

    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    color: white;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    /* 更深层的阴影 */

    transition: all 0.3s ease;
}


.logo {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.login-btn {
    width: 100%;
}

.forgot {
    float: right;
    color: #00cfff;
    cursor: pointer;
    font-size: 0.9rem;
}

:deep(.el-form-item__content) {
    display: flex;
    justify-content: space-between;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 1px #fdb6b6 inset;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 1px var(--input-border-focus-color);
}

:deep(.el-input__wrapper) {
    background: transparent;
    box-shadow: 0 0 1px var(--input-border-color);
}

@media (max-width: 600px) {
    .login-card {
        width: 75%;
        padding: 1.5rem 1rem;
    }

    .logo {
        font-size: 1.5rem;
    }
}
</style>
