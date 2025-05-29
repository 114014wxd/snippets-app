<template>
  <div class="settings-wrapper">
    <!-- <DesktopNav v-if="!isMobile" :active="active" @select="scrollTo" /> -->
    <MobileTabs v-if="isMobile" :active="active" @select="scrollTo" />

    <div class="settings-content">
      <section ref="profileRef" id="profile"><ProfileSettings /></section>
      <section ref="appearanceRef" id="appearance"><AppearanceSettings /></section>
      <section ref="languageRef" id="language"><LanguageSettings /></section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
// import DesktopNav from './cpns/DesktopNav.vue'
import MobileTabs from './cpns/MobileTabs.vue'
import ProfileSettings from './cpns/ProfileSettings.vue'
import AppearanceSettings from './cpns/AppearanceSettings.vue'
import LanguageSettings from './cpns/LanguageSettings.vue'
const active = ref('profile')
const profileRef = ref()
const appearanceRef = ref()
const languageRef = ref()

const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const scrollTo = (key: string) => {
  active.value = key
  // const target = {
  //   profile: profileRef,
  //   appearance: appearanceRef,
  //   language: languageRef
  // }[key]
  // target?.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.settings-wrapper {
  display: flex;
  gap: 20px;
}

.settings-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (max-width: 767px) {
  .settings-wrapper {
    flex-direction: column;
  }

  .settings-content {
    padding-top: 10px;
  }
}
</style>