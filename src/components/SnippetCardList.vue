<template>
  <div class="card-grid">
    <CardItem
      v-for="card in snippetCategories"
      :key="card.key"
      :title="t(card.title)"
      :subtitle="t(card.subtitle)"
      :icon="card.icon"
      @click="goTo(card.path)"
    />
    <CardItem
      icon="➕"
      :title="t('snippet.new')"
      :subtitle="t('snippet.createNew')"
      @click="goTo('/settings')"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CardItem from './CardItem.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()

const snippetCategories = [
  {
    key: 'all',
    icon: '🧩', // 🧩
    title: 'snippet.all',
    subtitle: 'snippet.allDesc',
    path: '/home'
  },
  {
    key: 'react',
    icon: '⚛', // ⚛️
    title: 'snippet.react',
    subtitle: 'snippet.reactDesc',
    path: '/react'
  },
  {
    key: 'array',
    icon: '🧮', // 🧮
    title: 'snippet.array',
    subtitle: 'snippet.arrayDesc',
    path: '/array'
  },
  {
    key: 'interview',
    icon: '📄', // 📄
    title: 'snippet.interview',
    subtitle: 'snippet.interviewDesc',
    path: '/interview'
  }
]

function goTo(path: string) {
  router.push(path)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
