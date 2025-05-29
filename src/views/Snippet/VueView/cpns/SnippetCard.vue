<template>
  <el-card
    :class="['snippet-card', { pinned: data.pinned }]"
    shadow="hover"
    :body-style="{ padding: '12px' }"
  >
    <!-- 头部：标题 + 标签 -->
    <div class="card-header">
      <div class="card-title" :title="data.title">
        {{ data.icon }} {{ data.title }}
      </div>
      <div class="card-tags">
        <el-tag v-for="tag in data.tags" :key="tag" size="small">{{ tag }}</el-tag>
      </div>
    </div>

    <!-- 内容预览 -->
    <pre class="card-content">
      {{ data.content.slice(0, 200) + (data.content.length > 200 ? '...' : '') }}
    </pre>

    <!-- 操作区（PC悬浮展示，移动端常显） -->
    <div class="card-actions">
      <span title="置顶" @click="$emit('pin', data)">📌</span>
      <span title="复制" @click="$emit('copy', data.content)">📋</span>
      <span title="编辑" @click="$emit('edit', data)">✏️</span>
      <span title="删除" @click="$emit('remove', data.id)">🗑️</span>
    </div>
  </el-card>
</template>

<script setup>
// Props 接收代码片段对象 data
const props = defineProps({
  data: Object
})
</script>

<style scoped>
.snippet-card {
  border-radius: 10px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s;
  position: relative;
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
}

.card-header {
  margin-bottom: 8px;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-tags {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.card-content {
  background: var(--el-fill-color-light);
  border-radius: 4px;
  padding: 6px;
  font-size: 13px;
  white-space: pre-wrap;
  color: #666;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  font-size: 16px;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.snippet-card:hover .card-actions {
  opacity: 1;
}

/* 手机端始终展示操作按钮 */
@media (max-width: 768px) {
  .card-actions {
    opacity: 1 !important;
    justify-content: space-around;
  }
}

.snippet-card.pinned {
  border: 2px solid var(--el-color-primary);
}
</style>
