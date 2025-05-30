<template>
  <div class="chat-wrapper">
    <div class="chat-window">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-message', msg.role]"
      >
        <div class="bubble">
          <span v-if="msg.role === 'user'">🧑‍💻</span>
          <span v-else>🤖</span>
          <span>{{ msg.content }}</span>
        </div>
      </div>
    </div>
    <div class="chat-cost" v-if="costInfo">{{ costInfo }}</div>
    <div class="chat-input">
      <el-input
        v-model="input"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="输入你的问题..."
        @keydown.enter.prevent="handleSend"
      />
      <el-button :loading="loading" type="primary"  @click="handleSend">
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const input = ref('')
const messages = ref([{ role: 'system', content: '你是一个代码助手' }])
const costInfo = ref('')
const loading = ref(false)

const gptApiUrl = import.meta.env.DEV
  ? 'http://localhost:3001/gpt-proxy'
  : '/.netlify/functions/gpt-proxy'

async function handleSend() {
  const question = input.value.trim()
  if (!question) return

  messages.value.push({ role: 'user', content: question })
  input.value = ''
  loading.value = true

  try {
    const res = await fetch(gptApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个代码助手' },
          { role: 'user', content: question }
        ]
      })
    })

    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    const usage = data?.usage

    if (reply) messages.value.push({ role: 'assistant', content: reply })

    if (usage) {
      costInfo.value = `🧾 Token 用量：提示 ${usage.prompt_tokens} ，回复 ${usage.completion_tokens} ，总计 ${usage.total_tokens}`
    }
  } catch (err: any) {
    ElMessage.error('请求失败: ' + (err?.message || '未知错误'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:root {
  --bubble-user: #c1e9ff;
  --bubble-assistant: #e2f0d9;
}

.dark {
  --bubble-user: rgba(64, 158, 255, 0.2);
  --bubble-assistant: rgba(103, 194, 58, 0.15);
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10px;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message.user {
  text-align: right;
}

.chat-message.assistant {
  text-align: left;
}

.bubble {
  display: inline-block;
  padding: 10px;
  border-radius: 8px;
  background: var(--bubble-assistant);
  max-width: 80%;
  white-space: pre-wrap;
  line-height: 1.6;
}

.chat-message.user .bubble {
  background-color: var(--bubble-user);
}

.chat-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.chat-cost {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-top: 8px;
  text-align: right;
}
</style>
