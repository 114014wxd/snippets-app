<template>
  <div class="snippet-list">
    <div class="header-bar">
      <button class="beach-button" @click="showEditor = true">添加代码 🌴</button>
    </div>

    <SnippetEditor
      v-model:visible="showEditor"
      @save="addSnippet"
      :modelValue="editData"
      :isEdit="!!(editData && editData.id)"
    />

    <div class="cards-wrapper">
      <SnippetCard
        v-for="item in sortedSnippets"
        :key="item.id"
        :snippet="item"
        @delete="removeSnippet"
        @edit="editSnippet"
        @copy="copySnippet"
        @pin="pinSnippet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SnippetCard from './cpns/SnippetCard.vue'
import SnippetEditor from './cpns/SnippetEditor.vue'
import { ElMessage } from 'element-plus'

interface Snippet {
  id: number
  title: string
  content: string
  tags?: string[]
  icon?: string
  pinned: boolean
}

const showEditor = ref(false)
const editData = ref<Partial<Snippet> | null>(null)
const snippets = ref<Snippet[]>([])

const sortedSnippets = computed(() => {
  return snippets.value.slice().sort((a, b) => Number(b.pinned) - Number(a.pinned))
})

const addSnippet = (snippet: Partial<Snippet>) => {
  snippets.value.push({
    ...snippet,
    id: Date.now(),
    pinned: false,
    title: snippet.title || '',
    content: snippet.content || ''
  } as Snippet)

  showEditor.value = false
  editData.value = null
}

const removeSnippet = (id: number) => {
  snippets.value = snippets.value.filter(i => i.id !== id)
  ElMessage.success('已删除')
}

const editSnippet = (snippet: Snippet) => {
  editData.value = { ...snippet }
  showEditor.value = true
}

const copySnippet = async (content: string) => {
  await navigator.clipboard.writeText(content)
  ElMessage.success('已复制')
}

const pinSnippet = (snippet: Snippet) => {
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
