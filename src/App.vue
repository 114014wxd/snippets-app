<template>
  <div id="app">
    <h1>📚 我的代码片段 + 面试题工具</h1>
    <button @click="addSnippet">添加代码片段</button>
    <ul>
      <li v-for="(item, index) in snippets" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const snippets = ref([])

onMounted(() => {
  const saved = localStorage.getItem('my-snippets')
  if (saved) snippets.value = JSON.parse(saved)
})

const addSnippet = () => {
  const content = prompt('请输入代码片段内容')
  if (content) {
    snippets.value.push(content)
    localStorage.setItem('my-snippets', JSON.stringify(snippets.value))
  }
}
</script>
