<template>
  <div class="register-container">
    <div class="register-card">
      <div class="logo">🧠 {{ t('register.title') }}</div>
      <el-form :model="form" :rules="rules" ref="registerForm" label-position="top">
        <el-form-item :label="t('register.email')" prop="email">
          <el-input v-model="form.email" :placeholder="t('register.placeholder.email')" />
        </el-form-item>
        <el-form-item :label="t('register.password')" prop="password">
          <el-input v-model="form.password" type="password" :placeholder="t('register.placeholder.password')" />
        </el-form-item>
        <el-form-item :label="t('register.confirmPassword')" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" :placeholder="t('register.placeholder.confirmPassword')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRegister">{{ t('register.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { register } from '@/api/auth'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })
const registerForm = ref()

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  email: [
    { required: true, message: t('register.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('register.emailInvalid'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('register.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('register.passwordInvalid'), trigger: 'blur' }
  ],
  confirmPassword: [
    {
      validator: (_: any, value: string, callback: any) => {
        if (value !== form.value.password) {
          callback(new Error(t('register.passwordMismatch')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const onRegister = () => {
  registerForm.value.validate(async (valid: boolean) => {
    if (!valid) return
    try {
      await register(form.value.email, form.value.password)
      ElMessage.success(t('register.success'))
      router.push('/home')
    } catch (err: any) {
      ElMessage.error(err?.message || '注册失败')
    }
  })
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #cfd9df, #e2ebf0);
}
.register-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 90%;
}
.logo {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 1.5rem;
}
</style>
