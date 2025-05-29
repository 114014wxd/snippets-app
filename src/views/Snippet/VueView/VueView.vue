// SnippetList.vue
<template>
  <div class="snippet-list">
    <div class="header-bar">
      <el-button type="primary" icon="Plus" @click="showEditor = true">
        添加代码
      </el-button>
    </div>

    <SnippetEditor v-model:visible="showEditor" @save="addSnippet" :editData="editData" />

    <el-row :gutter="20">
      <el-col
        v-for="item in sortedSnippets"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
      >
        <SnippetCard :snippet="item" @delete="removeSnippet" @edit="editSnippet" @copy="copySnippet" @pin="pinSnippet" />
      </el-col>
    </el-row>
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
  if (snippet.id) {
    const index = snippets.value.findIndex(s => s.id === snippet.id)
    if (index !== -1) snippets.value[index] = snippet
  } else {
    snippets.value.push({
      ...snippet,
      id: Date.now(),
      pinned: false
    })
  }
  showEditor.value = false
  editData.value = null
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

<style scoped>
.snippet-list {
  padding: 20px;
}
.header-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
