<template>
  <div class="appearance-settings">
    <h2>{{ t('settings.appearance') }}</h2>

    <el-form label-position="top" class="appearance-form">
      <el-form-item :label="t('settings.theme')">
        <el-radio-group v-model="theme">
          <el-radio :value="'light'">☀️ {{ t('settings.light') }}</el-radio>
          <el-radio :value="'dark'">🌙 {{ t('settings.dark') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="followSystem">{{ t('settings.followSystem') }}</el-checkbox>
      </el-form-item>

      <el-button type="primary" @click="applyTheme">{{ t('settings.switch') }}</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const app = useAppStore()

const theme = ref(app.darkMode ? 'dark' : 'light')
const followSystem = ref(app.followSystem ?? false)

watch(followSystem, (val) => {
  if (val) {
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = sysDark ? 'dark' : 'light'
  }
})

function applyTheme() {
  app.followSystem = followSystem.value
  app.darkMode = theme.value === 'dark'
  localStorage.setItem('theme', theme.value)
  localStorage.setItem('followSystem', String(followSystem.value))
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}
</script>

<style scoped>
.appearance-settings {
  max-width: 600px;
  margin: 0 auto;
}

.appearance-form {
  margin-top: 20px;
}
</style>
