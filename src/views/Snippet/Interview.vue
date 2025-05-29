<template>
    <div class="chat-wrapper">
        <div class="chat-window">
            <div v-for="(msg, index) in messages" :key="index" :class="['chat-message', msg.role]">
                <div class="bubble">
                    <span v-if="msg.role === 'user'">🧑‍💻</span>
                    <span v-else>🤖</span>
                    <span>{{ msg.content }}</span>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <el-input v-model="input" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="输入你的问题..."
                @keydown.enter.prevent="handleSend" />
            <el-button :loading="loading" type="primary" icon="ChatLineRound" @click="handleSend">
                发送
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const input = ref('')
const messages = ref([
    { role: 'system', content: '你是一个代码助手' },
])
const loading = ref(false)

// 根据环境切换 API 路径
// 根据环境切换 API 路径
const gptApiUrl = import.meta.env.DEV
  ? 'https://snippets.website/.netlify/functions/gpt-proxy' // ✅ DEV 用线上部署测试
  : '/.netlify/functions/gpt-proxy'                         // ✅ 生产环境使用相对路径

// 💬 核心方法：发送消息
async function handleSend() {
  const question = input.value.trim()
  if (!question) return

  // 追加用户提问
  messages.value.push({ role: 'user', content: question })
  input.value = ''
  loading.value = true

  try {
    const res = await chatWithGpt(messages.value)
    const reply = res?.choices?.[0]?.message?.content?.trim()

    if (reply) {
      messages.value.push({ role: 'assistant', content: reply })
    } else {
      ElMessage.warning('GPT 没有返回有效内容')
    }
  } catch (err: any) {
    ElMessage.error('请求失败: ' + (err?.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

// 🔁 请求 GPT
async function chatWithGpt(messages: any[]) {
  const res = await fetch(gptApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages
    })
  })

  return await res.json()
}

</script>

<style scoped>
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
    background: #f1f1f1;
    max-width: 80%;
}

.chat-message.user .bubble {
    background-color: #c1e9ff;
}

.chat-message.assistant .bubble {
    background-color: #e2f0d9;
}

.chat-input {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 10px;
}
</style>
