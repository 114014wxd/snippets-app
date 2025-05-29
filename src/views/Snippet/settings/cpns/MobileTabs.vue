<template>
  <div class="mobile-tabs">
    <div
      v-for="item in items"
      :key="item.key"
      :class="['tab-item', { active: active === item.key }]"
      @click="$emit('select', item.key)"
    >
      <span class="icon">{{ item.icon }}</span>
      <transition name="fade">
        <span v-if="active === item.key">{{ t(item.label) }}</span>
      </transition>
      <span v-if="item.count" class="count">{{ item.count }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
defineProps(['active'])
const { t } = useI18n()

const items = [
  { key: 'profile', icon: '👤', label: 'settings.profile' },
  { key: 'appearance', icon: '🎨', label: 'settings.appearance' },
  { key: 'language', icon: '🌍', label: 'settings.language' }
]
</script>

<style scoped>
.mobile-tabs {
  display: flex;
  justify-content: space-around;
  background: #f1f5fb;
  border-radius: 40px;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.tab-item {
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tab-item .icon {
  font-size: 16px;
}

.tab-item.active {
  background: #e0ebff;
  color: #007aff;
  font-weight: bold;
}

.count {
  background: #007aff;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  margin-left: 6px;
  font-size: 12px;
}

/* 🌙 深色模式适配 */
html.dark .mobile-tabs {
  background: #2a2d30;
}

html.dark .tab-item.active {
  background: #3b4b61;
  color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
