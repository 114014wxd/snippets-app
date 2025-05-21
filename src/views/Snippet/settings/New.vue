<template>
  <div class="settings-page">
    <!-- 顶部 Tab -->
    <el-tabs
      v-model="activeTab"
      class="settings-tabs"
      @tab-click="onSelect"
      stretch
    >
      <el-tab-pane :label="`🎨 ${t('settings.appearance')}`" name="appearance" />
      <el-tab-pane :label="`🌍 ${t('settings.language')}`" name="language" />
    </el-tabs>

    <!-- 内容区 -->
    <div class="settings-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppearanceSettings from './cpns/AppearanceSettings.vue'
import LanguageSettings from './cpns/LanguageSettings.vue'

const { t } = useI18n({ useScope: 'global' })
const activeTab = ref('appearance')

const onSelect = (tab: any) => {
  activeTab.value = tab.paneName
}

const currentComponent = computed(() => {
  return activeTab.value === 'appearance' ? AppearanceSettings : LanguageSettings
})
</script>

<style scoped>
.settings-page {
  background-color: var(--el-bg-color);
  position: relative;
}

.settings-tabs {
  max-width: 500px;
  margin-bottom: 20px;
  --el-tabs-header-height: 50px;
}

:deep(.el-tabs__item) {
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s;
}

:deep(.el-tabs__item.is-active) {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  font-weight: bold;
}

.settings-content {
  background-color: var(--el-bg-color);
  padding: 20px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  max-width: 700px;
  margin: 0 auto;
}

</style>
