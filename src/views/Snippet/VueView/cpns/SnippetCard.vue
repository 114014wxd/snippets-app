<template>
    <div class="card">
        <el-card :class="['snippet-card', { pinned: snippet.pinned }]" shadow="hover" :body-style="{ padding: '12px' }">
            <!-- 头部：标题 + 标签 -->
            <div class="card-header">
                <div class="card-title" :title="snippet.title">
                    {{ snippet.icon }} {{ snippet.title }}
                </div>
                <div class="card-tags">
                    <el-tag v-for="tag in snippet.tags" :key="tag" size="small">{{ tag }}</el-tag>
                </div>
            </div>

            <!-- 内容预览（最多显示 5 行，高度固定，超出省略） -->
            <el-tooltip class="box-item" trigger="hover" :content="snippet.content" placement="top-start">
                <div class="card-content">
                    {{ snippet.content }}
                </div>
            </el-tooltip>

            <!-- 操作区 -->
            <div class="card-actions">
                <span title="置顶" @click="$emit('pin', snippet)">📌</span>
                <span title="复制" @click="$emit('copy', snippet.content)">📋</span>
                <span title="编辑" @click="$emit('edit', snippet)">✏️</span>
                <span title="删除" @click="$emit('remove', snippet.id)">🗑️</span>
            </div>
        </el-card>
    </div>
</template>

<script setup>
const props = defineProps({
    snippet: Object
})
</script>

<style scoped>
.snippet-card {
    border-radius: 10px;
    margin-bottom: 16px;
    transition: box-shadow 0.3s;
    position: relative;
    break-inside: avoid;
    background: var(--el-bg-color);
    color: var(--el-text-color-primary);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
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
    color: #666;
    white-space: pre-wrap;
    overflow: hidden;

    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    /* 最多显示 5 行 */
    -webkit-box-orient: vertical;
    max-height: 6.8em;
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

@media (max-width: 768px) {
    .card-actions {
        opacity: 1 !important;
        justify-content: flex-end
    }
}

.snippet-card.pinned {
    border: 2px solid var(--el-color-primary);
}
</style>
