<template>
  <div class="card-item" @click="$emit('click')">
    <div class="icon">{{ icon }}</div>
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #6aa8ff 0%, #927dff 100%);
  color: white;
  border-radius: 14px;
  padding: 20px;
  height: 140px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 28px;
  margin-bottom: 12px;
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.subtitle {
  font-size: 13px;
  opacity: 0.85;
  margin-top: 4px;
}
</style>
