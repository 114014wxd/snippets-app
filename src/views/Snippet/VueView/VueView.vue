<template>
    <div class="snippet-list">
        <div class="header-bar">
            <!-- <el-button type="primary" @click="showEditor = true">
                添加代码
            </el-button> -->
            <button class="beach-button" @click="showEditor = true">添加代码 🌴</button>
        </div>

        <SnippetEditor v-model:visible="showEditor" @save="addSnippet" :modelValue="editData" />

        <div class="cards-wrapper">
            <SnippetCard v-for="item in sortedSnippets" :key="item.id" :snippet="item" @delete="removeSnippet"
                @edit="editSnippet" @copy="copySnippet" @pin="pinSnippet" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SnippetCard from './cpns/SnippetCard.vue'
import SnippetEditor from './cpns/SnippetEditor.vue'
import { ElMessage } from 'element-plus'

const showEditor = ref(false)
const editData = ref(null)
const snippets = ref<any[]>([])

const sortedSnippets = computed(() => {
    return snippets.value.slice().sort((a, b) => Number(b.pinned) - Number(a.pinned))
})

const addSnippet = (snippet) => {
    // console.log('收到片段数据：', snippet)
    // if (snippet.id) {
    //     const index = snippets.value.findIndex(s => s.id === snippet.id)
    //     if (index !== -1) snippets.value[index] = snippet
    // } else {
    snippets.value.push({
        ...snippet,
        id: Date.now(),
        pinned: false
    })
    // }
    // console.log('当前片段列表：', snippets.value);

    showEditor.value = false
    editData.value = {}
}

const removeSnippet = (id) => {
    snippets.value = snippets.value.filter(i => i.id !== id)
    ElMessage.success('已删除')
}

const editSnippet = (snippet) => {
    editData.value = { ...snippet }
    showEditor.value = true
}

const copySnippet = async (content) => {
    await navigator.clipboard.writeText(content)
    ElMessage.success('已复制')
}

const pinSnippet = (snippet) => {
    snippet.pinned = !snippet.pinned
}
</script>

<style scoped lang="scss">
.header-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.cards-wrapper {
  column-count: 3;
  column-gap: 16px;
  padding: 0 10px;
}

@media (max-width: 1024px) {
  .cards-wrapper {
    column-count: 2;
  }
}
@media (max-width: 768px) {
  .cards-wrapper {
    column-count: 1;
  }
}

@import url('https://fonts.googleapis.com/css?family=Raleway:500');

// Palette
$green: #a2ccb6;
$light-peach: #ffecd9;
$peach: #ee786e;
$sand: #fceeb5;
$white: #fff;


.beach-button {
    appearance: none;
    -webkit-appearance: none;
    background: linear-gradient(to right, $green 0%, $sand 50%, $peach 100%);
    background-size: 100%;
    border: none;
    border-radius: 5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    color: $white;
    cursor: pointer;
    font: 1.3em 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 3rem;
    letter-spacing: 0.05em;
    outline: none;
    user-select: none;
    width: 12rem;
    transition: background-position 0.5s ease;

    &:hover {
        animation: gradient 2s forwards;
    }
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}
</style>
