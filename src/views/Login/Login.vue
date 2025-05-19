<template>
  <div class="login-container">
    <div class="login-card animate__animated animate__fadeInDown">
      <div class="logo">🧠 {{ t('login.logo') }}</div>
      <el-form :model="form" :rules="rules" ref="loginForm" label-position="top">
        <el-form-item :label="t('login.email')" prop="email">
          <el-input size="large" v-model="form.email" :placeholder="t('login.placeholder.email')" />
        </el-form-item>
        <el-form-item :label="t('login.password')" prop="password">
          <el-input size="large" v-model="form.password" type="password" :placeholder="t('login.placeholder.password')" show-password />
        </el-form-item>
        <el-form-item style="display:flex;justify-content: space-between;">
          <el-checkbox v-model="form.remember">{{ t('login.rememberMe') }}</el-checkbox>
          <a class="forgot" @click="onForgot">{{ t('login.forgotPassword') }}</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin" class="login-btn">🚀 {{ t('login.signIn') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const loginForm = ref()
const form = ref({
  email: '',
  password: '',
  remember: true
})

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

function onLogin() {
  loginForm.value.validate((valid: boolean) => {
    if (!valid) return
    if (form.value.remember) {
      localStorage.setItem('user-token', 'token123')
    }
    ElMessage.success(t('login.loginSuccess'))
    router.push('/dashboard')
  })
}

function onForgot() {
  ElMessage.info('Redirect to forgot password...')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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
:deep(.el-form-item__content){
    display: flex;
    justify-content: space-between;
}
:deep(.el-input__wrapper){
    background: transparent;
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
