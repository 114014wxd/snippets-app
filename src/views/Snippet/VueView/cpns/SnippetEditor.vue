<template>
  <div class="snippet-modal" v-if="visible">
    <div class="modal-overlay" @click="emit('cancel')"></div>
    <div class="modal-panel">
      <!-- 顶部标题 -->
      <div class="modal-header">
        <div class="modal-title">
          <span class="icon">▶️</span>
          {{ isEdit ? '编辑代码' : '添加新代码' }}
        </div>
        <span class="modal-close" @click="emit('cancel')">×</span>
      </div>

      <!-- 表单区域 -->
      <div class="modal-body">
        <el-form label-width="60px" :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="代码内容">
            <el-input
              type="textarea"
              v-model="form.content"
              :rows="6"
              placeholder="请输入代码内容"
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 按钮区域 -->
      <div class="modal-footer">
        <el-button @click="emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  visible: Boolean,
  modelValue: Object,
  isEdit: Boolean
})
const emit = defineEmits(['cancel', 'save'])

const form = ref({ title: '', content: '' })

watch(
  () => props.modelValue,
  (val) => {
    form.value = { ...(val || { title: '', content: '' }) }
  },
  { immediate: true }
)

const onSave = () => {
  if (!form.value.title.trim() || !form.value.content.trim()) return
  emit('save', form.value)
}
</script>

<style scoped>
.snippet-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
}
.modal-panel {
  background-color: var(--el-bg-color);
  border-radius: 14px;
  width: 480px;
  max-width: 90%;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}
.modal-header {
  padding: 16px;
  background: linear-gradient(90deg, #d946ef, #6366f1);
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title .icon {
  margin-right: 6px;
}
.modal-close {
  cursor: pointer;
  font-size: 20px;
}
.modal-body {
  padding: 20px;
}
.modal-footer {
  padding: 0 20px 20px;
  text-align: right;
}

html.dark .modal-header {
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
}
</style>
