<template>
  <div class="language-settings">
    <h2>{{ t('settings.language') }}</h2>

    <el-form label-position="top" class="language-form">
      <el-form-item :label="t('settings.currentLang')">
        <el-select v-model="selectedLocale" @change="onChange">
          <el-option label="中文" value="zh" />
          <el-option label="English" value="en" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/modules/app'

const { locale, t } = useI18n({ useScope: 'global' })
const app = useAppStore()
const selectedLocale = ref(app.locale)

watch(selectedLocale, (val) => {
  app.locale = val
  locale.value = val
  localStorage.setItem('locale', val)
})

function onChange() {
  // 可选：显示提示已切换语言
}
</script>

<style scoped>
.language-settings {
  max-width: 600px;
  margin: 0 auto;
}

.language-form {
  margin-top: 20px;
}
</style>
