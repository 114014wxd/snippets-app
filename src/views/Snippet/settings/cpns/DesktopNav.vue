<template>
  <div class="desktop-nav">
    <div
      v-for="item in items"
      :key="item.key"
      :class="{ active: active === item.key }"
      @click="$emit('select', item.key)"
    >
      {{ t(item.label) }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const props = defineProps(['active'])
const { t } = useI18n()

const items = [
  { key: 'profile', label: 'settings.profile' },
  { key: 'appearance', label: 'settings.appearance' },
  { key: 'language', label: 'settings.language' }
]
</script>

<style scoped>
.desktop-nav {
  display: flex;
  flex-direction: column;
  width: 150px;
  font-weight: bold;
  gap: 16px;
}

.desktop-nav > div {
  cursor: pointer;
  transition: 0.2s;
}

.desktop-nav > div.active {
  color: var(--el-color-primary);
}
</style>
