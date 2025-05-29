<template>
    <div v-if="loading" class="global-loading">
        <img src="@/assets/loading.gif" alt="Loading" class="loading-gif" />
    </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/modules/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoadingStore()
const { loading } = storeToRefs(loadingStore)
</script>

<style scoped>
.global-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.7);
    /* 可调整为 dark 背景 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-gif {
    width: 100px;
    height: 100px;
}
</style>
